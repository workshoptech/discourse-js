export function createBody() {
  const form = new FormData();
  const params = arguments[0];
  Object.keys(params).forEach(paramKey => {
    const paramValue = params[paramKey];

    if (paramValue instanceof Array) {
      paramValue.forEach(param => {
        form.append(`${paramKey}[]`, param);
      });
    } else {
      form.append(paramKey, paramValue);
    }
  });
  return form;
}
export class ApiError extends Error {
  constructor(status, statusText, error, erorrArray = []) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} - ${statusText || error}`;
    this.error = error || erorrArray.join(', ');
  }
}
