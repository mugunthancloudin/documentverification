import React from 'react'
import { useAccount } from "wagmi";
import CompanyPrivilages from './companyPrivilages'
import Blockchain from "../../../blockchain";
import "./company.css";

export default function CompanyHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();
  return (
    <>
      <div className="container-fluid companyBg">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 ">&nbsp;</div>
            <div className="col-lg-6 text-end pe-5">
              <w3m-button />
            </div>
          </div>
          <div className="row  xxx mt-5">
          <CompanyPrivilages/>
          </div>
          
        </div>
      </div>
    </>
  )
}
