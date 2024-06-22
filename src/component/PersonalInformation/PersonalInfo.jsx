import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalinfoStyle.css";
import persnalImg from "../../assets/img/PersonalData1.png";

import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setLoading,
} from "../../store/slices/personalInformation";
import { setWidth } from "../../store/slices/stepper";
import { toast } from "react-toastify";
import { personalInfoValidation } from "../../utils/validation/personlInfoValidation/personalValidation";
import { NextButton } from "../../utils/component/NextButton";
import { Heading } from "../../utils/component/Heading";
import { Horizantalline } from "../../utils/component/Horizantalline";

export default function PersonalInfo() { 
  const dispatch = useDispatch(); 
  const [personalIfo, setPersnalInfo] = useState({ 
    name: "", 
    email: "", 
    mobileNo: "", 
    address: "", 
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    personalInfoValidation
      .validate(personalIfo, { abortEarly: false })
      .then(() => {
        setValidationErrors({});

        dispatch(setData(personalIfo));
        dispatch(setLoading(true));
        toast.success("Data Saved Successfully!", {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          dispatch(setLoading(false));
          navigate("/education");
        dispatch(setWidth('20%'))

        }, 2000);
      })
      .catch((err) => {
        const errors = {};
        if (err.inner) {
          err.inner.forEach((validationError) => {
            errors[validationError.path] = validationError.message;
          });
        }
        setValidationErrors(errors);
      });
  };
  const formData = useSelector((state) => state.personalData.data);
  useEffect(() => {
    if (formData.name) {
      setPersnalInfo(formData);
    }
  }, [formData]);
  const loading = useSelector((state) => state.personalData.loading);
  const error = useSelector((state) => state.personalData.error);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPersnalInfo({ ...personalIfo, [event.target.name]: event.target.value });
    const { name, value } = event.target;
    const updatedInfo = { ...personalIfo, [name]: value };
    personalInfoValidation
    .validateAt(name, updatedInfo)
    .then(() => {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    })
    .catch((err) => {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
    });
  };
  return (
    <div className="container shadow-lg mt-5 p-3">
      
      <form onSubmit={handleSubmit}>
        <Heading title="Persoanl Information" />
        <Horizantalline />
        <div className="row row-cols-1 row-cols-md-2 mt-3">
          <div className="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Name"
                name="name"
                value={personalIfo.name}
                onChange={handleChange}
              />
              {validationErrors.name && (
                <div className="text-danger">{validationErrors.name}</div>
              )}
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                value={personalIfo.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <div className="text-danger">{validationErrors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Phone
              </label>
              <input
                type="phone-number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Phone Number"
                name="mobileNo"
                value={personalIfo.mobileNo}
                onChange={handleChange}
              />
              {validationErrors.mobileNo && (
                <div className="text-danger">{validationErrors.mobileNo}</div>
              )}
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Address"
                name="address"
                value={personalIfo.address}
                onChange={handleChange}
              />
              {validationErrors.address && (
                <div className="text-danger">{validationErrors.address}</div>
              )}
            </div>
            <div className="py-3">
             
              <NextButton type="submit" title="Next" />
            </div>
            {error && <p>{error}</p>}
              {loading && (
        <div
          className="spinner-border text-primary align-items-center bg-white justify-content-center"
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      )}
          </div>
          <div className="col">
            <img src={persnalImg} className="persnalImg" alt="persnalImg" />
          </div>
        </div>
      </form>
    </div>
  );
}
