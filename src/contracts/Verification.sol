    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/access/Ownable.sol";

    contract Verification is Ownable {
        address[] public verifiers;
        uint256 public maxVerifiers = 10;
        uint256 public numCompanies;
        uint256 public numDocuments;

        event VerifierAdded(address indexed verifier);
        event VerifierRemoved(address indexed verifier);
        event VerifierReplaced(address indexed oldVerifier, address indexed newVerifier);
        event CompanyAdded(uint256 indexed id, address indexed companyAddress, string name);
        event CompanyRemoved(uint256 indexed id);
        event CandidateAdded(uint256 indexed id, string name);
        event CandidateRemoved(uint256 indexed id);
        event DocumentAdded(uint256 indexed id, string name, bytes cid, uint256 companyId, uint256 candidateId);
        event DocumentRemoved(uint256 documentId, uint256 candidateId, uint256 companyId);
        event DocumentVerified(uint256 indexed id);


        struct Company {
            address address_;
            string name;
            uint256 Id;
        }

        struct Candidate {
            string name;
            uint256 Id;
        }

        struct Document {
            string name;
            bytes cid;
            bool isVerified;
        }

        mapping(uint256 => Company) public companies;
        mapping(address => Company) public companyAddress;
        mapping(uint256 => Candidate) public candidates;
        mapping(uint256 => Document) public documents;
        mapping(uint256 => mapping(uint256 => uint256)) public companyCandidateDocuments;   

        function onlyCompany(address sender) public  view returns (bool) {
        bool isCompany = false;
        for (uint i = 1; i <= numCompanies; i++) {
            if (companies[i].address_ == sender) {
                isCompany = true;
                break;  
            }
        }
        return isCompany;
        }

        function onlyVerifier(address sender) public  view returns (bool) {
        bool isVerifier = false;
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == sender) {
                isVerifier = true;
                break;
            }
        }
        return isVerifier;
        }

        function setMaxVerifiers(uint256 _maxVerifiers) public onlyOwner {
            require(_maxVerifiers > 0, "Maximum verifiers should be greater than 0");
            maxVerifiers = _maxVerifiers;
        }

        function addVerifiers(address[] memory _verifiers) public onlyOwner {
        require(_verifiers.length > 0, "No verifiers to add");

        for (uint256 i = 0; i < _verifiers.length; i++) {
            address _verifier = _verifiers[i];
            require(_verifier != address(0), "Invalid address");

            require(verifiers.length < maxVerifiers, "Maximum number of verifiers reached");
            verifiers.push(_verifier);

            emit VerifierAdded(_verifier);
            }
        }

        function replaceVerifiers(address[] memory _oldVerifiers, address[] memory _newVerifiers) public onlyOwner {
        

        for (uint256 i = 0; i < _oldVerifiers.length; i++) {
            address _oldVerifier = _oldVerifiers[i];
            address _newVerifier = _newVerifiers[i];

            require(_oldVerifier != address(0), "Invalid address");

            if (_newVerifier == address(0)) {
                // Remove the old verifier
                for (uint256 j = 0; j < verifiers.length; j++) {
                    if (verifiers[j] == _oldVerifier) {
                        verifiers[j] = verifiers[verifiers.length - 1];
                        verifiers.pop();

                        emit VerifierRemoved(_oldVerifier);
                        break;
                    }
                }
            } else {
                require(_oldVerifiers.length == _newVerifiers.length, "Mismatched input lengths");
                for (uint256 j = 0; j < verifiers.length; j++) {
                    if (verifiers[j] == _oldVerifier) {
                        verifiers[j] = _newVerifier;

                        emit VerifierReplaced(_oldVerifier, _newVerifier);
                        break;
                    }
                }
            }
        }
    }

        function addCompanies(uint256[] memory _ids, address[] memory _addresses, string[] memory _names) public onlyOwner {
        require(_ids.length == _addresses.length && _ids.length == _names.length, "Mismatched input lengths");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];
            address _address = _addresses[i];
            string memory _name = _names[i];

            {
                // Add new company data
                companies[_id] = Company({
                    address_: _address,
                    name: _name,
                    Id: _id
                });
                // New company, increment count
                numCompanies++;
            }

            emit CompanyAdded(_id, _address, _name);
        }
    }
        function removeCompanies(uint256[] memory _ids) public onlyOwner {
        require(_ids.length > 0, "No company IDs provided");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];
            
            require(companies[_id].Id != 0, "Company with given ID does not exist");

            delete companies[_id];
            numCompanies--;

            emit CompanyRemoved(_id);
        }
    }
        function addCandidates(uint256[] memory _ids, string[] memory _names) public {

        require(onlyVerifier(msg.sender), "Sender is not a registered and verified company");
        require(_ids.length == _names.length, "Mismatched input lengths");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];
            string memory _name = _names[i];

            {
                // Add new candidate data
                candidates[_id] = Candidate({
                    name: _name,
                    Id: _id
                });
            }

            emit CandidateAdded(_id, _name);
        }
    }

        function removeCandidates(uint256[] memory _ids) public {

        require(onlyVerifier(msg.sender), "Sender is not a registered and verified company");
        require(_ids.length > 0, "No candidate IDs provided");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];
            
            require(candidates[_id].Id != 0, "Candidate with given ID does not exist");

            delete candidates[_id];

            emit CandidateRemoved(_id);
        }
    }

    function addDocuments(
    string[] memory _names,
    bytes[] memory _cids,
    uint256[] memory _candidateIds
) public {
    require(onlyCompany(msg.sender), "Sender is not a registered and verified company");

    require(_names.length == _cids.length && _names.length == _candidateIds.length, "Mismatched input lengths");

    uint256 _companyId = getCompanyIdOfSender();  // Get the companyId of the sender

    for (uint256 i = 0; i < _names.length; i++) {
        string memory _name = _names[i];
        bytes memory _cid = _cids[i];
        uint256 _candidateId = _candidateIds[i];

        require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

        uint256 documentId = numDocuments + 1;
        documents[documentId] = Document({
            name: _name,
            cid: _cid,
            isVerified: false
        });

        companyCandidateDocuments[_companyId][_candidateId] = documentId;

        numDocuments++;

        emit DocumentAdded(documentId, _name, _cid, _companyId, _candidateId);
    }
}

function removeDocuments(uint256[] memory _candidateIds) public {
    require(onlyCompany(msg.sender), "Sender is not a registered and verified company");

    uint256 _companyId = getCompanyIdOfSender();  // Get the companyId of the sender

    for (uint256 i = 0; i < _candidateIds.length; i++) {
        uint256 _candidateId = _candidateIds[i];

        require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

        uint256 documentId = companyCandidateDocuments[_companyId][_candidateId];

        require(documentId != 0, "No document found for the given candidate and company");

        delete documents[documentId];
        delete companyCandidateDocuments[_companyId][_candidateId];

        emit DocumentRemoved(documentId, _candidateId, _companyId);
    }
}

function getCompanyIdOfSender() public view returns (uint256) {
    return companyAddress[msg.sender].Id;
}

    function verifyDocuments(uint256[] memory _ids) public {
        
        require(onlyVerifier(msg.sender), "Sender is not a registered and verified company");
        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];
            
            require(documents[_id].isVerified == false, "Document with given ID is already verified");
        
            documents[_id].isVerified = true;
            emit DocumentVerified(_id);
        }
    }
            
        function getCompany(uint256 _id) public view returns (address, string memory, uint256) {
        Company memory company = companies[_id];
        return (company.address_, company.name, company.Id);
    }
        function getCandidate(uint256 _id) public view returns (string memory, uint256) {
        Candidate memory candidate = candidates[_id];
        return (candidate.name, candidate.Id);
    }

        function getDocument(uint256 _companyId, uint256 _candidateId) public view returns (uint256) {
            return companyCandidateDocuments[_companyId][_candidateId];
        }

        function getVerifiers() public view returns (address[] memory) {
            return verifiers;
        }

        function getOwner() public view returns (address) {
        return owner();
    }
    }