
export var checkStatus = response => {
    if (response.ok) {
      return response;
    } else {
      console.log(response);
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }