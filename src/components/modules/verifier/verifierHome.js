import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./verifier.css";
import Swal from "sweetalert2";
import VerifierPrivilages from "./verifierPrivilages";

export default function VerifierHome() {
  const [data, setData] = useState([
    {
      sno: 1,
      candidateId: "C001",
      documentId: "D001",
      documentName: "Resume",
      documentType: "PDF",
      expiryDate: "2023-12-31",
      cid: "CID001",
      verify: "Pending",
    },
    {
      sno: 2,
      candidateId: "C002",
      documentId: "D002",
      documentName: "Cover Letter",
      documentType: "Word",
      expiryDate: "2023-11-30",
      cid: "CID002",
      verify: "Approved",
    },
    // Add more data entries as needed
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerification = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmVerification = () => {
    // Handle the verification logic here
    const updatedData = data.map((dataItem) =>
      dataItem.sno === selectedItem.sno
        ? { ...dataItem, verify: "Verified" }
        : dataItem
    );
    setData(updatedData);
    setShowModal(false);
  };

  return (
    <>
      <div className="container-fluid verifierBg">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 ">
              <div className="row">
                <VerifierPrivilages />
              </div>
            </div>
            <div className="col-lg-6 text-end pe-5">
              <w3m-button />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
