import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Blockchain from "../../../blockchain";
import OwnerPrivilages from "./ownerPrivilages";
import "./owner.css";

export default function OwnerHome() {
  const { address, isConnected } = useAccount();
  const blockchain = Blockchain();
  const [checkOwner, setCheckOwner] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        if (isConnected) {
          let isowner = await blockchain.isOwner(address);
          console.log(isowner);
          setCheckOwner(isowner);
        }
      } catch (error) {
        // Handle errors
      }
    }
    fetchData();
  }, [isConnected]);

  return (
    <>
      <div className="container-fluid ownerBg">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 text-center adminHome ">
              <h1>
              Get Connected now to unlock administrative access.
              </h1>
              <div className="col-lg-12 text-center btnWagmi"><w3m-button /></div>
              
              
            </div>
          </div>
          <div className="row mt-5">
          {!checkOwner ? <OwnerPrivilages /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
