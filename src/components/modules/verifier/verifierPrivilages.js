import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Blockchain from "../../../blockchain";

//1.Adding New company Address Validation
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

//2.Removing New Company Address Validation
const RemoveCompanySchema = yup.object().shape({
  companyAddressToRemove: yup
    .string()
    .required("company Address to Remove is required."),
});

export default function VerifierPrivilages() {

  const blockchain = Blockchain();
  //1.Add Company Details
  const {
    register,
    handleSubmit: handleSubmitCompanyDetails,
    formState: { errors: companyDetailsErrors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  //2.Remove Company Details
  const {
    register: registerRemoveCompany,
    handleSubmit: handleSubmitRemoveCompanyAddress,
    formState: { errors: removeCompanyErrors },
  } = useForm({
    resolver: yupResolver(RemoveCompanySchema),
  });

  //1.Function Call On Add Company Details
  const onSubmitOfCompanyDetails = async (data) => {
    try {
      console.log(data);
      const doctorDetails = await blockchain.addCompanies(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //2.Function Call On Remove Company Address
  const removeCompanyAddress = async (data) => {
    try {
      console.log(data);
      const removedCompany = await blockchain.removeCompanies(
        data.companyAddressToRemove
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Accordion className="pb-5">
        <Accordion.Item eventKey="0">
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

        <Accordion.Item eventKey="1">
          <Accordion.Header>Remove Company</Accordion.Header>
          <Accordion.Body>
            <div className="container">
              <form
                onSubmit={handleSubmitRemoveCompanyAddress(
                  removeCompanyAddress
                )}
              >
                <div className="form-group row mt-2">
                  <div className="col-lg-6 text-center">
                    <label>Company Address to Remove:</label>
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
      </Accordion>
    </>
  );
}
