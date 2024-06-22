import React from "react";
import { useSelector } from "react-redux";

export const Stepper = () => {

  const width =  useSelector((state) => state.stepper.stepperWidth)
  console.log("steeper copm" , width)
  return (
    <div className="fixed-top">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{width:width}}
        ></div>
      </div>
    </div>
  );
};
