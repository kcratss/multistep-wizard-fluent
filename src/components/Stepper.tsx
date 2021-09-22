import * as React from "react";
import { IStepper } from "./Wizard";
 import { StepperNav } from "vertical-stepper-nav";
import { NavContext } from "../context/NavContext";
import { Stack } from "@fluentui/react/lib/Stack";
import { getContainerStyleBasedOnResolution } from "../utilities/helpers";
import { INavDetails } from "./Footer";

export const Stepper = (props: IStepper) => {
  const { setStepDetails, stepDetails } = React.useContext(NavContext);

  const stepperMapProps = props.steps.map((element, index) => {
    return {
      stepContent: () => <div>{element.label}</div>,
      onClickHandler: () => {
        if(props.steps[index].isActive) {
          setStepDetails({ currentPageIndex: index });
          const data: INavDetails = {
            currentPageIndex: index
          }
          props.navStateCallback(data);
        }
      },
      stepStateColor: props.steps[index].isActive ? "white" : "#D3D3D3",
    };
  });
  
  stepperMapProps[stepDetails.currentPageIndex] = {
    stepContent: () => (
      <div style={{ fontSize: 14, fontWeight: "bold" }}>
        {props.steps[stepDetails.currentPageIndex].label}
      </div>
    ),
    onClickHandler: () => {
      if(props.steps[stepDetails.currentPageIndex].isActive) {
        setStepDetails({ currentPageIndex: stepDetails.currentPageIndex });
      const data: INavDetails = {
        currentPageIndex: stepDetails.currentPageIndex
      }
      props.navStateCallback(data);
      }
    },
    stepStateColor: "#0078D4",
  };
  return (
    <Stack
      styles={{
        root: {
          minWidth: getContainerStyleBasedOnResolution().navWidth,
          maxWidth: getContainerStyleBasedOnResolution().navWidth,
          padding:'20px'
        },
      }} 
    >
      <StepperNav steps={stepperMapProps} isDesktop={props.isDesktop} />
    </Stack>
  );
};

