import React, { useState, useEffect } from "react";
import "./SkillStyle.css";
import crossImg from "../../assets/img/cross.png";
import { useNavigate } from "react-router-dom";
import { Horizantalline } from "../../utils/component/Horizantalline";
import { PreButton } from "../../utils/component/PreButton";
import { NextButton } from "../../utils/component/NextButton";
import { Heading } from "../../utils/component/Heading";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setError,
  setLoading,
} from "../../store/slices/skillAndQualifactionInformation";
import { setWidth } from "../../store/slices/stepper";
import { toast } from "react-toastify";

export default function Skills() {
  const dispatch = useDispatch();
  const formStoreData = useSelector(
    (state) => state.skillAndQualitiesData.data
  );
  const loading = useSelector((state) => state.skillAndQualitiesData.loading);
  const error = useSelector((state) => state.skillAndQualitiesData.error);
  const navigate = useNavigate();

  const [skill, setSkill] = useState("");
  const [allSkill, setAllSkill] = useState([]);
  const [showError, setShowError] = useState(false);

  const [certification, setCertification] = useState({
    certificatename: "",
    description: "",
  });
  const [certificationList, setCertificationList] = useState([]);

  const addSkill = async () => {
    if (skill) setAllSkill([...allSkill, skill]);
    setSkill("");
    dispatch(setError(""));
    if (allSkill.length + 1 > 4) setShowError(false);
  };
  const removeSkill = (index) => {
    const updateSkills = allSkill.filter((_, ind) => ind !== index);
    setAllSkill([...updateSkills]);
  };
  const handleCertification = (event) => {
    setCertification({
      ...certification,
      [event.target.name]: event.target.value,
    });
  };

  const addCertificate = () => {
    setCertificationList([...certificationList, certification]);
    console.log(certification, "certification");
    setCertification({
      certificatename: "",
      description: "",
    });
  };

  const handleSubmit = () => {
    if (allSkill.length > 4) {
      setShowError(false);
      const skillAndQualification = [allSkill, certificationList];
      dispatch(setData(skillAndQualification));
      dispatch(setLoading(true));
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
        navigate("/additionalinfo");
        dispatch(setWidth("80%"));
      }, 2000);
    } else {
      dispatch(setError("Failed to submit form"));
      setShowError(true);
    }
  };
  useEffect(() => {
    console.log(formStoreData, "cccccc");
    if (formStoreData[0] && formStoreData[0].length > 0) {
      const getSkill = formStoreData[0];
      setAllSkill(getSkill);
    }
    if (formStoreData[1]) {
      const getAllCertificates = formStoreData[1];
      setCertificationList(getAllCertificates);
    }
  }, [formStoreData]);

  const prevHandle = () => {
    navigate("/experiance");
    dispatch(setWidth("40%"));
  };
  return (
    <div className="container shadow-lg mt-5 p-3">
      <Heading title="Skills and Qualifications" />
      <Horizantalline />
      <div className="row row-cols-1  g-4  p-3">
        <div className="d-flex justify-content-between w-100 gap-3 mt-5">
          <input
            className="form-control"
            name="companyName"
            onChange={(event) => setSkill(event.target.value)}
            value={skill}
          />
          <button className="btn btn-primary" onClick={addSkill}>
            Add Skill
          </button>
        </div>
        {showError && (
          <div className="text-danger">Please add minimum 5 skills</div>
        )}
        <p>Key skills</p>
        <div className="mainContainer">
          {allSkill.map((skillResult, index) => (
            <div key={index} className="skillView">
              <div>{skillResult}</div>
              <div onClick={() => removeSkill(index)}>
                <img src={crossImg} alt="crossImg" className="crossImg" />
              </div>
            </div>
          ))}
        </div>{" "}
        <div>
          <Heading title="Certification" />
          <span className="ms-1">{`(Optional)`}</span>
          <Horizantalline />
          <div className="row row-cols-1 row-cols-md-2 mt-3">
            <div className="col">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Certification Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="certificatename"
                  value={certification.certificatename}
                  onChange={handleCertification}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Description
                </label>
                <div class="form-floating">
                  <textarea
                    name="description"
                    class="form-control textArea"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={certification.description}
                    onChange={handleCertification}
                  ></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
              </div>
              <button className="btn btn-primary" onClick={addCertificate}>
                Add
              </button>
            </div>
            <div className="col certification">
              <h4 className="sticky-top bg-white">Certification List</h4>
              {certificationList.map((item, index) => (
                <div key={index} className="cardcertification">
                  <p className="certiText fw-bold">{item.certificatename}</p>
                  <p className="certiText">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-3">
          <PreButton title="Previous" onClick={prevHandle} />
          <NextButton title="Next" type="submit" onClick={handleSubmit} />
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
    </div>
  );
}
