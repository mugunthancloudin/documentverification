import React,{useState} from 'react'

export default function CandidatePrivilages() {

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
      <div className="container-fluid verifyBg">
        <div className="container pt-5 pb-5">
        <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive">
                        <table border="3" className="table table-hover">
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
                                <td><button  className='btn btn-primary'> click</button></td>
                               
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
  )
}
