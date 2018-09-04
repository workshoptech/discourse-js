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