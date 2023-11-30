import React,{useState,useEffect}from "react";
import "./company.css";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";

export default function CompanyData() {

    const { address, isConnected } = useAccount();
  const blockchain = Blockchain();

  const [candidateDetails, setCandidateDetails] = useState();
  const [isCompany, setIsCompany] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        // await blockchain.isWallectConnected();
        // const companyState = await blockchain.isPatient(address);
        // setIsCompany(companyState);

        if (isCompany === true) {
          try {
            let candidateDetails = await blockchain.getPatientPersonaldata(address);
            setCandidateDetails(candidateDetails);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          console.log("Not a organisation");
        }
      } else {
        setIsCompany(false);
      }
    };

    fetchData();
  }, [isConnected, address, isCompany]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row mt-4">
            {/* {candidateDetails.length === 0 ? (
              <div>Loading...</div>
            ) : ( */}
              {/* // candidateDetails.map((data) => ( */}
                <div className="col-lg-4">
                  <div className="card-group d-flex h-100">
                    <div className="card ps-3 flex-fill">
                      <h5 className="text-center pt-2">Health Details</h5>
                      <p className="txt">Name</p>
                      <p className="txt">Email</p>
                      <p className="txt">Number</p>
                      <p className="txt">Wallet Address</p>
                      <p className="txt">Address</p>
                    </div>
                  </div>
                </div>
              {/* )) */}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
}
