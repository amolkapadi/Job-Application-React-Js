import { configureStore } from '@reduxjs/toolkit';
import personalDataReducer from "./slices/personalInformation"
import educationDataReducer from "./slices/educatinalInformation"
import additionalDataReducer from "./slices/additionalInformation"
import skillAndQualitiesDataReducer from "./slices/skillAndQualifactionInformation"
import workExperianceDataReducer from "./slices/workExperianceInformation"
import stepperReducer from './slices/stepper';
export const store = configureStore({
    reducer: {
        personalData:personalDataReducer,
        educationData:educationDataReducer,
        additionalData:additionalDataReducer,
        skillAndQualitiesData:skillAndQualitiesDataReducer,
        workExperianceData:workExperianceDataReducer,
        stepper:stepperReducer
    },
  })