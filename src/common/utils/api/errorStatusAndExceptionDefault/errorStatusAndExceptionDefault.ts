import { IThunkError, TErrorType } from "../../../interfaces/IThunkError";

export const errorStatusAndExceptionDefault = (
  actionName: string,
  errorType: TErrorType,
  responseStatus: string | number,
  errorToastEmoji?: string
): IThunkError => {
  if (responseStatus === "error") {
    return {
      message: `${actionName} error.`,
      errorType: errorType,
      toastEmoji: errorToastEmoji,
    };
  }

  return {
    message: `A ${actionName} exception happened, please try again or contact support.`,
    errorType: "exception",
    toastType: "error",
    toastEmoji: "🚨",
  };
};
