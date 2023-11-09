import React from 'react'
import "./verificationHome.css"
import { Link } from 'react-router-dom'

export default function VerificationHome() {
  return (
    <>
      <div className='container-fluid verifyBg'>
        <div className='container pt-5 pb-5'>
            <div className='row text-center'>
                <h1>Verify Certificates</h1>
                <p className='mt-2'>This is the certificate verification site for Indian Institute of Information Technology Vadodara</p>
                <hr className="mt-2"/>
                <h5 className='mt-2'>Click here to verify the certificates!</h5>
               <Link to="documentVerification"><button className='btn btn-primary verifyButton mt-3 pt-2 pb-2' >Verify</button></Link> 
            </div>
        </div>
      </div>
    </>
  )
}
