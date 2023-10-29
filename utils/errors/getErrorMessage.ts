const getErrorMessage = (err: unknown): string => {
  let message: string;

  if (err instanceof Error) {
    message = err.message;
  } else if (err && typeof err === "object" && "error" in err) {
    message = String(err.error);
  } else {
    message = "Something went wrong";
  }

  return message;
};

export default getErrorMessage;
