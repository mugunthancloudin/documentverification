import abi from "./abis/src/contracts/Verification.sol/Verification.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = "0x7bfa1898152cdce9d601f3029e69b23011b4210d";
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "https://flashy-rough-snowflake.matic-testnet.quiknode.pro/ee0480f322e2f011a467e1989a5689b567834c70/";

export default function Blockchain() {
  const { address,isConnected } = useAccount()
  console.log(address);
  console.log(isConnected);
  const [newMaxVerifiers, setNewMaxVerifiers] = useState("");
  const [getCandidateId, setGetCandidateId] = useState("");
  const [getCompanyId, setGetCompanyId] = useState("");
  const [addVerifiersInput, setAddVerifiersInput] = useState("");
  const [oldVerifiersInput, setOldVerifiersInput] = useState("");
  const [newVerifiersInput, setNewVerifiersInput] = useState("");
  const [removeCompaniesInput, setRemoveCompaniesInput] = useState("");
  const [removeCandidatesInput, setRemoveCandidatesInput] = useState("");
  const [companyIdsInput, setCompanyIdsInput] = useState("");
  const [companyAddressesInput, setCompanyAddressesInput] = useState("");
  const [companyNamesInput, setCompanyNamesInput] = useState("");
  const [candidateIdsInput, setCandidateIdsInput] = useState("");
  const [candidateNamesInput, setCandidateNamesInput] = useState("");
  const [verifyCandidateIdsInput, setVerifyCandidateIdsInput] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [setContractOwner] = useState("");



  const GetEthereumContract = async () => {
    if(isConnected)
     {
      //check whether device pc or mobile
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, contractAbi, signer);
      // console.log(contract);
      return contract;
    } 
    else {
      console.log("wallet not connected");
    }
  };

  const setMaxVerifiers = async (newMaxVerifiers) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.setMaxVerifiers(newMaxVerifiers);
      await transaction.wait();
      console.log(`Max Verifiers set to ${newMaxVerifiers}`);
    } catch (error) {
      console.error("Error setting max verifiers:", error);
    }
  };

  const addVerifiers = async (verifiers) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.addVerifiers(verifiers); 
      await transaction.wait();
      console.log(`Verifiers added successfully`);
    } catch (error) {
      console.error("Error adding verifiers:", error);
    }
  };
  
  const replaceVerifiers = async (oldVerifiers, newVerifiers) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.replaceVerifiers(oldVerifiers, newVerifiers);
      await transaction.wait();
      console.log(`Verifiers replaced successfully`)  ;
    } catch (error) {
      console.error("Error replacing verifiers:", error);
    }
  };

  const addCompanies = async (ids, addresses, names) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.addCompanies(ids, addresses, names);
      await transaction.wait();
      console.log(`Companies added successfully`);
    } catch (error) {
      console.error("Error adding companies:", error);
    }
  };

  const removeCompanies = async (ids) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.removeCompanies(ids);
      await transaction.wait();
      console.log(`Companies removed successfully`);
    } catch (error) {
      console.error("Error removing companies:", error);
    }
  };
  
  const addCandidates = async (ids, names) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.addCandidates(ids, names);
      await transaction.wait();
      console.log(`Candidates added successfully`);
    } catch (error) {
      console.error("Error adding candidates:", error);
    }
  };

  const removeCandidates = async (ids) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.removeCandidates(ids);
      await transaction.wait();
      console.log(`Candidates removed successfully`);
    } catch (error) {
      console.error("Error removing candidates:", error);
    }
  };
  
  const verifyCandidates = async (ids) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.verifyCandidates(ids);
      await transaction.wait();
      console.log(`Candidates verified successfully`);
    } catch (error) {
      console.error("Error verifying candidates:", error);
    }
  };

  // Function to get candidate details by ID
  const getCandidate = async () => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getCandidate(getCandidateId);
      console.log(result);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  };

  // Function to get company details by ID
  const getCompany = async () => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getCompany(getCompanyId);
      console.log(result);
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  // Function to get list of verifiers
  const getVerifiers = async () => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getVerifiers();
      console.log(result);
    } catch (error) {
      console.error("Error fetching verifiers:", error);
    }
  };

  const getDocument = async (companyId, candidateId) => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getDocument(companyId, candidateId);
      console.log(`Document ID: ${result}`);
      // You can set the result to state if you want to display it in your component
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    const checkAccount = async () => {
      if (isConnected) {
      const contract = await GetEthereumContract(); // Assuming this function works correctly
      const isCompany = await contract.onlyCompany(address);
      setIsCompany(isCompany);
    
    // Check if the current account is a registered verifier
    const isVerifier = await contract.onlyVerifier(address);
    setIsVerifier(isVerifier);

    // Get the owner of the contract
    const isOwner = await contract.getOwner();
    setContractOwner(isOwner);
    }
    checkAccount();
  }}, [isConnected]);

  const handleAddCandidatesClick = (event) => {
    event.preventDefault();
    const ids = candidateIdsInput.split(",").map((id) => parseInt(id.trim()));
    const names = candidateNamesInput.split(",").map((name) => name.trim());
    addCandidates(ids, names);  
    setCandidateIdsInput(""); // Reset the input field after submission
    setCandidateNamesInput(""); // Reset the input field after submission
  };

  const handleRemoveCandidatesClick = (event) => {
    event.preventDefault();
    const ids = removeCandidatesInput.split(",").map((id) => parseInt(id.trim()));
    removeCandidates(ids);
    setRemoveCandidatesInput(""); // Reset the input field after submission
  };

  const handleAddVerifiersClick = (event) => {
    event.preventDefault();
    const verifiers = addVerifiersInput.split(",").map((address) => address.trim());
    addVerifiers(verifiers);
    setAddVerifiersInput(""); // Reset the input field after submission
  };
  
  const handleReplaceVerifiersClick = (event) => {
    event.preventDefault();
    const oldVerifiers = oldVerifiersInput.split(",").map((address) => address.trim());
    const newVerifiers = newVerifiersInput.split(",").map((address) => address.trim());
    replaceVerifiers(oldVerifiers, newVerifiers);
    setOldVerifiersInput(""); // Reset the input field after submission
    setNewVerifiersInput(""); // Reset the input field after submission
  };

  const handleAddCompaniesClick = (event) => {
    event.preventDefault();
    const ids = companyIdsInput.split(",").map((id) => parseInt(id.trim()));
    const addresses = companyAddressesInput.split(",").map((address) => address.trim());
    const names = companyNamesInput.split(",").map((name) => name.trim());
    addCompanies(ids, addresses, names);
    setCompanyIdsInput(""); // Reset the input field after submission
    setCompanyAddressesInput(""); // Reset the input field after submission
    setCompanyNamesInput(""); // Reset the input field after submission
  };

  const handleRemoveCompaniesClick = (event) => {
    event.preventDefault();
    const ids = removeCompaniesInput.split(",").map((id) => parseInt(id.trim()));
    removeCompanies(ids);
    setRemoveCompaniesInput(""); // Reset the input field after submission
  };
  
  const handleVerifyCandidatesClick = (event) => {
    event.preventDefault();
    const ids = verifyCandidateIdsInput.split(",").map((id) => parseInt(id.trim()));
    verifyCandidates(ids);
    setVerifyCandidateIdsInput(""); // Reset the input field after submission
  };

  const handleGetCandidateClick = (event) => {
    event.preventDefault();
    getCandidate();
  };

  const handleGetCompanyClick = (event) => {
    event.preventDefault();
    getCompany();
  };

  const handleGetVerifiersClick = (event) => {
    event.preventDefault();
    getVerifiers();
  };

  const handleGetDocumentClick = (event) => {
    event.preventDefault();
    getDocument(getCompanyId, getCandidateId);
  };

  const handleInputChange = (event) => {
    setNewMaxVerifiers(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMaxVerifiers(newMaxVerifiers);
    setNewMaxVerifiers(""); // Reset the input field after submission
  };

  return (
    <div>
      <div>
      <div>
  <h3>Add Companies</h3>
  <input
    type="text"
    placeholder="Enter company IDs (comma-separated)"
    onChange={(e) => setCompanyIdsInput(e.target.value)}
    value={companyIdsInput}
  />
  <input
    type="text"
    placeholder="Enter company addresses (comma-separated)"
    onChange={(e) => setCompanyAddressesInput(e.target.value)}
    value={companyAddressesInput}
  />
  <input
    type="text"
    placeholder="Enter company names (comma-separated)"
    onChange={(e) => setCompanyNamesInput(e.target.value)}
    value={companyNamesInput}
  />
  <button onClick={handleAddCompaniesClick}>Add Companies</button>
</div>

<div>
  <h3>Add Candidates</h3>
  <input
    type="text"
    placeholder="Enter candidate IDs (comma-separated)"
    onChange={(e) => setCandidateIdsInput(e.target.value)}
    value={candidateIdsInput}
  />
  <input
    type="text"
    placeholder="Enter candidate names (comma-separated)"
    onChange={(e) => setCandidateNamesInput(e.target.value)}
    value={candidateNamesInput}
  />
  {isCompany && <button onClick={handleAddCandidatesClick}>Add Candidates</button>}  
</div>

<div>
    <h3>Remove Companies</h3>
    <input
    type="text"
    placeholder="Enter company IDs to remove (comma-separated)"
    onChange={(e) => setRemoveCompaniesInput(e.target.value)}
    value={removeCompaniesInput}
    />
    <button onClick={handleRemoveCompaniesClick}>Remove Companies</button>
</div>

<div>
    <h3>Remove Candidates</h3>
    <input
      type="text"
      placeholder="Enter candidate IDs to remove (comma-separated)"
      onChange={(e) => setRemoveCandidatesInput(e.target.value)}
      value={removeCandidatesInput}
    />
    {isCompany && <button onClick={handleRemoveCandidatesClick}>Remove Candidates</button>}  
</div>

<div>
  <h3>Verify Candidates</h3>
  <input
    type="text"
    placeholder="Enter candidate IDs to verify (comma-separated)"
    onChange={(e) => setVerifyCandidateIdsInput(e.target.value)}
    value={verifyCandidateIdsInput}
  />
  <button onClick={handleVerifyCandidatesClick}>Verify Candidates</button>
</div>
      <h3>Add Verifiers</h3>
  <input
    type="text"
    placeholder="Enter verifier addresses (comma-separated)"
    onChange={(e) => setAddVerifiersInput(e.target.value)}
    value={addVerifiersInput}
  />
  <button onClick={handleAddVerifiersClick}>Add Verifiers</button>
</div>

<div>
  <h3>Replace Verifiers</h3>
  <input
    type="text"
    placeholder="Enter old verifier addresses (comma-separated)"
    onChange={(e) => setOldVerifiersInput(e.target.value)}
    value={oldVerifiersInput}
  />
  <input
    type="text"
    placeholder="Enter new verifier addresses (comma-separated)"
    onChange={(e) => setNewVerifiersInput(e.target.value)}
    value={newVerifiersInput}
  />
  <button onClick={handleReplaceVerifiersClick}>Replace Verifiers</button>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={newMaxVerifiers}
          onChange={handleInputChange}
          placeholder="Enter new max verifiers"
        />
        <button type="submit">Set Max Verifiers</button>
      </form>
        <h3>Get Candidate by ID</h3>
        <input
          type="number"
          value={getCandidateId}
          onChange={(e) => setGetCandidateId(e.target.value)}
        />
        <button onClick={handleGetCandidateClick}>Get Candidate</button>
      </div>
      <div>
        <h3>Get Company by ID</h3>
        <input
          type="number"
          value={getCompanyId}
          onChange={(e) => setGetCompanyId(e.target.value)}
        />
        <button onClick={handleGetCompanyClick}>Get Company</button>
      </div>
      <div>
        <h3>Get Verifiers</h3>
        <button onClick={handleGetVerifiersClick}>Get Verifiers</button>
      </div>
      <div>
        <h3>Get Document</h3>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={getCompanyId}
          onChange={(e) => setGetCompanyId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Candidate ID"
          value={getCandidateId}
          onChange={(e) => setGetCandidateId(e.target.value)}
        />
        <button onClick={handleGetDocumentClick}>Get Document</button>
      </div>
    </div>
  );
}
