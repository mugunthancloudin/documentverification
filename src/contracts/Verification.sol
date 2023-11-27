// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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
    event DocumentAdded(uint256 indexed id, string name, string cid, uint256 candidateId, uint256 date, string typeOfDocument, string expirationDate);
    event DocumentRemoved(uint256 documentId, uint256 candidateId);
    event DocumentVerified(uint256 indexed id);
    event DocumentCancelled(uint256 indexed id);

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
        string expirationDate;
        bool isVerified;
        bool isCancelled;
        uint256 candidateId;
    }

    mapping(uint256 => Company) public companies;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => Document) public documents;
    mapping(address => uint256) public companyAddress;
    mapping(address => uint256) public candidateAddress;
    mapping(uint256 => mapping(uint256 => Document)) public CandidateDocuments;
    

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
        require(isVerifier() || msg.sender == owner(), "Only verifier or owner can call");
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
        require(isVerifier() || msg.sender==owner(),"Only verifier can call");
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

    // function removeCandidates(uint256[] memory _ids) external {
    //     require(isVerifier() || isCompany(),"Only verifier can call");
    //     require(_ids.length > 0, "No candidate IDs provided");

    //     for (uint256 i = 0; i < _ids.length; i++) {
    //         uint256 _id = _ids[i];

    //         require(candidates[_id].Id != 0, "Candidate with given ID does not exist");

    //         delete candidates[_id];
    //         emit CandidateRemoved(_id);
    //     }
    // }

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
    string[] memory _typesOfDocument,
    string[] memory _expirationDates
) external {
    require(isCompany(), "Only company can call");
    require(
        _names.length == _cids.length &&
        _names.length == _candidateIds.length,
        "Mismatched input lengths"
    );

    for (uint256 i = 0; i < _names.length; i++) {
        string memory _name = _names[i];
        string memory _cid = _cids[i];
        uint256 _candidateId = _candidateIds[i];
        string memory _typeOfDocument = _typesOfDocument[i];
        string memory _expirationDate = _expirationDates[i];

        require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

        uint256 documentId = numDocuments + 1; // Increment the counter and use it as the new ID
        numDocuments++;

        documents[documentId] = Document({
            id: documentId,
            date: block.timestamp,
            name: _name,
            cid: _cid,
            typeOfDocument: _typeOfDocument,
            expirationDate: _expirationDate,
            isVerified: false,
            isCancelled: false,
            candidateId: _candidateId
        });

        // Map the documentId to candidateId
        CandidateDocuments[_candidateId][documentId];

        emit DocumentAdded(documentId, _name, _cid, _candidateId, CandidateDocuments[_candidateId][documentId].date, _typeOfDocument, _expirationDate);
    }
}

    // function removeDocuments(uint256[] memory _candidateIds, uint256[] memory _documentIds) external {
    //     require(isCompany(),"Only company can call");
    //     require(_candidateIds.length == _documentIds.length, "Mismatched input lengths");

    //     for (uint256 i = 0; i < _candidateIds.length; i++) {
    //         uint256 _candidateId = _candidateIds[i];
    //         uint256 _documentId = _documentIds[i];

    //         require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

    //         Document storage document = CandidateDocuments[_candidateId][_documentId];

    //         require(_documentId == document.id, "Invalid documentId");

    //         delete CandidateDocuments[_candidateId][_documentId];

    //         emit DocumentRemoved(_documentId, _candidateId);
    //     }
    // }

    function verifyDocuments(uint256[] memory _candidateIds, uint256[] memory _documentIds, bool[] memory _isCancelled) external {
        require(isVerifier(), "Only verifier can call");
        require(_candidateIds.length == _documentIds.length && _candidateIds.length == _isCancelled.length, "Array lengths must be equal");

        for (uint256 i = 0; i < _candidateIds.length; i++) {
            uint256 _candidateId = _candidateIds[i];
            uint256 _documentId = _documentIds[i];
            bool _cancel = _isCancelled[i];

            Document storage document = CandidateDocuments[_candidateId][_documentId];

            require(document.candidateId != 0, "No document found for the given candidate");
            require(document.isVerified == false, "Document with given ID is already verified or cancelled");

            if (_cancel) {
                document.isCancelled = true;
                emit DocumentCancelled(document.id);
            } else {
                document.isVerified = true;
                emit DocumentVerified(document.id);
            }
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

    function getDocument(uint256 _id) internal view returns (uint256, string memory, uint, string memory, string memory, string memory, bool, bool, uint256){
    Document memory document = documents[_id];
    return (document.date, document.name, document.id, document.cid, document.typeOfDocument, document.expirationDate, document.isVerified, document.isCancelled, document.candidateId);
    }

    function getCandidatesByCompany(uint256 _companyId) external view returns (uint256[] memory) {
    require(companies[_companyId].Id != 0, "Company with given ID does not exist");
    uint256[] memory candidateIds = new uint256[](numCandidates);
    uint256 count = 0;

    for (uint256 i = 1; i <= numCandidates; i++) {
        if (candidates[i].currentCompany == companies[_companyId].address_) {
            candidateIds[count] = i;
            count++;
        }
    }

    uint256[] memory result = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
        result[i] = candidateIds[i];
    }

    return result;
}

    function getDocumentsByCandidate(uint256 _candidateId) external view returns (uint256[] memory) {
        require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");
        uint256[] memory documentIds = new uint256[](numDocuments);
        uint256 count = 0;

    for (uint256 i = 1; i <= numDocuments; i++) {
        if (CandidateDocuments[_candidateId][i].id != 0) {
            documentIds[count] = i;
            count++;
        }
    }

    uint256[] memory result = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
        result[i] = documentIds[i];
    }

    return result;
}

    function getVerifiers() public view returns (address[] memory) {
        return verifiers;
    }

    function getOwner() public view returns (address) {
        return owner();
    }
}
