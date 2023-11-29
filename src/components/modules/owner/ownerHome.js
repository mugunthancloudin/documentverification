import React from "react";
import { useAccount } from "wagmi";


export default function OwnerHome() {

  const { address,isConnected } = useAccount()
  console.log(address);
  console.log(isConnected);

  return (
    <>
      <div className="container-fluid homeBg ">
    
        <div className="row">
          <div className="col-lg-6 ">&nbsp;</div>
          <div className="col-lg-6 text-end text-white pe-5">
            <h1 className="homeH1 fw-bold">DOC-VERIFY</h1>
            <p className="fw-bold">
              Tamper-proof Document Issuance & Verification System <br></br>
              for Issuing Authorities to issue Verifiable Documents to <br></br>
              Recipients, allowing them to store & share them <br></br> securely
              from their Digital Wallet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
