import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdditionalInfo.css';
import { useDropzone } from 'react-dropzone';
import { NextButton } from '../../utils/component/NextButton';
import { PreButton } from '../../utils/component/PreButton';
import { Heading } from '../../utils/component/Heading';
import { Horizantalline } from '../../utils/component/Horizantalline';
import { useDispatch, useSelector } from "react-redux";
import { setData } from '../../store/slices/additionalInformation';
import { setWidth } from '../../store/slices/stepper';
import { toast } from "react-toastify";

export default function AdditionalInfo() {
  const dispatch = useDispatch();
  const formStoreData = useSelector((state) => state.additionalData.data);
  // const loading = useSelector((state) => state.additionalData.loading);
  // const error = useSelector((state) => state.additionalData.error);

  const navigate = useNavigate();

  const [coverLetterFiles, setCoverLetterFiles] = useState([]);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // const onDropCoverLetter = useCallback((acceptedFiles) => {
  //   setCoverLetterFiles(acceptedFiles);
  // }, []);

  // const onDropResume = useCallback((acceptedFiles) => {
  //   setResumeFiles(acceptedFiles);
  // }, []);

  // const { getRootProps: getCoverLetterRootProps, getInputProps: getCoverLetterInputProps } = useDropzone({
  //   onDrop: onDropCoverLetter,
  //   accept: 'application/pdf'
  // });

  // const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps } = useDropzone({
  //   onDrop: onDropResume,
  //   accept: 'application/pdf'
  // });
  
  const onDrop = (acceptedFiles, setFiles) => {
    setErrors({});
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type === "application/pdf";
      const isValidSize = file.size <= 250000; // 250 KB
      if (!isValidType) {
        setErrors(prevErrors => ({ ...prevErrors, type: "Only PDF files are allowed" }));
      }
      if (!isValidSize) {
        setErrors(prevErrors => ({ ...prevErrors, size: "File size must be less than 250KB" }));
      }
      return isValidType && isValidSize;
    });
    setFiles(validFiles);
  };
  const {
    getRootProps: getCoverLetterRootProps,
    getInputProps: getCoverLetterInputProps
  } = useDropzone({
    onDrop: (files) => onDrop(files, setCoverLetterFiles),
    multiple: false
  });

  const {
    getRootProps: getResumeRootProps,
    getInputProps: getResumeInputProps
  } = useDropzone({
    onDrop: (files) => onDrop(files, setResumeFiles),
    multiple: false
  });



//   const handleSubmit =()=>{
//   const allFile = [coverLetterFiles, resumeFiles]
//   console.log(allFile, "allFiles")
  
//   dispatch(setData(allFile))
//   toast.success("Data Saved Successfully!", {
//     position: "top-right",
//     autoClose: 1800,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
//   navigate("/review")
//   dispatch(setWidth("100%"))
  
// };
   
  
const handleSubmit = (event) => {
  event.preventDefault();
  if (coverLetterFiles.length === 0) {
    setErrors((prevErrors) => ({ ...prevErrors, coverLetter: "Cover letter is required" }));
    return;
  }
  if (resumeFiles.length === 0) {
    setErrors((prevErrors) => ({ ...prevErrors, resume: "Resume is required" }));
    return;
  }
  const allFiles = [coverLetterFiles, resumeFiles];
  dispatch(setData(allFiles));
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
  setTimeout(()=>{

    navigate("/review");
    dispatch(setWidth("100%"));
  }, 2000)
};


  useEffect(()=>{
    if(formStoreData[0] && formStoreData[0].length > 0){
      const getCoverLetter = formStoreData[0]
      // console.log(getCoverLetter, "getCoverLetter")
      setCoverLetterFiles(getCoverLetter)
    }
    if(formStoreData[1]){
      const getResume = formStoreData[1]
      // console.log(getResume, "getResume")
      setResumeFiles(getResume)
    }
  },[formStoreData])

  const prevHandle = () => {
    navigate("/skills")
    dispatch(setWidth("60%"))
  }
  return (
    <div className="container shadow-lg mt-5 p-3">
    <Heading title="Additional Information"/>
    <Horizantalline />
    <form onSubmit={handleSubmit}>
      <div className="row row-cols-1 g-4 p-3">
        <h3>Upload Cover Letter</h3>
        <div {...getCoverLetterRootProps()} className="dropzone">
          <input {...getCoverLetterInputProps()} type='file' />
          <p className='selectTxt'>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="selected-files">
          {coverLetterFiles.map((file, index) => (
            <div key={index}>
              <span>Selected Files : {file.name} </span>
              <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">View PDF</a>
            </div>
          ))}
        </div>
        {errors.coverLetter && <div className="text-danger">{errors.coverLetter}</div>}
        {errors.type && <div className="text-danger">{errors.type}</div>}
        {errors.size && <div className="text-danger">{errors.size}</div>}
        <h3>Upload Resume</h3>
        <div {...getResumeRootProps()} className="dropzone">
          <input {...getResumeInputProps()} type='file' />
          <p className='selectTxt'>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="selected-files">
          {resumeFiles.map((file, index) => (
            <div key={index}>
              <span> Selected Files : {file.name} </span>
              <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">View PDF</a>
            </div>
          ))}
        </div>
        {errors.resume && <div className="text-danger">{errors.resume}</div>}
        {errors.type && <div className="text-danger">{errors.type}</div>}
        {errors.size && <div className="text-danger">{errors.size}</div>}
      </div>
      
      <div className="pb-5">
      <PreButton  title="Previous"  onClick={prevHandle}/>
      <NextButton  title="Next" type="submit" />
        
        </div>
    </form>
    {/* {error && <p>{error}</p>}
              {loading && (
        <div
          className="spinner-border text-primary align-items-center bg-white justify-content-center"
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      )} */}
    </div>
  );
}
