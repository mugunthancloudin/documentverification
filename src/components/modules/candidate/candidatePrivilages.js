import React, { useState } from "react";

export default function CandidatePrivilages(props) {
  const candidateDetails = props.candidateDocs;
  console.log(candidateDetails);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container-fluid verifyBg">
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table border="3" className="table table-hover">
                  <thead>
                    <tr className="text-center">
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
                    {candidateDetails &&
                      candidateDetails.map((item, index) => (
                        <tr className="text-center" key={item.sno}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.candidateId.toString()}</td>
                          <td>{item.id.toString()}</td>
                          <td>{item.name}</td>
                          <td>{item.typeOfDocument}</td>
                          <td>
                            {new Date(item.expirationDate).toLocaleDateString()}
                          </td>
                          <td
                            style={{
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.cid}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
