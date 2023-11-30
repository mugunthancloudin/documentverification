import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";
import "./verifier.css";
import VerifierPrivilages from "./verifierPrivilages";
import VerificationDashboard from "./verificationDashboard";

export default function VerifierHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [documentForVerification,setDocumentForVerification] = useState();
  console.log(documentForVerification);


  const handleVerification = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleConfirmVerification = () => {
  //   // Handle the verification logic here
  //   const updatedData = data.map((dataItem) =>
  //     dataItem.sno === selectedItem.sno
  //       ? { ...dataItem, verify: "Verified" }
  //       : dataItem
  //   );
  //   setData(updatedData);
  //   setShowModal(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected === true) {
        try {
          let personal = await blockchain.getAndCategorizeAllDocuments();
          console.log(personal);
          setDocumentForVerification(personal);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log("Not a patient");
      }
    };

    fetchData();
  }, [isConnected]);

  return (
    <>
      <div className="container-fluid verifierBg">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 ">
              <div className="row text-center mt-5">
                <h1 className="mt-5">Verify Your Certificates</h1>
                <p className="mt-3">
                  This is the certificate verification site for Indian Institute
                  of Information{" "}
                </p>
                <hr className="mt-2" />
                <h5 className="mt-2">Connect to verify the certificates!</h5>
                <div className="wagmiBtn mb-5">
                  <w3m-button />
                </div>
                {isConnected ? <VerifierPrivilages /> : null}
              </div>
            </div>
            <div className="col-lg-6">&nbsp;</div>
          </div>
          {isConnected ? <VerificationDashboard /> : null}
        </div>
      </div>
    </>
  );
}
