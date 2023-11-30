// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Verification is Ownable {
    address[] public verifiers;
    uint256 public maxVerifiers = 10;
    
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event VerifierReplaced(address indexed oldVerifier, address indexed newVerifier);
    event CompanyAdded(uint256 indexed id, address indexed companyAddress, string name, string location, uint phoneNumber, string licenseNumber, string email);
    event CompanyRemoved(uint256 indexed id);
    event CandidateAdded(uint256 indexed id, string name, string location, string email, uint phoneNumber);
    event CandidateRemoved(uint256 indexed id);
    event CandidateEdited(uint256 indexed id, string name, string location, string email, uint phoneNumber, address currentCompany);
    event CandidateCurrentCompanyEdited(uint256 indexed id, address newCurrentCompany);
    event DocumentAdded(uint256 indexed id, string name, string cid, uint256 candidateId, string typeOfDocument, string expirationDate);
    event DocumentRemoved(uint256 documentId, uint256 candidateId);
    event DocumentVerified(uint256 indexed id);
    event DocumentCancelled(uint256 indexed id);

    struct Company {
        uint256 date;
        address address_;
        string name;
        uint256 Id;
        uint256[] candidateIds;
        string location;
        uint256 phoneNumber;
        string licenseNumber;
        string email;
    }

    struct Candidate {
        uint256 date;
        address address_;
        address currentCompany;
        string name;
        uint256[] documentIds;
        uint256 Id;
        string location;
        string email;
        uint256 phoneNumber;
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

    mapping(address => uint256) public companyAddress;
    mapping(address => uint256) public candidateAddress;
    Company[] public companies;
    Candidate[] public candidates;
    Document[] public documents;

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

    function addCompanies(address[] memory _addresses, string[] memory _names, string[] memory _locations, uint256[] memory _phoneNumbers, string[] memory _licenseNumbers, string[] memory _emails) external {
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
        uint256 _phoneNumber = _phoneNumbers[i];
        string memory _licenseNumber = _licenseNumbers[i];
        string memory _email = _emails[i];

        uint256 _id = companies.length + 1; // Increment the counter and use it as the new ID

        companies.push(Company({
            date: block.timestamp,
            address_: _address,
            name: _name,
            Id: _id,
            location: _location,
            phoneNumber: _phoneNumber,
            licenseNumber: _licenseNumber,
            email: _email,
            candidateIds: new uint256[](0)  // Initialize an empty array for candidate IDs
        }));

        companyAddress[_address] = _id;

        emit CompanyAdded(_id, _address, _name, _location, _phoneNumber, _licenseNumber, _email);
    }
}

    function removeCompanies(uint256[] memory _ids) external {
        require(isVerifier() || msg.sender == owner(), "Only verifier or owner can call");
        require(_ids.length > 0, "No company IDs provided");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i];

            require(_id <= companies.length, "Invalid company ID");
            uint256 arrayIndex = _id - 1;

            emit CompanyRemoved(_id);
            delete companies[arrayIndex];
        }
    }

    function addCandidates(
    address[] memory _addresses,
    string[] memory _names,
    string[] memory _locations,
    string[] memory _emails,
    uint256[] memory _phoneNumbers
) external {
    require(isCompany(), "Only company can call");
    require(_addresses.length == _names.length, "Mismatched input lengths");

    for (uint256 i = 0; i < _addresses.length; i++) {
        address _address = _addresses[i];
        string memory _name = _names[i];
        string memory _location = _locations[i];
        string memory _email = _emails[i];
        uint256 _phoneNumber = _phoneNumbers[i];

        // Check if the name or address already exists
        require(candidateAddress[_address] == 0, "Candidate with the given address already exists");

        // Check if address and name are not zero
        require(_address != address(0), "Address cannot be zero");
        require(bytes(_name).length > 0, "Name cannot be empty");

        uint256 _id = candidates.length + 1; // Increment the counter and use it as the new ID

        candidates.push(Candidate({
            date: block.timestamp,
            address_: _address,
            name: _name,
            Id: _id,
            location: _location,
            email: _email,
            phoneNumber: _phoneNumber,
            currentCompany: msg.sender,
            documentIds: new uint256[](0)  // Initialize an empty array for document IDs
        }));

        // Add the candidate ID to the company's candidateIds array
        companies[companyAddress[msg.sender] - 1].candidateIds.push(_id);

        candidateAddress[_address] = _id;

        emit CandidateAdded(_id, _name, _location, _email, _phoneNumber);
    }
}

    function editCandidate(
        uint256 _candidateId,
        string memory _name,
        string memory _location,
        string memory _email,
        uint256 _phoneNumber,
        address _currentCompany
    ) external {
        uint256 _id = _candidateId -1;
        require(isCompany(), "Only company can call");
        require(candidates[_id].Id != 0, "Candidate with given ID does not exist");
        require(candidates[_id].currentCompany == msg.sender, "You do not have permission to edit this candidate");

        candidates[_id].name = _name;
        candidates[_id].location = _location;
        candidates[_id].email = _email;
        candidates[_id].phoneNumber = _phoneNumber;
        candidates[_id].currentCompany = _currentCompany;

        emit CandidateEdited(_id, _name, _location, _email, _phoneNumber,_currentCompany);
    }

    function removeCandidates(uint256[] memory _ids) external {
        require(isVerifier() || isCompany(), "Only verifier or owner can call");

        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 _id = _ids[i-1];

            require(candidates[_id].Id != 0, "Candidate with given ID does not exist");
            uint256 arrayIndex = _id - 1;

            emit CandidateRemoved(_id);
            delete candidates[arrayIndex];
        }
    }

    function editCandidateCurrentCompany(uint256 _candidateId, address _newCurrentCompany) external {
        uint256 _id = _candidateId;
        require(isCompany(), "Only company can call");
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

            uint256 documentId = documents.length + 1; // Increment the counter and use it as the new ID

            documents.push(Document({
                date: block.timestamp,
                name: _name,
                cid: _cid,
                id: documentId,
                typeOfDocument: _typeOfDocument,
                expirationDate: _expirationDate,
                isVerified: false,
                isCancelled: false,
                candidateId: _candidateId
            }));

            // Add the document ID to the candidate's documentIds array
            candidates[_candidateId].documentIds.push(documentId);

            emit DocumentAdded(documentId, _name, _cid, _candidateId, _typeOfDocument, _expirationDate);
        }
    }

    function removeDocuments(uint256[] memory _candidateIds, uint256[] memory _documentIds) external {
        require(isCompany(), "Only company can call");
        require(_candidateIds.length == _documentIds.length, "Mismatched input lengths");

        for (uint256 i = 0; i < _candidateIds.length; i++) {
            uint256 _candidateId = _candidateIds[i-1];
            uint256 _documentId = _documentIds[i-1];

            require(candidates[_candidateId].Id != 0, "Candidate with given ID does not exist");

            uint256 arrayIndex = _documentId - 1;

            emit DocumentRemoved(_documentId, _candidateId);
            delete candidates[_candidateId].documentIds[arrayIndex];
        }
    }

    function verifyDocument(uint256 _documentId, bool _isCancelled) external {
    require(isVerifier(), "Only verifier can call");
    
    require(_documentId <= documents.length, "Invalid document ID");
    uint256 arrayIndex = _documentId - 1;

    Document storage document = documents[arrayIndex];

    // Check if the document exists
    require(document.id != 0, "Document with given ID does not exist");
    require(!document.isVerified && !document.isCancelled, "Document with given ID is already verified or cancelled");

    if (_isCancelled) {
        document.isCancelled = true;
        emit DocumentCancelled(_documentId);
    } else {
        document.isVerified = true;
        emit DocumentVerified(_documentId);
    }
}


    function getCompanyIdOfSender() public view returns (uint256) {
        return companyAddress[msg.sender];
    }

function getCompany(uint256 _companyId) external view returns (uint256, address, string memory, string memory, uint256, string memory, string memory) {
    require(_companyId <= companies.length, "Invalid company ID");
    uint256 arrayIndex = _companyId - 1;

    Company storage company = companies[arrayIndex];

    // Check if the company exists
    require(company.Id != 0, "Company with given ID does not exist");

    return (
        company.Id,
        company.address_,
        company.name,
        company.location,
        company.phoneNumber,
        company.licenseNumber,
        company.email
    );
}

function getCandidate(uint256 _id) public view returns (string memory, uint256, string memory, string memory, uint256) {
    require(_id <= candidates.length, "Invalid candidate ID");
    uint256 arrayIndex = _id - 1;

    Candidate storage candidate = candidates[arrayIndex];

    // Check if the candidate exists
    require(candidate.Id != 0, "Candidate with given ID does not exist");

    return (
        candidate.name,
        candidate.Id,
        candidate.location,
        candidate.email,
        candidate.phoneNumber
    );
}

function getDocuments(uint256 _candidateId) external view returns (Document[] memory) {
    require(_candidateId <= candidates.length, "Invalid candidate ID");
    uint256 arrayIndex = _candidateId - 1;

    Candidate storage candidate = candidates[arrayIndex];

    // Check if the candidate exists
    require(candidate.Id != 0, "Candidate with given ID does not exist");

    uint256[] memory documentIds = candidate.documentIds;

    // Fetch all documents associated with the candidate
    Document[] memory result = new Document[](documentIds.length);

    for (uint256 i = 0; i < documentIds.length; i++) {
        result[i] = documents[documentIds[i]];
    }

    return result;
}

function getCandidatesByCompany(address _companyAddress) external view returns (Candidate[] memory) {
    require(companyAddress[_companyAddress] != 0, "Invalid company address");

    uint256 arrayIndex = companyAddress[_companyAddress] - 1;
    uint256[] memory candidateIds = companies[arrayIndex].candidateIds;

    Candidate[] memory result = new Candidate[](candidateIds.length);

    // Fetch all candidates associated with the company directly
    for (uint256 i = 0; i < candidateIds.length; i++) {
        result[i] = candidates[candidateIds[i] - 1];
    }

    return result;
}

function getDocumentsByCandidate(address _candidateAddress) external view returns (Document[] memory) {
    require(candidateAddress[_candidateAddress] != 0, "Invalid candidate address");

    uint256 arrayIndex = candidateAddress[_candidateAddress] - 1;
    uint256[] memory documentIds = candidates[arrayIndex].documentIds;

    Document[] memory result = new Document[](documentIds.length);

    // Fetch all documents associated with the candidate directly
    for (uint256 i = 0; i < documentIds.length; i++) {
        result[i] = documents[documentIds[i] - 1];
    }

    return result;
}

 function getTotalCompanies() internal view returns (uint256) {
        return companies.length;
    }

    function getTotalCandidates() internal view returns (uint256) {
        return candidates.length;
    }

    function getTotalDocuments() internal view returns (uint256) {
        return documents.length;
    }

function getVerifiers() public view onlyOwner returns (address[] memory) {
    return verifiers;
}

function getOwner() public view returns (address) {
    return owner();
}

function getZeroAddress() public pure returns (address) {
    return address(0);
}

}
