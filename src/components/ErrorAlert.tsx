import { useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

export interface ErrorAlertProps {
  errorMessage?: null | string;
  hideError: (val: null | string) => void;
}

const ErrorAlert = ({ errorMessage, hideError }: ErrorAlertProps) => {
  useEffect(() => {
    if (errorMessage && errorMessage !== null) {
      StatusAlertService.showError(errorMessage);
    } else {
      hideError(null);
    }
  });

  return <StatusAlert />;
};

export default ErrorAlert;
