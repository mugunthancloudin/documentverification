import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./verifier.css";

export default function VerificationDashboard() {

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
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row text-white    ">
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3 verifier "
              justify
            >
              <Tab eventKey="home" title="Not Verified">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.no</th>
                              <th scope="col">Candidate Id</th>
                              <th scope="col">Document Id</th>
                              <th scope="col">Document Name</th>
                              <th scope="col">Document Type</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col">CID</th>
                              <th scope="col">Verify</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.sno}>
                                <th scope="row">{item.sno}</th>
                                <td>{item.candidateId}</td>
                                <td>{item.documentId}</td>
                                <td>{item.documentName}</td>
                                <td>{item.documentType}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.cid}</td>
                                <td>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleVerification(item)}
                                  >
                                    click
                                  </button>
                                  <Modal
                                    show={showModal}
                                    onHide={handleCloseModal}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Verification Confirmation
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <p>Document Id</p>
                                      <p>Name</p>
                                      <p>Document Type</p>
                                      <p>Candidate Id</p>
                                      <p>Expairy Date</p>
                                      <p>CID</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseModal}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        variant="success"
                                        onClick={handleConfirmVerification}
                                      >
                                        Verify
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Verified">
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.no</th>
                              <th scope="col">Candidate Id</th>
                              <th scope="col">Document Id</th>
                              <th scope="col">Document Name</th>
                              <th scope="col">Document Type</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col">CID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.sno}>
                                <th scope="row">{item.sno}</th>
                                <td>{item.candidateId}</td>
                                <td>{item.documentId}</td>
                                <td>{item.documentName}</td>
                                <td>{item.documentType}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.cid}</td>
                               
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="longer-tab"  title="Canceled">
              <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">S.no</th>
                              <th scope="col">Candidate Id</th>
                              <th scope="col">Document Id</th>
                              <th scope="col">Document Name</th>
                              <th scope="col">Document Type</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col">CID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item) => (
                              <tr key={item.sno}>
                                <th scope="row">{item.sno}</th>
                                <td>{item.candidateId}</td>
                                <td>{item.documentId}</td>
                                <td>{item.documentName}</td>
                                <td>{item.documentType}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.cid}</td>
                               
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
