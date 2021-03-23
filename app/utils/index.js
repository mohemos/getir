const HTTP_STATUS_CODE_ERROR = {
  400: "VALIDATION_ERROR",
  401: "AUTHENTICATION_ERROR",
  403: "AUTHORISATION_ERROR",
  404: "ENTRY_NOT_FOUND",
  409: "ENTRY_EXISTS",
  500: "FATAL_ERROR",
};

export const errorMessage = (err = void 0, ERROR_TYPE = "FATAL_ERROR") => {
  let message;
  if (err && err.errors)
    message = err.errors[0] ? err.errors[0].message : "Something went wrong.";
  else if (err && err.message) message = err.message;
  else if (typeof err === "string") message = err;
  else message = "Something went wrong";

  const response = { code: err.httpStatusCode || 500, msg: message };

  response.error =
    err.name || HTTP_STATUS_CODE_ERROR[err.httpStatusCode] || ERROR_TYPE;
  return response;
};
