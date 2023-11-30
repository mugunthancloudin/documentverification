import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Blockchain from "../../../blockchain";

//1.Adding New verifier Address Validation
const VerifierAddressSchema = yup.object().shape({
  newVerifierAddress: yup.string().required("* Wallet Address is required."),
});

//2.Removing New verifier Address Validation
const RemoveVerifierSchema = yup.object().shape({
  verifierAddressToRemove: yup
    .string()
    .required("verifier Address to Remove is required."),
});

//3.Replaceable Verifiers Scema
const ReplaceableVerifiersSignupSchema = yup.object().shape({
  existingWalletAddress: yup
    .string()
    .required("*Replaceble walletAddress is required."),
  newWalletAddress: yup.string().required("*New walletAddress is required."),
});

//4.Adding New company Address Validation
const SignupSchema = yup.object().shape({
  name: yup.string().required("*Please enter your name."),
  mobileNumber: yup.string().matches(/^\d{10}$/),
  email: yup
    .string()
    .email("*Please enter a valid email address.")
    .required("*Email is required."),

  location: yup.string().required("*specialization is required."),
  licenceNumber: yup
    .string()
    .matches(/^[A-Z0-9-]+$/, "*Invalid license number format")
    .required(),
  walletAddress: yup.string().required("*walletAddress is required."),
});

//5.Removing New Company Address Validation
const RemoveCompanySchema = yup.object().shape({
  companyAddressToRemove: yup
    .string()
    .required("company Address to Remove is required."),
});

//6.set max verifiers
const MaxVerifiersSchema = yup.object().shape({
  maxVerifiers: yup.number().required("* max verifiers count required"),
});

export default function OwnerPrivilages() {
  const blockchain = Blockchain();
  const [isValidDoctor, setIsValidDoctor] = useState("false");
  const [doctorData, setDoctorData] = useState("");
  // console.log(doctorData[0].email);

  // let mugunth = doctorData[0].email;
  // console.log(mugunth);

  // console.log(isValidDoctor);

  //1.Add owner Address
  const {
    register: registerVerifier,
    handleSubmit: handleSubmitVerifierAddress,
    formState: { errors: verifierAddressErrors },
  } = useForm({
    resolver: yupResolver(VerifierAddressSchema),
  });

  //2.Remove owner Address
  const {
    register: registerRemoveverifier,
    handleSubmit: handleSubmitRemoveVerifierAddress,
    formState: { errors: removeVerifierErrors },
  } = useForm({
    resolver: yupResolver(RemoveVerifierSchema),
  });

  //3.Repalceable Verifiers
  const {
    register: VerifiersReplaceable,
    handleSubmit: handleSubmitOfReplaceVerifiers,
    formState: { errors: replaceableVerifiersErrors },
  } = useForm({
    resolver: yupResolver(ReplaceableVerifiersSignupSchema),
  });

  //4.Add Company Details
  const {
    register,
    handleSubmit: handleSubmitCompanyDetails,
    formState: { errors: companyDetailsErrors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  //5.Remove Company Details
  const {
    register: registerRemoveCompany,
    handleSubmit: handleSubmitRemoveCompanyAddress,
    formState: { errors: removeCompanyErrors },
  } = useForm({
    resolver: yupResolver(RemoveCompanySchema),
  });

  //6.Setting Max verifiers
  const {
    register: maximumVerifiers,
    handleSubmit: handleSubmitOfMaximumVerifier,
    formState: { errors: MaxverifierErrors },
  } = useForm({
    resolver: yupResolver(MaxVerifiersSchema),
  });


  //1.Function Call On Add Verifier Address
  const addNewVerifierAddress = async (data) => {
    console.log(data.newVerifierAddress);
    try {
      const ownerDetails = await blockchain.addVerifiers(data.newVerifierAddress);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //2.Function Call On Remove Verifier Address
  const removeVerifierAddress = async (data) => {
    try {
      const replacedOwner = await blockchain.removeVerifiers(
        data.verifierAddressToRemove
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

   //3.Function Call On Replace Verifier Address
   const replaceVerifierAddress = async (data) => {
    try {
      const removedOwner = await blockchain.replaceVerifiers(
        data.verifierAddressToRemove
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //4.Function Call On Add Company Details
  const onSubmitOfCompanyDetails = async (data) => {
    try {
      console.log(data);
      const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //5.Function Call On Remove Company Address
  const removeCompanyAddress = async (data) => {
    try {
      console.log(data);
      // const removedCompany = await blockchain.removeCompanies(
      //   data.companyAddressToRemove
      // );
      const data_= await blockchain.getAndCategorizeAllDocuments()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //6.Function Call On Set max Verifier Address
  const maxVerifierAddress = async (data) => {
    try {
      const removedOwner = await blockchain.setMaxVerifiers(data.maxVerifiers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Accordion className="pb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Verifier</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitVerifierAddress(addNewVerifierAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Wallet Address Of New Verifier:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerVerifier("newVerifierAddress")}
                    />
                    {verifierAddressErrors.newVerifierAddress && (
                      <p className="text-danger fw-bold">
                        {verifierAddressErrors.newVerifierAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Add Verifiers
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Remove Verifier</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveVerifierAddress(
                  removeVerifierAddress
                )}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Verifier ID to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...registerRemoveverifier("verifierAddressToRemove")}
                    />
                    {removeVerifierErrors.verifierAddressToRemove && (
                      <p className="text-danger fw-bold">
                        {removeVerifierErrors.verifierAddressToRemove.message}
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

        <Accordion.Item eventKey="2">
          <Accordion.Header>Replace Verifier</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form onSubmit={handleSubmitOfReplaceVerifiers(replaceVerifierAddress)}>
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Verifier Address to Replace:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...VerifiersReplaceable("existingWalletAddress")}
                    />
                    {replaceableVerifiersErrors.existingWalletAddress && (
                      <p className="text-danger fw-bold">
                        {replaceableVerifiersErrors.existingWalletAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>New Verifiers Address:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...VerifiersReplaceable("newWalletAddress")}
                    />
                    {replaceableVerifiersErrors.newWalletAddress && (
                      <p className="text-danger fw-bold">
                        {replaceableVerifiersErrors.newWalletAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                  Replace Verifier
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Add Company</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitCompanyDetails(onSubmitOfCompanyDetails)}
              >
                <div className="form-group row">
                  <div className="col-lg-6">
                    
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
                        {companyDetailsErrors.name && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.name.message}
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
                        {companyDetailsErrors.mobileNumber && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.mobileNumber.message}
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
                        {companyDetailsErrors.email && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Location:</label>
                      </div>
                      <div className="col-lg-6 ">
                        <input
                          type="text"
                          className="form-control"
                          {...register("location")}
                        />
                        {companyDetailsErrors.location && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.location.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-lg-6">
                        <label>Licence Number:</label>
                      </div>
                      <div className="col-lg-6">
                        <input
                          type="number"
                          className="form-control"
                          {...register("licenceNumber")}
                        />
                        {companyDetailsErrors.licenceNumber && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.licenceNumber.message}
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
                        {companyDetailsErrors.walletAddress && (
                          <p className="text-danger fw-bold">
                            {companyDetailsErrors.walletAddress.message}
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

        <Accordion.Item eventKey="4">
          <Accordion.Header>Remove Company</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveCompanyAddress(removeCompanyAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Company ID to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      
                      {...registerRemoveCompany("companyAddressToRemove")}
                    />
                    {removeCompanyErrors.companyAddressToRemove && (
                      <p className="text-danger fw-bold">
                        {removeCompanyErrors.companyAddressToRemove.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                  Remove Company
                  </button>
                </div>
              </form>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Set Max Verifiers</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitOfMaximumVerifier(maxVerifierAddress)}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Doctor Address to Remove:</label>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      {...maximumVerifiers("maxVerifiers")}
                    />
                    {MaxverifierErrors.maxVerifiers && (
                      <p className="text-danger fw-bold">
                        {MaxverifierErrors.maxVerifiers.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 mb-3 text-center">
                  <button type="submit" className="w-50">
                    Set Limit
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
