import * as React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Stack } from "@fluentui/react/lib/Stack";
import { NavContext } from "../context/NavContext";
import { getContainerStyleBasedOnResolution } from "../utilities/helpers";

export type IFooterProps = {
  shouldDisablePrev?: () => boolean;
  shouldDisableNext?: () => boolean;
  submitText?: string;
  onSubmit?: () => void;
  navStateCallback: (data: INavDetails) => void;
};

export type INavDetails = {
  currentPageIndex: number;
}

export const Footer = (props: IFooterProps) => {
  const { stepDetails, setStepDetails, stepList } = React.useContext(
    NavContext
  );
  
  return (
    <footer
      style={{ marginLeft: getContainerStyleBasedOnResolution().navWidth }}
    >
      <Stack horizontal tokens={{ childrenGap: 12 }}>

        <Stack.Item>
          {stepDetails.currentPageIndex !== 0 && (
            <DefaultButton
              onClick={() => {
                setStepDetails({
                  currentPageIndex: stepDetails.currentPageIndex - 1,
                });
                const data: INavDetails = {
                  currentPageIndex: stepDetails.currentPageIndex - 1
                }
                props.navStateCallback(data);
              }}
              disabled={
                props.shouldDisablePrev ? props.shouldDisablePrev() : false
              }
            >
              Back
            </DefaultButton>
          )}
        </Stack.Item>

        <Stack.Item>
          {stepDetails.currentPageIndex !== stepList.length - 1 && (
            <PrimaryButton
              onClick={() => {
                setStepDetails({
                  currentPageIndex: stepDetails.currentPageIndex + 1,
                });
                const data: INavDetails = {
                  currentPageIndex: stepDetails.currentPageIndex + 1
                }
                props.navStateCallback(data);
              }}
              disabled={
                props.shouldDisableNext ? props.shouldDisableNext() : false
              }
            >
              Next
            </PrimaryButton>
          )}
        </Stack.Item>

        <Stack.Item>
          {stepDetails.currentPageIndex === stepList.length - 1 && (
            <PrimaryButton
              onClick={props.onSubmit}
              disabled={
                props.shouldDisableNext ? props.shouldDisableNext() : false
              }
            >
              {props.submitText?.length !== 0 ? props.submitText : "Submit"}
            </PrimaryButton>
          )}
        </Stack.Item>

      </Stack>
    </footer>
  );
};
