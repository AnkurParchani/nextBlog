export default function handleClientError(err: unknown) {
  console.log("handleClientError", err);
  if (err !== null && err !== undefined) {
    // Handling all Operational errors
    if (typeof err === "object" && "message" in err) {
      return { error: err.message };
    }
  }

  return { error: "Something went wrong, please try again later." };
}
