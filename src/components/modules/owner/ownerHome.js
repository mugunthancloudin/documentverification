import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";
import OwnerPrivilages from "./ownerPrivilages";

export default function OwnerHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();

  useEffect(() => {
    async function fetchData() {
      try {
        if (isConnected) {
          // await blockchain.isConnected();
          console.log("hi");
          let isowner = await blockchain.isOwner(address);
          console.log("muf");
          console.log(isowner);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);

  return (
<>
      <div className="container-fluid homeBg">
        <div className="container">
          <div className="row ">
          <div className="col-lg-6 ">&nbsp;</div>
            <div className="col-lg-6 text-end text-white pe-5">
              <h1 className="homeH1 fw-bold">DOC-VERIFY</h1>
              <p className="fw-bold">
                Tamper-proof Document Issuance & Verification System <br></br>
                for Issuing Authorities to issue Verifiable Documents to{" "}
                <br></br>
                Recipients, allowing them to store & share them <br></br>{" "}
                securely from their Digital Wallet.
              </p>
              <w3m-button />
            </div>
          </div>

          <OwnerPrivilages/>
        </div>
      </div>
    </>
  );
}
