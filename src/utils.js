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

export function buildQueryString(uri, params) {
  const queryString = Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  return `${uri}${separator}${queryString}`;
}

export class ApiError extends Error {
  constructor(status, statusText, error, errorArray = []) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} - ${statusText || error}`;
    this.error = error || errorArray.join(', ');
  }
}
