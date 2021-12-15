/* eslint-disable prettier/prettier */
// import { Separator } from "@fluentui/react/lib/Separator";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { NavContextWrapper } from "../context/NavContext";
import { DefaultPanel } from "./Containers/DefaultPanel";
import { PageManager } from "./PageManager";

import { INavDetails } from "./Footer";
import { IStyle } from "@fluentui/merge-styles";

export interface IContainerProps {
  children: JSX.Element;
  isOpen: boolean;
  onDismiss?: () => void;
  headerText?: string;
  closeButtonAriaLabel?: string;
  Footer?: JSX.Element;
}

export enum ContainerType {
  // eslint-disable-next-line no-unused-vars
  PANEL,
}

export interface IStepPageMap {
  label: string;
  element: JSX.Element;
  isActive: boolean;
  checked: boolean;
}

export interface IStepper {
  steps: IStepPageMap[];
  navStateCallback: (data: INavDetails) => void;
  isDesktop: boolean;
}

export interface IWizard {
  containerType: ContainerType;
  Stepper: (props: IStepper) => JSX.Element;
  steps: IStepPageMap[];
  isOpen: boolean;
  onDismiss?: () => void;
  headerText?: string;
  closeButtonAriaLabel?: string;
  Footer?: JSX.Element;
  navStateCallback: (data: INavDetails) => void;
  isDesktop: boolean;
  Children?: JSX.Element;
  height?: string;
  step: number;
  setStep: any;
}

const parentStackStyle: IStyle = {
  minHeight: "calc(100vh - 200px)",
  width: "100%",
  bottom: 0,
  top: "50px",
};

export const WizardMainContent = (props: IWizard) => {
  const { Stepper } = props;
  const onRenderFooter = (props: IWizard) => {
    return props.Footer ?? null;
  };

  parentStackStyle.minHeight = props.height ?? parentStackStyle.minHeight;

  return (
    <Stack
      horizontal={props.isDesktop}
      grow
      styles={{
        root: { ...parentStackStyle },
      }}
    >
      <Stack.Item
        align={props.isDesktop ? "auto" : "center"}
        style={{ height: props.isDesktop ? "100%" : "auto", minWidth: "260px" }}
      >
        <Stepper
          steps={props.steps}
          isDesktop={props.isDesktop}
          navStateCallback={props.navStateCallback}
        />
      </Stack.Item>

      <Stack.Item
        style={{
          borderLeft: props.isDesktop ? "1px solid rgb(237, 235, 233)" : 0,
          borderTop: props.isDesktop ? 0 : "1px solid rgb(237, 235, 233)",
          width: "100%",
        }}
      >
        <Stack
          styles={{
            root: { minHeight: props.height, justifyContent: "space-between" },
          }}
        >
          <Stack.Item style={{ padding: "20px" }}>
            <PageManager steps={props.steps} />
          </Stack.Item>
          <Stack.Item
            style={{
              height: "60px",
              padding: "20px",
              borderTop: "1px solid rgb(237, 235, 233)",
              width: "inherit",
            }}
          >
            {onRenderFooter(props)}
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export const Wizard = (props: IWizard) => {
  console.log(`Wizard desktop: ${props.isDesktop}`);

  if (props.containerType === ContainerType.PANEL) {
    return (
      <NavContextWrapper
        initialStepList={props.steps}
        step={props.step}
        setStep={props.setStep}
      >
        <DefaultPanel
          isOpen={props.isOpen}
          Footer={props.Footer}
          headerText={props.headerText}
          onDismiss={props.onDismiss}
          closeButtonAriaLabel={props.closeButtonAriaLabel}
        >
          <WizardMainContent {...props} />
        </DefaultPanel>
      </NavContextWrapper>
    );
  }
  return (
    <NavContextWrapper
      initialStepList={props.steps}
      step={props.step}
      setStep={props.setStep}
    >
      <div>
        <WizardMainContent {...props} />
      </div>
    </NavContextWrapper>
  );
};
