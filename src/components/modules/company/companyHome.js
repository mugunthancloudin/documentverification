import React,{useState,useEffect} from 'react'
import { useAccount, } from "wagmi";
import CompanyPrivilages from './companyPrivilages'
import Blockchain from "../../../blockchain";
import "./company.css";

export default function CompanyHome() {


  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();
  const [checkCompany, setCheckCompany] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        if (isConnected) {
          let iscompany = await blockchain.isCompany(address);
          console.log(iscompany);
          setCheckCompany(iscompany);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);
  return (
    <>
      <div className="container-fluid companyBg">
        <div className="container">
          <div className="row ">
          <div className="col-lg-6 text-center companyHome">
            <h1>Connect to your wallet to Continue as a company</h1>
            <div className='companyBtn'><w3m-button /></div>
              
            </div>
            <div className="col-lg-6 ">&nbsp;</div>
            
          </div>
          <div className="row mt-5">
            {checkCompany ? <CompanyPrivilages/> : null}
          
          </div>
          
        </div>
      </div>
    </>
  )
}
