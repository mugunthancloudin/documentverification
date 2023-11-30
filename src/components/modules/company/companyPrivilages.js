import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Blockchain from "../../../blockchain";
import Swal from "sweetalert2";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U"; // Replace with your actual JWT token

//1.Adding New Candidate Details Validation
const SignupSchema = yup.object().shape({
  name: yup.string().required("*Please enter your name."),
  mobileNumber: yup.string().matches(/^\d{10}$/),
  email: yup
    .string()
    .email("*Please enter a valid email address.")
    .required("*Email is required."),
  walletAddress: yup.string().required("*walletAddress is required."),
  address: yup.string().required("*Residential address is required."),
});

//2.Adding Candidate Document Details Validation
const DocumentDetailsSchema = yup.object().shape({
  name: yup.string().required("*Please enter the name."),
  candidateId: yup.number().required("*Please enter the Candidate Id."),
  docType: yup.string().required("*Please enter the Document Type."),
  expairyDate: yup.date().required("*Please enter the Expiry Date."),
});

//3.Adding Current Company Details Validation
const CurrentCompanySchema = yup.object().shape({
  candidateId: yup.number().required("*Please enter the Candidate Id."),
  companyWalletAddress: yup
    .string()
    .required("*Company Wallet Address is required."),
});

//4.Remove Employee Details Validation
const RemoveEmployeeSchema = yup.object().shape({
  employeeAddressToRemove: yup
    .string()
    .required("*Please enter the Employee Address to Remove."),
});

export default function CompanyPrivilages() {
  let success = "success";
  let info = "info";
  const blockchain = Blockchain();
  const [selectedFile, setSelectedFile] = useState([]);
  const [ipfsAddress, setIpfsAddress] = useState();
  // console.log(ipfsAddress);

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    setSelectedFile([...selectedFile, ...e.target.files]);

    // setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (selectedFile.length === 0) {
      console.log("No files selected.");
      alert_(info, "No files selected.");
      return;
    }
    if (selectedFile.length > 1) {
      console.log("Cannot Upload Multiple files");
      alert_(info, "Cannot Upload Multiple files");
      return;
    }

    try {
      const file = selectedFile[0];
      const fileFormData = new FormData();
      fileFormData.append("file", file);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileFormData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${fileFormData._boundary}`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      const ipfsData = "ipfs.io/ipfs/" + res.data.IpfsHash;
      setIpfsAddress(ipfsData);
      alert_(success, "File successfully uploaded");
      console.log(ipfsData);

      // Extract form data for other fields
      const formDataForFields = {
        // Include other form fields here
      };

      // Additional logic or state updates can be done here

      console.log("Form data for fields:", formDataForFields);
      console.log(`File uploaded to IPFS:`, ipfsData);

      // Clear the selected file after uploading
      setSelectedFile([]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const alert_ = (indication, hash) => {
    Swal.fire({
      position: "center",
      icon: indication,
      title: hash,
      showConfirmButton: true,
      focusCancel: false,
    });
  };

  //1.Add Candidate Details
  const {
    register,
    handleSubmit: handleSubmitCandidateDetails,
    formState: { errors: candidateDetailsErrors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  //2.Add Document Details
  const {
    register: registerDocumentDetails,
    handleSubmit: handleSubmitDocumentDetails,
    formState: { errors: documentDetailsErrors },
  } = useForm({
    resolver: yupResolver(DocumentDetailsSchema),
  });

  //3.Add Current Company Details
  const {
    register: registerCurrentCompany,
    handleSubmit: handleSubmitCurrentCompany,
    formState: { errors: currentCompanyErrors },
  } = useForm({
    resolver: yupResolver(CurrentCompanySchema),
  });

  //4.Remove Employee Details Validation
  const {
    register: registerRemoveEmployee,
    handleSubmit: handleSubmitRemoveEmployee,
    formState: { errors: removeEmployeeErrors },
  } = useForm({
    resolver: yupResolver(RemoveEmployeeSchema),
  });

  //1.Function Call On Add Candidate Details
  const onSubmitOfCandidateDetails = async (data) => {
    try {
      console.log(data);
      const doctorDetails = await blockchain.addCandidates(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 2. Function Call On Add Candidate Document Details
  const onSubmitOfDocumentDetails = async (data) => {
    // Convert the Date object to a string
    data.expairyDate = data.expairyDate.toString();

    const candidateDocumentDetails = {
      ...data,
      ipfsAddress,
    };

    try {
      console.log(candidateDocumentDetails);
      // const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //3.Function Call On Add Current Company Details
  const onSubmitOfCurrentCompany = async (data) => {
    try {
      console.log(data);
      const doctorDetails = await blockchain.editCandidateExistingCompany(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //4.Function Call On Remove Employee Details
  const removeEmployeeAddress = async (data) => {
    try {
      console.log(data);
      const doctorDetails = await blockchain.removeExistingCompany(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Accordion className="pb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Candidate</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitCandidateDetails(
                  onSubmitOfCandidateDetails
                )}
              >
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Name:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("name")}
                        />
                        {candidateDetailsErrors.name && (
                          <p className="text-danger fw-bold">
                            {candidateDetailsErrors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Mobile Number:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("mobileNumber")}
                        />
                        {candidateDetailsErrors.mobileNumber && (
                          <p className="text-danger fw-bold">
                            {candidateDetailsErrors.mobileNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Email:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="email"
                          className="form-control"
                          {...register("email")}
                        />
                        {candidateDetailsErrors.email && (
                          <p className="text-danger fw-bold">
                            {candidateDetailsErrors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Wallet Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...register("walletAddress")}
                        />
                        {candidateDetailsErrors.walletAddress && (
                          <p className="text-danger fw-bold">
                            {candidateDetailsErrors.walletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Residential Address:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <textarea
                          type="text"
                          className="form-control"
                          {...register("address")}
                        />
                        {candidateDetailsErrors.address && (
                          <p className="text-danger fw-bold">
                            {candidateDetailsErrors.address.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button type="submit w-100">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Add Document</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <div className="row mt-3">
                <div className="col-lg-6">
                  <label>Upload Document:</label>
                </div>
                <div className="col-lg-6 mt-2">
                  <div className="row d-flex">
                    <div className="col-lg-6">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                      </div>
                      <div className="col-lg-6 mt-2">
                      <button
                        className="rounded mt-1"
                        onClick={() => handleUploadClick()}
                        // disabled={selectedFile.length === 0}
                      >
                        Upload Document
                      </button>

                     
                    </div>
                    <small className="text-primary">
                        *upload the document first and then submit
                      </small>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmitDocumentDetails(
                  onSubmitOfDocumentDetails
                )}
              >
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Name:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerDocumentDetails("name")}
                        />
                        {documentDetailsErrors.name && (
                          <p className="text-danger fw-bold">
                            {documentDetailsErrors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Candidate Id:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...registerDocumentDetails("candidateId")}
                        />
                        {documentDetailsErrors.candidateId && (
                          <p className="text-danger fw-bold">
                            {documentDetailsErrors.candidateId.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Document Type:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerDocumentDetails("docType")}
                        />
                        {documentDetailsErrors.docType && (
                          <p className="text-danger fw-bold">
                            {documentDetailsErrors.docType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Expairy Date:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="date"
                          className="form-control"
                          {...registerDocumentDetails("expairyDate")}
                        />
                        {documentDetailsErrors.expairyDate && (
                          <p className="text-danger fw-bold">
                            {documentDetailsErrors.expairyDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button type="submit w-100">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Add Existing Employee</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitCurrentCompany(onSubmitOfCurrentCompany)}
              >
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Candidate Id:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...registerCurrentCompany("candidateId")}
                        />
                        {currentCompanyErrors.candidateId && (
                          <p className="text-danger fw-bold">
                            {currentCompanyErrors.candidateId.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-lg-6">
                        <label>Current Company Address:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="text"
                          className="form-control"
                          {...registerCurrentCompany("companyWalletAddress")}
                        />
                        {currentCompanyErrors.companyWalletAddress && (
                          <p className="text-danger fw-bold">
                            {currentCompanyErrors.companyWalletAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-3 text-center">
                    <button type="submit w-100">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Remove Employee</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveEmployee(removeEmployeeAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Employee Address to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerRemoveEmployee("employeeAddressToRemove")}
                    />
                    {removeEmployeeErrors.employeeAddressToRemove && (
                      <p className="text-danger fw-bold">
                        {removeEmployeeErrors.employeeAddressToRemove.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Remove Candidate
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
