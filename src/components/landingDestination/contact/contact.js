import React from "react";
import "./contact.css";
import instagram from "../../../assets/destinationPage/contact/instagram.png";
import facebook from "../../../assets/destinationPage/contact/facebook.png";
import twitter from "../../../assets/destinationPage/contact/twitter.png";
import github from "../../../assets/destinationPage/contact/github.png";

export default function Contact() {
  return (
    <>
      
      <div className="container-fluid contactBg">
        <div className="container">
          <div className="row text-center">
            <h1 className="contactH1">Contact Us</h1>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="row text-center mt-5">
                <h3 className="mt-3">Contact Info</h3>
                <p className="mt-3">10 Park Road #27-18</p>
                <p>International Plaza, Dubai UAE</p>
                <p className="text-danger">documentverification@gmail.com</p>
                <h4 className="mt-3 fw-bold">Social</h4>
                <div className="row text-center ms-2 d-flex justify-content-center">
                  <img src={facebook} className="contact-img" alt="facebook" />
                  <img
                    src={instagram}
                    className="contact-img"
                    alt="instagram"
                  />
                  <img src={twitter} className="contact-img" alt="twitter" />
                  <img src={github} className="contact-img" alt="github" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row transparent-form mt-5">
                <div className="col-lg-6 mt-3">
                  <input
                    type="text"
                    className="contactform"
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-lg-6 mt-3">
                  <input
                    type="email"
                    className="contactform"
                    placeholder="Email"
                  />
                </div>
                <div className="col-lg-6 mt-3">
                  <input
                    type="number"
                    className="contactform"
                    placeholder="Contact Number*"
                  />
                </div>
                <div className="col-lg-6 mt-3">
                  <input
                    type="text"
                    className="contactform"
                    placeholder="Title"
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <input
                    type="text"
                    className="contactform"
                    placeholder="Institution/Organisation Name"
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <textarea
                    className="contactform"
                    placeholder="Your Message"
                  />
                </div>
                <div className="col-lg-12">
                  <button className="contactBtn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
