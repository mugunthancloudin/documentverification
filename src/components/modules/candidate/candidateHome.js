import React, { useEffect, useState } from "react";
import "./candidate.css";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";
import CandidatePrivilages from "./candidatePrivilages";

export default function CandidateHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();

  const [candidateDetails, setCandidateDetails] = useState();
  console.log(candidateDetails);

  useEffect(() => {
    // Scroll to the second primary div when wallet is connected
    if (isConnected) {
      const secondDiv = document.getElementById("secondDiv");
      if (secondDiv) {
        secondDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected === true) {
        try {
          let personal = await blockchain.getDocumentsByCandidate(address);
          console.log(personal);
          setCandidateDetails(personal);
        } catch (error) {
          console.error("Error fetching data:", error); 
        }
      } else {
        console.log("Not a candidate");
      }
    };

    fetchData();
  }, [isConnected]);

  return (
    <>
      <div className="container-fluid candidateBg">
        <div className="container pt-5 pb-5">
          <div className="row text-center">
            <div className="col-lg-6">&nbsp;</div>
            <div className="col-lg-6 pt-5">
              <h1 className="mt-5">Verify Your Certificates</h1>
              <p className="mt-3">
                This is the certificate verification site for Indian Institute
                of Information{" "}
              </p>
              <hr className="mt-2" />
              <h5 className="mt-2">Connect to verify the certificates!</h5>
              <div className="wagmiBtn col-lg-6" id="secondDiv">
                <w3m-button />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {isConnected ? (
       
            
              <CandidatePrivilages candidateDocs={candidateDetails} />
            
         
        ) : null}
       </div>
    </>
  );
}
