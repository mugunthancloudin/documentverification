import React,{useEffect} from "react";
import "./candidate.css";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";
import CandidatePrivilages from "./candidatePrivilages";

export default function CandidateHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();

  useEffect(() => {
    // Scroll to the second primary div when wallet is connected
    if (isConnected) {
      const secondDiv = document.getElementById("secondDiv");
      if (secondDiv) {
        secondDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
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
              <div className="wagmiBtn"  id="secondDiv">
                <w3m-button />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConnected ? (
        <div className="container-fluid" >
          <div className="container">
            <CandidatePrivilages/>
          </div>
        </div>
      ) : (null)}
    </>
  );
}
