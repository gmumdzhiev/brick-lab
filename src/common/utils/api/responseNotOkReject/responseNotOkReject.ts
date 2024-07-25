import { IThunkError } from "../../../interfaces/IThunkError";

export const responseNotOkReject = (
  apiName: string,
  responseCode: number,
  customMessage?: string
): IThunkError => {
  switch (responseCode) {
    case 401:
      return {
        toastType: "warning",
        message: customMessage || `Your call to ${apiName} is unauthorized.`,
        errorType: "unauthorized",
        toastEmoji: "🔑",
      };
    case 404:
      return {
        toastType: "warning",
        message: customMessage || `Your call to ${apiName} is not found.`,
        errorType: "not_found",
        toastEmoji: "🔍",
      };
    default:
      return {
        toastType: "warning",
        message: "There is something wrong with your connection.",
        errorType: "exception",
        toastEmoji: "🌐",
      };
  }
};
