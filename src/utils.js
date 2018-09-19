// Create body takes in an objects
// and then maps the object keys:values to FormData.
export function createBody() {
  const form = new FormData();
  const params = arguments[0];
  Object.keys(params).forEach(paramKey => {
    const paramValue = params[paramKey];
    form.append(paramKey, paramValue);
  });
  // for (var pair of form.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  return form;
}
export class ApiError extends Error {
  constructor(status, statusText, error, erorrArray = []) {
    super();
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} - ${statusText || error}`;
    this.error = error || erorrArray.join(", ");
  }
}
