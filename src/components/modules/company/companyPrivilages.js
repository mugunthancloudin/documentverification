import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Blockchain from "../../../blockchain";

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
  documentFile: yup
    .mixed()
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // Nothing to validate if no file is selected
      return value.size <= 1024 * 1024 * 2; // 2 MB
    })
    .required("*Please upload a document file."),
});

//3.Adding Current Company Details Validation
const CurrentCompanySchema = yup.object().shape({
  candidateId: yup.number().required("*Please enter the Candidate Id."),
  companyWalletAddress: yup.string().required("*Company Wallet Address is required."),
});

//4.Remove Employee Details Validation
const RemoveEmployeeSchema = yup.object().shape({
  employeeAddressToRemove: yup.string().required("*Please enter the Employee Address to Remove."),
});

export default function CompanyPrivilages() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
      // const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //2.Function Call On Add Candidate Document Details
  const onSubmitOfDocumentDetails = async (data) => {
    try {
      console.log(data);
      // const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //3.Function Call On Add Current Company Details
  const onSubmitOfCurrentCompany  = async (data) => {
    try {
      console.log(data);
      // const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

   //4.Function Call On Remove Employee Details
   const removeEmployeeAddress  = async (data) => {
    try {
      console.log(data);
      // const doctorDetails = await blockchain.addCompanies(data);
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

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Upload Document:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileChange}
                        />
                        {selectedFile && (
                          <p className="mt-2">
                            Selected File: {selectedFile.name}
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
                onSubmit={handleSubmitCurrentCompany(
                  onSubmitOfCurrentCompany 
                )}
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
                onSubmit={handleSubmitRemoveEmployee(
                  removeEmployeeAddress
                )}
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
                    Remove Verifiers
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
