export var checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    var error;
    console.log("API ERROR", response)
    if (response.status == 404) {
      throw (new Error(response.url + " not found"));
    }
    else if(response.status == 403){
      throw (new Error(response.url + " Forbidden"));
    }
    //let text = 
    error = new Error(response.statusText ||  (response._bodyText ?  JSON.parse(response._bodyText) : "Request Error").message);
    error.response = response;
    throw error;
  }
}