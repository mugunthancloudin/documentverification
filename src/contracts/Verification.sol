// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Verification is Ownable {
    address[] public verifiers;
    uint256 public maxVerifiers = 10;
    uint256 public numCompanies;
    uint256 public numDocuments;
    uint256 public numCandidates;

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event VerifierReplaced(address indexed oldVerifier, address indexed newVerifier);
    event CompanyAdded(uint256 indexed id, address indexed companyAddress, string name, uint256 date, string location, string phoneNumber, string licenseNumber, string email);
    event CompanyRemoved(uint256 indexed id);
    event CandidateAdded(uint256 indexed id, string name, uint256 date, string location, string email, string phoneNumber);
    event CandidateRemoved(uint256 indexed id);
    event CandidateEdited(uint256 indexed id, string name, uint256 date, string location, string email, string phoneNumber);
    event CandidateCurrentCompanyEdited(uint256 indexed id, address newCurrentCompany);
    event DocumentAdded(uint256 indexed id, string name, string cid, uint256 companyId, uint256 candidateId, uint256 date, string typeOfDocument);
    event DocumentRemoved(uint256 documentId, uint256 candidateId, uint256 companyId);
    event DocumentVerified(uint256 indexed id);

    struct Company {
        uint256 date;
        address address_;
        string name;
        uint256 Id;
        string location;
        string phoneNumber;
        string licenseNumber;
        string email;
    }

    struct Candidate {
        uint256 date;
        address address_;
        address currentCompany;
        string name;
        uint256 Id;
        string location;
        string email;
        string phoneNumber;
    }

    struct Document {
        uint256 date;
        string name;
        uint id;
        string cid;
        string typeOfDocument;
        bool isVerified;
        uint256 companyId;
        uint256 candidateId;
    }

    mapping(uint256 => Company) public companies;
    mapping(address => uint256) public companyAddress;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => Document) public documents;
    mapping(uint256 => mapping(uint256 => Document)) public companyCandidateDocuments;
    mapping(address => uint256) public candidateAddress;


    function isCandidate() internal view returns (bool) {
        return candidateAddress[msg.sender] != 0;
    }

    function isCompany() internal view returns (bool) {
        return companyAddress[msg.sender] != 0;
    }

    function isVerifier() internal view returns (bool) {
        return isVerifier(msg.sender);
    }

    function isVerifier(address _address) internal view returns (bool) {
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function setMaxVerifiers(uint256 _maxVerifiers) external onlyOwner {
        require(_maxVerifiers > 0, "Maximum verifiers should be greater than 0");
        maxVerifiers = _maxVerifiers;
    }

    function addVerifiers(address[] memory _verifiers) external onlyOwner {
        require(_verifiers.length > 0, "No verifiers to add");
        
        require(verifiers.length + _verifiers.length <= maxVerifiers, "Exceeds maximum number of verifiers");

        for (uint256 i = 0; i < _verifiers.length; i++) {
            address _verifier = _verifiers[i];
            require(_verifier != address(0), "Invalid address");

            verifiers.push(_verifier);
            emit VerifierAdded(_verifier);
        }
    }

    function replaceVerifiers(address[] memory _oldVerifiers, address[] memory _newVerifiers) external onlyOwner {
        require(_oldVerifiers.length == _newVerifiers.length, "Mismatched input lengths");

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

    function addCompanies(address[] memory _addresses, string[] memory _names, string[] memory _locations, string[] memory _phoneNumbers, string[] memory _licenseNumbers, string[] memory _emails) external {
        require(isVerifier() || getOwner() == msg.sender, "Only verifier or owner can call");
        require(
            _addresses.length == _names.length &&
            _addresses.length == _locations.length &&
            _addresses.length == _phoneNumbers.length &&
            _addresses.length == _licenseNumbers.length &&
            _addresses.length == _emails.length,
            "Mismatched input lengths"
        );

        for (uint256 i = 0; i < _addresses.length; i++) {
            address _address = _addresses[i];
            string memory _name = _names[i];
            string memory _location = _locations[i];
            string memory _phoneNumber = _phoneNumbers[i];
            string memory _licenseNumber = _licenseNumbers[i];
            string memory _email = _emails[i];

            uint256 _id = numCompanies + 1; // Increment the counter and use it as the new ID

            companies[_id] = Company({
                date: block.timestamp,
                address_: _address,
                name: _name,
                Id: _id,
                location: _location,
                phoneNumber: _phoneNumber,
                licenseNumber: _licenseNumber,
                email: _email
            });

            companyAddress[_address] = _id;
            numCompanies++;

            emit CompanyAdded(_id, _address, _name, companies[_id].date, _location, _phoneNumber, _licenseNumber, _email);
        }
    }

    function removeCompanies(uint256[] memory _ids) external {
        require(isVerifier() || getOwner()==msg.sender,"Only verifier can call");
        require(_ids.length > 0, "No company IDs provided");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];

            require(companies[_id].Id != 0, "Company with given ID does not exist");

            delete companies[_id];
            numCompanies--;

            emit CompanyRemoved(_id);
        }
    }

    function addCandidates(address[] memory _addresses, string[] memory _names, string[] memory _locations, string[] memory _emails, string[] memory _phoneNumbers) external {
        require(isCompany(), "Only verifier or owner can call");
        require(
            _addresses.length == _names.length,
            "Mismatched input lengths"
        );

        for (uint256 i = 0; i < _addresses.length; i++) {
            address _address = _addresses[i];
            string memory _name = _names[i];
            string memory _location = _locations[i];
            string memory _email = _emails[i];
            string memory _phoneNumber = _phoneNumbers[i];

            // Check if the name or address already exists
            require(candidateAddress[_address] == 0, "Candidate with the given address already exists");

            // Check if address and name are not zero
            require(_address != address(0), "Address cannot be zero");
            require(bytes(_name).length > 0, "Name cannot be empty");

            uint256 _id = numCandidates + 1; // Increment the counter and use it as the new ID

            candidates[_id] = Candidate({
                date: block.timestamp,
                address_: _address,
                name: _name,
                Id: _id,
                location: _location,
                email: _email,
                phoneNumber: _phoneNumber,
                currentCompany: msg.sender
            });

            candidateAddress[msg.sender] = _id;
            numCandidates++;
            emit CandidateAdded(_id, _name, candidates[_id].date, _location, _email, _phoneNumber);
        }
    }

    function editCandidate(
    uint256 _id,
    string memory _name,
    string memory _location,
    string memory _email,
    string memory _phoneNumber
) external {
    require(isCompany(),"Only verifier or owner can call");
    require(candidates[_id].Id != 0, "Candidate with given ID does not exist");
    require(candidates[_id].currentCompany == msg.sender, "You do not have permission to edit this candidate");

    candidates[_id].name = _name;
    candidates[_id].location = _location;
    candidates[_id].email = _email;
    candidates[_id].phoneNumber = _phoneNumber;

    emit CandidateEdited(_id, _name, candidates[_id].date, _location, _email, _phoneNumber);
}

    function removeCandidates(uint256[] memory _ids) external {
        require(isVerifier() || isCompany(),"Only verifier can call");
        require(_ids.length > 0, "No candidate IDs provided");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];

            require(candidates[_id].Id != 0, "Candidate with given ID does not exist");

            delete candidates[_id];
            emit CandidateRemoved(_id);
        }
    }

    function editCandidateCurrentCompany(uint256 _id, address _newCurrentCompany) external {
    require(isCompany(),"Only company can call");
    require(candidates[_id].Id != 0, "Candidate with given ID does not exist");

    // If currentCompany is not set, any company can edit it
    if (candidates[_id].currentCompany != address(0)) {
        require(candidates[_id].currentCompany == msg.sender, "You do not have permission to edit currentCompany for this candidate");
    }

    candidates[_id].currentCompany = _newCurrentCompany;

    emit CandidateCurrentCompanyEdited(_id, _newCurrentCompany);
}

    function addDocuments(
        string[] memory _names,
        string[] memory _cids,
        uint256[] memory _candidateIds,
        string[] memory _typesOfDocument
    ) external {
        require(isCompany(), "Only company can call");
        require(
            _names.length == _cids.length &&
            _names.length == _candidateIds.length &&
            _names.length == _typesOfDocument.length,
            "Mismatched input lengths"
        );

        uint256 _companyId = getCompanyIdOfSender();

        for (uint256 i = 0; i < _names.length; i++) {
            string memory _name = _names[i];
            string memory _cid = _cids[i];
            uint256 _candidateId = _candidateIds[i];
            string memory _typeOfDocument = _typesOfDocument[i];

            require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

            uint256 documentId = candidates[_candidateId].Id + i; // Use candidate ID as a base and add an index

            companyCandidateDocuments[_companyId][_candidateId] = Document({
                date: block.timestamp,
                name: _name,
                id: documentId,
                cid: _cid,
                typeOfDocument: _typeOfDocument,
                isVerified: false,
                companyId: _companyId,
                candidateId: _candidateId
            });

            numDocuments++;

            emit DocumentAdded(documentId, _name, _cid, _companyId, _candidateId, companyCandidateDocuments[_companyId][_candidateId].date, _typeOfDocument);
        }
    }

    function removeDocuments(uint256[] memory _candidateIds, uint256[] memory _documentIds) external {
        require(isCompany(),"Only company can call");
        uint256 _companyId = getCompanyIdOfSender();
        require(_candidateIds.length == _documentIds.length, "Mismatched input lengths");

        for (uint256 i = 0; i < _candidateIds.length; i++) {
            uint256 _candidateId = _candidateIds[i];
            uint256 _documentId = _documentIds[i];

            require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

            Document storage document = companyCandidateDocuments[_companyId][_candidateId];

            require(document.companyId != 0, "No document found for the given candidate and company");
            require(_documentId == document.id, "Invalid documentId");

            delete companyCandidateDocuments[_companyId][_candidateId];

            emit DocumentRemoved(_documentId, _candidateId, _companyId);
        }
    }

    function verifyDocuments(uint256[] memory _candidateIds) external {
        require(isVerifier(),"Only verifier can call");
        uint256 _companyId = getCompanyIdOfSender();

        for (uint256 i = 0; i < _candidateIds.length; i++) {
            uint256 _candidateId = _candidateIds[i];

            Document storage document = companyCandidateDocuments[_companyId][_candidateId];

            require(document.companyId != 0, "No document found for the given candidate and company");
            require(document.isVerified == false, "Document with given ID is already verified");

            document.isVerified = true;
            emit DocumentVerified(document.id);
        }
    }

    function getCompanyIdOfSender() public view returns (uint256) {
        return companyAddress[msg.sender];
    }

    function getCompany(uint256 _id) public view returns (address, string memory, uint256, string memory, string memory, string memory, string memory, uint256) {
        Company memory company = companies[_id];
        return (company.address_, company.name, company.Id, company.location, company.phoneNumber, company.licenseNumber, company.email, company.date);
    }

    function getCandidate(uint256 _id) public view returns (string memory, uint256, string memory, string memory, string memory) {
        Candidate memory candidate = candidates[_id];
        return (candidate.name, candidate.Id, candidate.location, candidate.email, candidate.phoneNumber);
    }

    function getDocument(uint256 _id) public view returns (string memory, string memory, bool, uint256, uint256) {
        Document memory document = documents[_id];
        return (document.name, document.cid, document.isVerified, document.companyId, document.candidateId);
    }

    function getVerifiers() public view returns (address[] memory) {
        return verifiers;
    }

    function getOwner() public view returns (address) {
        return owner();
    }
}
