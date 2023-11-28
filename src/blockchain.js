import abi from "./abis/src/contracts/Verification.sol/Verification.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = "0xAb00Bf924CB29Fa9f566c1032FAF46a915be791B";
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "https://flashy-rough-snowflake.matic-testnet.quiknode.pro/ee0480f322e2f011a467e1989a5689b567834c70/";

export default function Blockchain() {
  const { address,isConnected } = useAccount();

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

  const addCompanies = async (addresses, names, locations, phoneNumbers, licenseNumbers, emails) => {
    try {
        const contract = await GetEthereumContract();
        const transaction = await contract.addCompanies(addresses, names, locations, phoneNumbers, licenseNumbers, emails);
        await transaction.wait();
        console.log('Companies added successfully');
    } catch (error) {
        console.error('Error adding companies:', error);
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
  
  const addCandidates = async (addresses, names, locations, emails, phoneNumbers) => {
    try {
        const contract = await GetEthereumContract();
        const transaction = await contract.addCandidates(addresses, names, locations, emails, phoneNumbers);
        await transaction.wait();
        console.log('Candidates added successfully');
    } catch (error) {
        console.error('Error adding candidates:', error);
    }
};

  const editCandidate = async (id, name, location, email, phoneNumber) => {
  try {
      const contract = await GetEthereumContract();
      const transaction = await contract.editCandidate(id, name, location, email, phoneNumber);
      await transaction.wait();
      console.log(`Candidate with ID ${id} edited successfully`);
  } catch (error) {
      console.error(`Error editing candidate with ID ${id}:`, error);
  }
};

  const editCandidateCurrentCompany = async (id, newCurrentCompany) => {
  try {
      const contract = await GetEthereumContract();
      const transaction = await contract.editCandidateCurrentCompany(id, newCurrentCompany);
      await transaction.wait();
      console.log(`Current company of candidate with ID ${id} edited successfully`);
  } catch (error) {
      console.error(`Error editing current company of candidate with ID ${id}:`, error);
  }
};

  const addDocuments = async (names, cids, candidateIds, typesOfDocument, expirationDates) => {
    try {  
      const contract = await GetEthereumContract();
      const transaction = await contract.addDocuments(names, cids, candidateIds, typesOfDocument, expirationDates);
      await transaction.wait();
      console.log('Documents added successfully');
  } catch (error) {
      console.error('Error adding documents:', error);
  }
};

  // const removeCandidates = async (ids) => {
  //   try {
  //     const contract = await GetEthereumContract();
  //     const transaction = await contract.removeCandidates(ids);
  //     await transaction.wait();
  //     console.log(`Candidates removed successfully`);
  //   } catch (error) {
  //     console.error("Error removing candidates:", error);
  //   }
  // };

  const verifyDocuments = async (candidateIds, documentIds, isCancelled) => {
    try {
        const contract = await GetEthereumContract();
        const transaction = await contract.verifyDocuments(candidateIds, documentIds, isCancelled);
        await transaction.wait();
        console.log('Documents verified successfully');
    } catch (error) {
        console.error('Error verifying documents:', error);
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

  const getDocument = async (documentId) => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getDocument(documentId);
      console.log(`Document ID: ${result}`);
      // You can set the result to state if you want to display it in your component
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  // const getCandidatesByCompany = async (companyId) => {
  //   try {
  //     const contract = await GetEthereumContract();
  //     const result = await contract.getCandidatesByCompany(companyId);
  //     console.log(result);
  //   } catch(error) {
  //     console.error("Error fetching candidates:", error);
  //   }
  // };

  // const getDocumentsByCandidate = async (companyId) => {
  //   try {
  //     const contract = await GetEthereumContract();
  //     const result = await contract.getDocumentsByCandidate(companyId);
  //     console.log(result);
  //   } catch(error) {
  //     console.error("Error fetching candidates:", error);
  //   }
  // }
}
