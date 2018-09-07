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

/**
 * # objectValidator utility function.
 *
 * - Pass in an object
 * - Returns array of undefined key/value.
 * - Returns true if all values are defined.
 */
export function objectValidator(object) {
  const undefinedValues = [];
  for (const objectKey in object) {
    if (object[objectKey] === undefined) {
      undefinedValues.push(`${objectKey} is undefined.`);
    }
  }
  if (undefinedValues.length > 0) {
    return undefinedValues;
  }
  return true;
}

export class ApiError extends Error {
  constructor(status, statusText, errors) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
  }
}
