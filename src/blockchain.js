import abi from "./abis/src/contracts/Verification.sol/Verification.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { async } from "q";
import Swal from 'sweetalert2';


const { ethereum } = window;
const contractAddress = "0x465A2464F8A1617811F38d7b169BcD0198280b1D";
const contractAbi = abi.abi;
const privateKey =
  "736a61c7b4b6bd0a4b8fb66e5d76ac69329d7c8f4553063716c01f07364742cc";
const providerUrl =
  "https://flashy-rough-snowflake.matic-testnet.quiknode.pro/ee0480f322e2f011a467e1989a5689b567834c70/";

export default function Blockchain() {
  let success = "success";
  let info = "info";
  const { address,isConnected } = useAccount();

  const GetEthereumContract = async () => {
    // if(isConnected)
    //  {
      //check whether device pc or mobile
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(contractAddress, contractAbi, signer);
      // console.log(contract);
      return contract;
    // } 
    // else {
    //   console.log("wallet not connected");
    // }
  };

  const setMaxVerifiers = async (newMaxVerifiers) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.setMaxVerifiers(newMaxVerifiers);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Max Verifiers set to ${newMaxVerifiers}`);
    } catch (error) {
      console.error("Error setting max verifiers:", error);
    }
  };

  const addVerifiers = async (data) => {
    try {
      let data=[data]
      const contract = await GetEthereumContract();
      const transaction = await contract.addVerifiers(data); 
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Verifiers added successfully`);
    } catch (error) {
      // console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }
    }
  };
  
  const replaceVerifiers = async (oldVerifier, newVerifier) => {
    try {
      let oldVerifiers=[oldVerifier]
      let newVerifiers=[newVerifier]
      const contract = await GetEthereumContract();
      const transaction = await contract.replaceVerifiers(oldVerifiers, newVerifiers);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Verifiers replaced successfully`)  ;
    } catch (error) {
      // console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }
    }
  };
  const removeVerifiers = async (oldVerifier) => {
    try {
      let oldVerifiers=[oldVerifier]
      let newVerifiers=["0x0000000000000000000000000000000000000000"]
      const contract = await GetEthereumContract();
      const transaction = await contract.replaceVerifiers(oldVerifiers, newVerifiers);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Verifiers replaced successfully`)  ;
    } catch (error) {
      // console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }
    }
  };

  const addCompanies = async (data) => {
    try {

console.log(data);
        const contract = await GetEthereumContract();
        const transaction = await contract.addCompanies(
          [data.walletAddress],
          [data.name],
          [data.location],
          [data.mobileNumber],
          [data.licenceNumber],
          [data.email]);
        await transaction.wait();
        let hashValue=await transaction.hash
        alert_(success,hashValue)
        console.log('Companies added successfully');
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }
    }
};

  const removeCompanies = async ([ids]) => {
    try {
      console.log(ids);
      const contract = await GetEthereumContract();
      const transaction = await contract.removeCompanies([ids]);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Companies removed successfully`);
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }    }
  };
  
  const addCandidates = async (data) => {
    try {
        const contract = await GetEthereumContract();
        const transaction = await contract.addCandidates([data.walletAddress], [data.name], [data.address], [data.email]
          , [data.mobileNumber]);
        await transaction.wait();
        let hashValue=await transaction.hash
        alert_(success,hashValue)
        console.log('Candidates added successfully');
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }    }
};

const editCandidateExistingCompany = async (data) => {
  try {
      const contract = await GetEthereumContract();
      const candidateInfo = await contract.getCandidate(candidateAddress[candidateByAddress]);
      const transaction = await contract.editCandidate(candidateInfo.id, candidateInfo.name, candidateInfo.location, candidateInfo.email, candidateInfo.phoneNumber, data.currentCompany);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Candidate with ID ${candidateInfo.id} edited successfully`);
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }  }
};

const editCandidate = async (candidateByAddress) => {
  try {
      const contract = await GetEthereumContract();
      const candidateInfo = await contract.getCandidate(candidateAddress[candidateByAddress]);
      const transaction = await contract.editCandidate(candidateInfo.id, candidateInfo.name, candidateInfo.location, candidateInfo.email, candidateInfo.phoneNumber, candidateInfo.currentCompany);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Candidate with ID ${candidateInfo.id} edited successfully`);
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }  }
};
  
  const removeExistingCompany = async (candidateByAddress) => {
  try {
      const contract = await GetEthereumContract();
      let zeroAddress=["0x0000000000000000000000000000000000000000"];
      const candidateInfo = await contract.getCandidate(candidateAddress[candidateByAddress]);
      const transaction = await contract.editCandidate(candidateInfo.id, candidateInfo.name, candidateInfo.location, candidateInfo.email, candidateInfo.phoneNumber, zeroAddress);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Candidate with ID ${candidateInfo.id} edited successfully`);
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }  }
};

  const editCandidateCurrentCompany = async (id, newCurrentCompany) => {
  try {
      const contract = await GetEthereumContract();
      const transaction = await contract.editCandidateCurrentCompany(id, newCurrentCompany);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Current company of candidate with ID ${id} edited successfully`);
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }  }
};

const addDocuments = async (data) => {
  try {
      const contract = await GetEthereumContract();
      const transaction = await contract.addDocuments(
          data.names,
          data.cids,
          data.candidateIds,
          data.typesOfDocument,
          data.expirationDates
      );
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log('Documents added successfully');
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;

    const errorRe = /execution reverted: (.*?)"/;
    const errorMatch = errorRe.exec(errorMessage);

    if (errorMatch) {
      const error = errorMatch[1];
      let err = error.toString();
      alert_(info, err);
    } else {
      console.error(errorMessage);
    }  }
};
  const removeCandidates = async ([ids]) => {
    try {
      const contract = await GetEthereumContract();
      const transaction = await contract.removeCandidates([ids]);
      await transaction.wait();
      let hashValue=await transaction.hash
      alert_(success,hashValue)
      console.log(`Candidates removed successfully`);
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }    }
  };

  const verifyDocuments = async ([documentIds]) => {
    try {
        const contract = await GetEthereumContract();
        const isCancelled = false;
        const transaction = await contract.verifyDocuments([documentIds], [isCancelled]);
        await transaction.wait();
        console.log('Documents verified successfully');
        return await getAndCategorizeAllDocuments();
    } catch (error) {
        console.error('Error verifying documents:', error);
    }
  };

  const cancelDocuments = async ([documentIds], [isCancelled]) => {
    try {
        const contract = await GetEthereumContract();
        const isCancelled = true;
        const transaction = await contract.verifyDocuments([documentIds], [isCancelled]);
        await transaction.wait();
        let hashValue=await transaction.hash
        alert_(success,hashValue)
        console.log('Documents verified successfully');
        return await getAndCategorizeAllDocuments();
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
  
      const errorRe = /execution reverted: (.*?)"/;
      const errorMatch = errorRe.exec(errorMessage);
  
      if (errorMatch) {
        const error = errorMatch[1];
        let err = error.toString();
        alert_(info, err);
      } else {
        console.error(errorMessage);
      }    }
  };

  const getAndCategorizeAllDocuments = async () => {
    try {
      const contract = await GetEthereumContract();
  
      const allDocuments = [];
      const verifiedDocuments = [];
      const unverifiedDocuments = [];
      const cancelledDocuments = [];
  
      const documentCount = await contract.documents.length();
  
      for (let i = 1; i <= documentCount; i++) {
        const document = await contract.documents(i);
  
        allDocuments.push(document);
  
        if (document.isVerified) {
          verifiedDocuments.push(document);
        } else if (document.isCancelled) {
          cancelledDocuments.push(document);
        } else {
          unverifiedDocuments.push(document);
        }
      }
  
      return {
        allDocuments,
        verifiedDocuments,
        unverifiedDocuments,
        cancelledDocuments,
      };
    } catch (error) {
      console.error('Error in categorize documents', error);
      throw error; // Propagate the error if needed
    }
  };

  // Function to get candidate details by ID
  const getCandidate = async (getCandidateId) => {
    try {
      const contract = await GetEthereumContract();
      const result = await contract.getCandidate(getCandidateId);
      console.log(result);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  };

  // Function to get company details by ID
  const getCompany = async (getCompanyId) => {
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

// Function to get document details by ID
const getDocument = async (documentId) => {
  try {
    const contract = await GetEthereumContract();
    const result = await contract.getDocument(documentId);
    console.log(result);
  } catch (error) {
    console.error("Error fetching document:", error);
  }
};

// Function to get candidates by company ID
const getCandidatesByCompany = async (companyByAddress) => {
  try {
    const contract = await GetEthereumContract();
    const candidateInfo = await contract.getCandidatesByCompany(companyAddress[companyByAddress].Id);
    console.log(candidateInfo);
    return candidateInfo;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};


// Function to get documents by candidate ID
const getDocumentsByCandidate = async (candidateByAddress) => {
  try {
    const contract = await GetEthereumContract();
    const documentInfo = await contract.getDocumentsByCandidate(candidateAddress[candidateByAddress].Id);
    console.log(documents);
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};


const isOwner = async (address) => {
  console.log(address);
  try {
    const contract = await GetEthereumContract();
    // console.log(contract);
    const result = await contract.getOwner();
    console.log(result); 
    if (address==result){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.error("Error fetching owner:", error);
  }
};
const alert_ = (indication, hash) => {
  Swal.fire({
    position: "center",
    icon: indication,
    title: hash,
    showConfirmButton: true,
    focusCancel: false,
  });
};
return{
  addVerifiers,
  isOwner,
  replaceVerifiers,
  removeVerifiers,
  addCompanies,
  removeCompanies,
  setMaxVerifiers,
  addCandidates
}

}
 