import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BigNumber from "bignumber.js";
import Blockchain from "../../../blockchain";
import "./verifier.css";

export default function VerificationDashboard(props) {
  const blockchain = Blockchain();
  const unVerifiedDocument = props.documentDetails.unverified;
  console.log(unVerifiedDocument);
  const verifiedDocument = props.documentDetails.verified;
  console.log(verifiedDocument);
  const canceledDocument = props.documentDetails.canceled;
  console.log(canceledDocument);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerification = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

 //confirm Document Verification
  const handleConfirmVerification = async (documentId) => {
    try {
      console.log(documentId);
      const verifiedDocument = await blockchain.verifyDocuments(documentId);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Cancel Document Verification
  const handleCancelVerification = async (documentId) => {
    try {
      console.log(documentId);
      const verifiedDocument = await blockchain.cancelDocuments(documentId);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="container">
          <div className="row text-white    ">
            <Tabs
              defaultActiveKey="home"
              id="justify-tab-example"
              className="mb-3 verifier "
              justify
            >
              <Tab eventKey="home" title="UnVerified">
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
                            {unVerifiedDocument &&
                              unVerifiedDocument.map((item, index) => (
                                <tr key={item.sno}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.candidateId.toString()}</td>
                                  <td>{item.id.toString()}</td>
                                  <td>{item.name}</td>
                                  <td>{item.typeOfDocument}</td>
                                  <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.cid}</td>
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
                                        <p>
                                          Document Id:{" "}
                                          {selectedItem?.id?.toString()}
                                        </p>
                                        <p>
                                          Name: {selectedItem?.name?.toString()}
                                        </p>
                                        <p>
                                          Document Type:{" "}
                                          {selectedItem?.typeOfDocument?.toString()}
                                        </p>
                                        <p>
                                          Candidate Id:{" "}
                                          {selectedItem?.candidateId?.toString()}
                                        </p>
                                        <p>
                                          Expiry Date:{" "}
                                          {selectedItem?.expirationDate instanceof
                                          BigNumber
                                            ? selectedItem?.expirationDate?.toString()
                                            : selectedItem?.expirationDate}
                                        </p>
                                        <p>
                                          CID:{" "}
                                          <a
                                            href={`http://${selectedItem?.cid?.toString()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            Document to verify
                                          </a>
                                        </p>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button
                                          variant="secondary"
                                          onClick={() =>
                                            handleCancelVerification(
                                              selectedItem?.id
                                            )
                                          }
                                        >
                                          Cancel
                                        </Button>

                                        <Button
                                          variant="success"
                                          onClick={() =>
                                            handleConfirmVerification(
                                              selectedItem?.id
                                            )
                                          }
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
                            {verifiedDocument &&
                              verifiedDocument.map((item,index) => (
                                <tr key={item.sno}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.candidateId.toString()}</td>
                                  <td>{item.id.toString()}</td>
                                  <td>{item.name}</td>
                                  <td>{item.typeOfDocument}</td>
                                  <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.cid}</td>
                                  
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="longer-tab" title="Canceled">
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
                            {canceledDocument &&
                              canceledDocument.map((item,index) => (
                                <tr key={item.sno}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.candidateId.toString()}</td>
                                  <td>{item.id.toString()}</td>
                                  <td>{item.name}</td>
                                  <td>{item.typeOfDocument}</td>
                                  <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.cid}</td>
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
