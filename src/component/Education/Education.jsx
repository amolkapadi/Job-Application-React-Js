import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import educationImg from '../../assets/img/Education2.png'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  setData,
  setLoading,
  setError,
} from "../../store/slices/educatinalInformation";
import { Heading } from "../../utils/component/Heading";
import { Horizantalline } from "../../utils/component/Horizantalline";
import { NextButton } from "../../utils/component/NextButton";
import { PreButton } from "../../utils/component/PreButton";
import { setWidth } from "../../store/slices/stepper";
import { educationValidation } from "../../utils/validation/EducationValidation/educationValidation";
export default function Education() {
  const dispatch = useDispatch();
  const formStoreData = useSelector((state) => state.educationData.data);
  const loading = useSelector((state) => state.educationData.loading);
  const error = useSelector((state) => state.educationData.error);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    SSC: {
      Board: "",
      cgpa: "",
      PassingYear: "",
    },
    HSC: {
      Board: "",
      cgpa: "",
      PassingYear: "",
    },
    Graduation: {
      Board: "",
      cgpa: "",
      PassingYear: "",
    },
    PostGraduation: {
      Board: "",
      cgpa: "",
      PassingYear: "",
    },
  });
  const [validationErrors, setValidationErrors] = useState({});
  // const handleInput = (event, row, inputName) => { 
  //   if (event.target) {
  //     let formDataLocal = { ...formData };
  //     if (
  //       (inputName === "Board" ||
  //         inputName === "cgpa" ||
  //         inputName === "PassingYear") &&
  //       (row === "SSC" ||
  //         row === "HSC" ||
  //         row === "Graduation" ||
  //         row === "PostGraduation")
  //     ) {
  //       formDataLocal[row][inputName] = event.target.value;
  //     }
  //     setFormData(formDataLocal);
  //   }
  // };

  const handleInput = (event, row, inputName) => {
    if (event.target) {
      const { value } = event.target;
      const updatedData = {
        ...formData,
        [row]: {
          ...formData[row],
          [inputName]: value,
        },
      };

      setFormData(updatedData);

      // Validate individual field
      educationValidation
        .validateAt(`${row}.${inputName}`, updatedData)
        .then(() => {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [row]: { ...prevErrors[row], [inputName]: "" },
          }));
        })
        .catch((err) => {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [row]: { ...prevErrors[row], [inputName]: err.message },
          }));
        });
    }
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      await educationValidation.validate(formData, { abortEarly: false });
      setValidationErrors({});
      dispatch(setLoading(true));
      dispatch(setData(formData));
      dispatch(setError(""));

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
        navigate("/experiance");
        dispatch(setWidth("40%"));
      }, 2000);
    } catch (err) {
      const errors = {};
      if (err.inner) {
        err.inner.forEach((validationError) => {
          const path = validationError.path.split(".");
          const level = path[0];
          const field = path[1];
          if (!errors[level]) {
            errors[level] = {};
          }
          errors[level][field] = validationError.message;
        });
      }
      setValidationErrors(errors);
      dispatch(setLoading(false));
      dispatch(setError("Failed to submit form"));
    }
  };
  // const handleOnSubmit = async (event) => {
  //   event.preventDefault();
  //   dispatch(setLoading(true));
  //   dispatch(setData(formData));

  //   try {
  //     dispatch(setLoading(true));
  //     toast.success("Data Saved Successfully!", {
  //       position: "top-right",
  //       autoClose: 1800,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setTimeout(() => {
  //     dispatch(setLoading(false));
  //     navigate("/experiance");
  //     dispatch(setWidth("40%"));
  //     }, 2000)
  //   } catch (err) {
  //     dispatch(setLoading(false));
  //     dispatch(setError("Failed to submit form"));
  //   }
  // };

  useEffect(() => {
    if (formStoreData?.SSC?.Board) {
      setFormData(formStoreData);
    }
  }, [formStoreData]);
  const prevHandle = () => {
    navigate("/personalinfo");
    dispatch(setWidth("0%"));
  };
  return (
    <div className="container shadow-lg mt-5 p-3">
      <div className="row row-cols-1 row-cols-md-2 mt-3">
        <div className="col-12 ">
          <Heading title="Education Information" />
          <Horizantalline />
          <form onSubmit={handleOnSubmit} className="py-5">
            <div class="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">School/ institute Name</th>
                    <th scope="col">Board/University</th>
                    <th scope="col">CGPA</th>
                    <th scope="col">Passing year</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SSC</td>
                    <td>
                      <input
                        placeholder="Enter Board/University"
                        className="form-control education-Input"
                        value={formData.SSC.Board}
                        onInput={(event) => {
                          handleInput(event, "SSC", "Board");
                        }}
                      />
                       {validationErrors.SSC && validationErrors.SSC.Board && (
                  <div className="text-danger">{validationErrors.SSC.Board}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter CGPA"
                        className="form-control education-Input"
                        value={formData.SSC.cgpa}
                        onInput={(event) => {
                          handleInput(event, "SSC", "cgpa");
                        }}
                      />
                        {validationErrors.SSC && validationErrors.SSC.cgpa && (
                  <div className="text-danger">{validationErrors.SSC.cgpa}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter Passing year"
                        className="form-control education-Input"
                        value={formData.SSC.PassingYear}
                        onInput={(event) => {
                          handleInput(event, "SSC", "PassingYear");
                        }}
                      />
                       {validationErrors.SSC && validationErrors.SSC.PassingYear && (
                  <div className="text-danger">{validationErrors.SSC.PassingYear}</div>
                )}
                    </td>
                  </tr>
                  <tr>
                    <td>HSC</td>
                    <td>
                      <input
                        placeholder="Enter Board/University"
                        className="form-control education-Input"
                        value={formData.HSC.Board}
                        onInput={(event) => {
                          handleInput(event, "HSC", "Board");
                        }}
                      />
                      {validationErrors.HSC && validationErrors.HSC.Board && (
                  <div className="text-danger">{validationErrors.HSC.Board}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter CGPA"
                        className="form-control education-Input"
                        value={formData.HSC.cgpa}
                        onInput={(event) => {
                          handleInput(event, "HSC", "cgpa");
                        }}
                      />
                       {validationErrors.HSC && validationErrors.HSC.cgpa && (
                  <div className="text-danger">{validationErrors.HSC.cgpa}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter Passing year"
                        className="form-control education-Input"
                        value={formData.HSC.PassingYear}
                        onInput={(event) => {
                          handleInput(event, "HSC", "PassingYear");
                        }}
                      />
                      {validationErrors.HSC && validationErrors.HSC.PassingYear && (
                  <div className="text-danger">{validationErrors.HSC.PassingYear}</div>
                )}
                    </td>
                  </tr>
                  <tr>
                    <td>Graduation</td>
                    <td>
                      <input
                        placeholder="Enter Board/University"
                        className="form-control education-Input"
                        value={formData.Graduation.Board}
                        onInput={(event) => {
                          handleInput(event, "Graduation", "Board");
                        }}
                      />
                        {validationErrors.Graduation && validationErrors.Graduation.Board && (
                  <div className="text-danger">{validationErrors.Graduation.Board}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter CGPA"
                        className="form-control education-Input"
                        value={formData.Graduation.cgpa}
                        onInput={(event) => {
                          handleInput(event, "Graduation", "cgpa");
                        }}
                      />
                       {validationErrors.Graduation && validationErrors.Graduation.cgpa && (
                  <div className="text-danger">{validationErrors.Graduation.cgpa}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter Passing year"
                        className="form-control education-Input"
                        value={formData.Graduation.PassingYear}
                        onInput={(event) => {
                          handleInput(event, "Graduation", "PassingYear");
                        }}
                      />
                       {validationErrors.Graduation && validationErrors.Graduation.PassingYear && (
                  <div className="text-danger">{validationErrors.Graduation.PassingYear}</div>
                )}
                    </td>
                  </tr>
                  <tr>
                    <td>Post Graduation </td>
                    <td>
                      <input
                        placeholder="Enter Board/University"
                        className="form-control education-Input"
                        value={formData.PostGraduation.Board}
                        onInput={(event) => {
                          handleInput(event, "PostGraduation", "Board");
                        }}
                      />
                       {validationErrors.PostGraduation && validationErrors.PostGraduation.Board && (
                  <div className="text-danger">{validationErrors.PostGraduation.Board}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter CGPA"
                        className="form-control education-Input"
                        value={formData.PostGraduation.cgpa}
                        onInput={(event) => {
                          handleInput(event, "PostGraduation", "cgpa");
                        }}
                      />
                       {validationErrors.PostGraduation && validationErrors.PostGraduation.cgpa && (
                  <div className="text-danger">{validationErrors.PostGraduation.cgpa}</div>
                )}
                    </td>
                    <td>
                      <input
                        placeholder="Enter Passing year"
                        className="form-control education-Input"
                        value={formData.PostGraduation.PassingYear}
                        onInput={(event) => {
                          handleInput(event, "PostGraduation", "PassingYear");
                        }}
                      />
                       {validationErrors.PostGraduation && validationErrors.PostGraduation.PassingYear && (
                  <div className="text-danger">{validationErrors.PostGraduation.PassingYear}</div>
                )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
