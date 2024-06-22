import React from "react";
import "./Review.css";
import { Link, useNavigate } from "react-router-dom";
import { NextButton } from "../../utils/component/NextButton";
import { PreButton } from "../../utils/component/PreButton";
import { Heading } from "../../utils/component/Heading";
import { Horizantalline } from "../../utils/component/Horizantalline";
import { useDispatch, useSelector } from "react-redux";
import { setWidth } from "../../store/slices/stepper";
import succesfullImg from "../../assets/img/successfully.png";
import { setData as skillInfo } from "../../store/slices/skillAndQualifactionInformation";
import { setData as workExpInfo } from "../../store/slices/workExperianceInformation";
import { setData as educationInfo } from "../../store/slices/educatinalInformation";
import { setData as personalInfo } from "../../store/slices/personalInformation";
import { setData as additionalInfo } from "../../store/slices/additionalInformation";
export default function Review() {
  const personalReivewData = useSelector((state) => state.personalData?.data);
  const EducationReivewData = useSelector((state) => state.educationData?.data);
  const WorkExperianceReivewData = useSelector(
    (state) => state.workExperianceData?.data
  );
  const AdditionalReivewData = useSelector(
    (state) => state.additionalData?.data
  );
  const SkillAndQualitiesData = useSelector(
    (state) => state.skillAndQualitiesData?.data
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prevHandle = () => {
    navigate("/additionalinfo");
    dispatch(setWidth("80%"));
  };

  let initialName = "";
  if (personalReivewData.name) {
    initialName = personalReivewData.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  }
  const handleSubmit = () => {
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modal.show();
  };

  const closeModal = () => {
    dispatch(personalInfo({}));
    dispatch(educationInfo([]));
    dispatch(
      workExpInfo([
        {
          companyName: "",
          jobTitle: "",
          duration: "",
        },
      ])
    );
    dispatch(skillInfo([]));
    dispatch(additionalInfo([]));
    dispatch(setWidth("0%"));
    navigate("/");
  };

  return (
    <>
      <div className="container shadow-lg mt-5 p-3">
        <Heading title="Review" />
        <Horizantalline />
        {personalReivewData.name ? (
          <div className="row row-cols-1 g-4 p-3">
            <div className="col">
              <div className="profile">
                <h4> {personalReivewData.name} </h4>
                <div className="profileTitle">{initialName}</div>
              </div>
              <div className="contactInfo">
                <i class="bi bi-envelope-check-fill"> </i>
                <p> {personalReivewData.email} </p>
              </div>
              <div className="contactInfo">
                <i class="bi bi-phone-fill"></i>
                <p> {personalReivewData.mobileNo} </p>
              </div>
              <div className="contactInfo">
                <i class="bi bi-geo-alt-fill"></i>
                <p> {personalReivewData.address} </p>
              </div>
            </div>
            <div className="mb-3">
              <h4>Education</h4>
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
                    <td> {EducationReivewData.SSC?.Board} </td>
                    <td> {EducationReivewData.SSC?.PassingYear} </td>
                    <td> {EducationReivewData.SSC?.cgpa} </td>
                  </tr>
                  <tr>
                    <td>HSC</td>
                    <td> {EducationReivewData.HSC?.Board} </td>
                    <td> {EducationReivewData.HSC?.PassingYear} </td>
                    <td> {EducationReivewData.HSC?.cgpa} </td>
                  </tr>
                  <tr>
                    <td>Graduation</td>
                    <td> {EducationReivewData.Graduation?.Board} </td>
                    <td> {EducationReivewData.Graduation?.PassingYear} </td>
                    <td> {EducationReivewData.Graduation?.cgpa} </td>
                  </tr>
                  <tr>
                    <td>PostGraduation</td>
                    <td> {EducationReivewData.PostGraduation?.Board} </td>
                    <td> {EducationReivewData.PostGraduation?.PassingYear} </td>
                    <td> {EducationReivewData.PostGraduation?.cgpa} </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {WorkExperianceReivewData[0].companyName && (
              <div className="mb-3">
                <h4>Work Experiance</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Company Name</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WorkExperianceReivewData &&
                      WorkExperianceReivewData?.map((value, index) => (
                        <tr key={index}>
                          <td> {value.companyName} </td>
                          <td> {value.jobTitle} </td>
                          <td> {value.duration} </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mb-3">
              <h4>Skills and Qualifications</h4>
              <ol>
                <ol>
                  {" "}
                  {SkillAndQualitiesData[0].map((value, index) => (
                    <li key={index}> {value}</li>
                  ))}{" "}
                </ol>
              </ol>
              {SkillAndQualitiesData[1][0]?.certificatename && (
                <>
                  <h4>Certifications</h4>
                  <ol>
                    {SkillAndQualitiesData[1]?.map((value, index) => (
                      <li key={index}>{value.certificatename} </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
            <div className="mb-3">
              <h4>Additional Information</h4>
              <p>Cover Letter : {AdditionalReivewData[0][0].name} </p>
              <p>Resume : {AdditionalReivewData[1][0].name} </p>
            </div>
            <div className="py-3">
              <PreButton title="Previous" onClick={prevHandle} />
              <NextButton title="Submit" type="submit" onClick={handleSubmit} />
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <h3>Ooops....! Data not found</h3>
            <h4>Please fill the form First..!</h4>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/personalinfo")}
            >
              Go to form
            </Link>
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body text-center">
              <img
                src={succesfullImg}
                className="succesfullImg"
                alt="succesfullImg"
              />
              <h5 className="modal-title" id="exampleModalLabel">
                Application Send Successfully
              </h5>
              <p className="mt-5">
                Thank you <b>{personalReivewData.name}</b>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
