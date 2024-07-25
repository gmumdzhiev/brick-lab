export type TErrorType = 'transform_failed'
    | 'fetch_error'
    | 'delete_error'
    | 'post_error'
    | 'exception'
    | 'not_found'
    | 'invalid_credentials'
    | 'unauthorized'

export interface IThunkError {
    message: string
    errorType: TErrorType
    toastType?: 'success' | 'error' | 'info' | 'warning'
    toastTitle?: string
    toastEmoji?: string
}

export function isInstanceOfIThunkError(object: any): object is IThunkError {
  return object.errorType in object
}
