export var checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText || JSON.parse(response._bodyText).message);
    error.response = response;
    throw error;
  }
}