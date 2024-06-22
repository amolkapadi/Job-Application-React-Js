import { createBrowserRouter, Navigate } from 'react-router-dom';
import JobApplication from '../component/JobApplication/JobApplication';
import PersonalInfo from '../component/PersonalInformation/PersonalInfo';
import Education from '../component/Education/Education';
import WorkExperiance from '../component/WorkExperience/WorkExperiance';
import Skills from '../component/Skills/Skills';
import AdditionalInfo from '../component/AdditionalInfo/AdditionalInfo';
import Review from '../component/Review/Review';
import { NotFound } from '../component/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/personalinfo" />,
  },
  {
    path: '/',
    element: <JobApplication />,
    children: [
      {
        path: 'personalinfo',
        element: <PersonalInfo />,
      },
      {
        path: 'education',
        element: <Education />,
      },
      {
        path: 'experiance',
        element: <WorkExperiance />,
      },
      {
        path: 'skills',
        element: <Skills />,
      },
      {
        path: 'additionalinfo',
        element: <AdditionalInfo />,
      },
      {
        path: 'review',
        element: <Review />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
