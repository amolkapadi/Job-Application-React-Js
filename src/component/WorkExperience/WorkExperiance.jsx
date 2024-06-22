import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkExperiance.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  setData,
  setLoading,
  setError,
} from "../../store/slices/workExperianceInformation";
import { Heading } from "../../utils/component/Heading";
import { Horizantalline } from "../../utils/component/Horizantalline";
import { PreButton } from "../../utils/component/PreButton";
import { NextButton } from "../../utils/component/NextButton";
import { setWidth } from "../../store/slices/stepper";

export default function WorkExperiance() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.workExperianceData.data);
  const loading = useSelector((state) => state.workExperianceData.loading);
  const error = useSelector((state) => state.workExperianceData.error);
  const navigate = useNavigate();
  const [workExperianceData, setWorkExperianceData] = useState([
    { companyName: "", jobTitle: "", duration: "" },
  ]);

  const handleAddRow = () => {
    let formDataLocal = [
      ...workExperianceData,
      { companyName: "", jobTitle: "", duration: "" },
    ];
    setWorkExperianceData(formDataLocal);
  };

  const handleDeleteRow = () => {
    let formDataLocal = [...workExperianceData];
    formDataLocal.pop();
    setWorkExperianceData(formDataLocal);
  };

  const handleInput = (event, index, inputName) => {
    if (event.target) {
      setWorkExperianceData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index],
          [inputName]: event.target.value,
        };
        return updatedData;
      });
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (workExperianceData[0]) {
      dispatch(setLoading(true));
      dispatch(setError(""));
      if (
        workExperianceData[0].companyName &&
        workExperianceData[0].jobTitle &&
        workExperianceData[0].duration
      ) {
        dispatch(setData(workExperianceData));
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
          navigate("/skills");
          dispatch(setWidth("60%"));
        }, 2000);
      } else {
        dispatch(setLoading(false));
        navigate("/skills");
        dispatch(setWidth("60%"));
      }
    } else {
      dispatch(setLoading(false));
      dispatch(setError("Failed to submit form"));
    }
  };
  useEffect(() => {
    if (formData) {
      setWorkExperianceData(formData);
    }
  }, [formData]);

  const prevHandle = () => {
    navigate("/education");
    dispatch(setWidth("20%"));
  };
  return (
    <div className="container shadow-lg mt-5 p-3">
      <div className="row row-cols-1 row-cols-md-1 ">
        <div className="hedingDiv">
          <div>
            <Heading title="Work Experience" />
            <span className="ms-2">{`(Optional)`}</span>
          </div>
          <button className="btn btn-success" onClick={handleAddRow}>
            Add
          </button>
        </div>
        <Horizantalline />
        <div className="col mt-3">
          <form onSubmit={handleOnSubmit}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Company Name</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workExperianceData.map((experience, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        onChange={(event) => {
                          handleInput(event, index, "companyName");
                        }}
                        value={experience.companyName}
                        placeholder="Company Name"
                        className="form-control education-Input"
                        name="companyName"
                      />
                    </td>
                    <td>
                      <input
                        className="form-control education-Input"
                        onChange={(event) => {
                          handleInput(event, index, "jobTitle");
                        }}
                        value={experience.jobTitle}
                        placeholder="Job Title"
                        name="jobTitle"
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Duration"
                        className="form-control education-Input"
                        onChange={(event) => {
                          handleInput(event, index, "duration");
                        }}
                        value={experience.duration}
                        name="duration"
                      />
                    </td>
                    <td>
                      {index !== 0 && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteRow(index)}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-3">
              <PreButton title="Previous" onClick={prevHandle} />
              <NextButton title="Next" type="submit" />
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
          </form>
        </div>
      </div>
    </div>
  );
}
