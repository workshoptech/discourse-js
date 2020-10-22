export const createBody = (
  params: Record<string, string | number | Blob>,
): FormData => {
  const form = new FormData();

  Object.keys(params).forEach(paramKey => {
    const paramValue = params[paramKey];

    if (paramValue instanceof Array) {
      paramValue.forEach(param => {
        form.append(`${paramKey}[]`, param);
      });
    } else if (typeof paramValue === 'number') {
      form.append(paramKey, paramValue.toString());
    } else {
      form.append(paramKey, paramValue);
    }
  });
  return form;
};

export const buildQueryString = (
  uri: string,
  params: Record<string, string | number | boolean>,
): string => {
  const queryString = Object.keys(params)
    .map(key => {
      const value = params[key];

      if (Array.isArray(value)) {
        return value.map(sub => `${key}[]=${sub}`).join('&');
      }

      return `${key}=${params[key]}`;
    })
    .join('&');

  const separator = !!queryString ? (uri.indexOf('?') !== -1 ? '&' : '?') : '';
  return `${uri}${separator}${queryString}`;
};

export class ApiError extends Error {
  status: number;
  statusText: string;
  error: string;

  constructor(
    status: number,
    statusText: string,
    error: string,
    errorArray = [],
  ) {
    super();
    const errorMessage = error || errorArray.join(', ');

    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} - ${statusText || errorMessage}`;
    this.error = errorMessage;
  }
}
