export default function handleClientError(err: unknown) {
  if (err !== null && err !== undefined) {
    // Handling all Operational errors
    if (typeof err === "object" && "message" in err) {
      return console.log(err.message || undefined);
    }
  }

  return console.log("something went wrong");
}
