import * as Yup from 'yup';

const educationValidation = Yup.object({
  SSC: Yup.object({
    Board: Yup.string().required('Board is required'),
    cgpa: Yup.number().typeError('CGPA must be a number').required('CGPA is required'),
    PassingYear: Yup.number().typeError('Passing Year must be a number').required('Passing Year is required'),
  }),
  HSC: Yup.object({
    Board: Yup.string().required('Board is required'),
    cgpa: Yup.number().typeError('CGPA must be a number').required('CGPA is required'),
    PassingYear: Yup.number().typeError('Passing Year must be a number').required('Passing Year is required'),
  }),
  Graduation: Yup.object({
    Board: Yup.string().required('Board is required'),
    cgpa: Yup.number().typeError('CGPA must be a number').required('CGPA is required'),
    PassingYear: Yup.number().typeError('Passing Year must be a number').required('Passing Year is required'),
  }),
  PostGraduation: Yup.object({
    Board: Yup.string().required('Board is required'),
    cgpa: Yup.number().typeError('CGPA must be a number').required('CGPA is required'),
    PassingYear: Yup.number().typeError('Passing Year must be a number').required('Passing Year is required'),
  }),
});

export {educationValidation}