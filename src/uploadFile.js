import React, { useState } from 'react';
import Moralis from 'moralis';
import abi from "./abis/src/contracts/Verification.sol/Verification.json";
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';


const { ethereum } = window;
const contractAddress = "0x7bfa1898152cdce9d601f3029e69b23011b4210d";
const contractAbi = abi.abi;



function UploadToIpfs() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [candidateIds, setCandidateIds] = useState('');
  const { address,isConnected } = useAccount()
  
  const GetEthereumContract = async () => {
    //check whether device pc or mobile
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // console.log(contract);
    return contract; 
};

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleCandidateIdsChange = (event) => {
    setCandidateIds(event.target.value);
  }; 

  const uploadFiles = async () => {
    await Moralis.start({
      apiKey: "YNBmlTN0i6gW08Qne6deVbRUybCIkyRqVkEqhIciFOmIlEcw6YcIJ7BIjwPql7Jq",
    });

    const filesArray = Array.from(selectedFiles);

    const uploadArray = filesArray.map((file) => {
      return {
        path: file.name,
        content: file
      };                  
    });

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });

    console.log('Uploaded Links:', response.result);

    const fileNames = filesArray.map(file => file.name);
    const contentIDs = response.result.map(item => item.hash);
    const contentIDsBytes = contentIDs.map(id => ethers.utils.toUtf8Bytes(id));

    // Convert the comma-separated string of candidate IDs to an array of numbers
    let candidateIdsArray = candidateIds.split(',').map(id => id.trim()).map(Number);
    
      try {
        const contract = await GetEthereumContract(); // Assuming GetEthereumContract returns the contract instance
        const transaction = await contract.addDocuments(fileNames, contentIDsBytes, candidateIdsArray).send({ from: address });
        await transaction.wait();
        console.log('Documents added to the blockchain!');
      } catch (error) {
        console.error('Error adding documents:', error);
      }    
  };

  return (
    <div>
      <h1>Upload Files to IPFS</h1>
      <input type="text" value={candidateIds} onChange={handleCandidateIdsChange} placeholder="Candidate IDs (comma-separated)"  />
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={uploadFiles}>Upload</button>
    </div>
  );
}

export default UploadToIpfs;
