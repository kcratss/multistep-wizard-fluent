/* eslint-disable prettier/prettier */
import * as React from "react";
import { IStepPageMap } from "../components/Wizard";

export interface INavContext {
  stepDetails: {
    currentPageIndex: number;
  };
  setStepDetails: any;
  stepList: IStepPageMap[];
  setStepList: any;
}

export const NavContext = React.createContext<INavContext>({
  stepDetails: {
    currentPageIndex: 0,
  },
  setStepDetails: () => {},
  stepList: [],
  setStepList: () => {},
});

export const NavContextWrapper = (props: {
  initialStepList: IStepPageMap[];
  children: JSX.Element;
  step:any;
  setStep:any;
}) => {
  // const [stepDetails, setStepDetails] = React.useState({
  //   currentPageIndex: props.step,
    
  // });
  const [stepList, setStepList] = React.useState(props.initialStepList);
  
  return (
    <NavContext.Provider
      value={{ stepDetails:props.step, setStepDetails:props.setStep, stepList, setStepList }}
    >
      {props.children}
    </NavContext.Provider>
  );
};
