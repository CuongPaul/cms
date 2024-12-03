const fakeApi = (
  options?: { time?: number; isError?: boolean; requestData?: any; responseData?: any }
) => {
  const { isError, time = 2000, requestData, responseData } = options || {};

  requestData && console.log("requestData: ", requestData);

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      return isError
        ? reject("An error occurred")
        : responseData
        ? resolve(responseData)
        : resolve("Success");
    }, time)
  );
};

export default fakeApi;
