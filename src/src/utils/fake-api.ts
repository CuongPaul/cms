const fakeApi = (
  requestData?: any,
  options?: { time?: number; responseData?: any; errorMessage?: string }
) => {
  const { time = 2000, responseData, errorMessage } = options || {};

  requestData && console.log("requestData: ", requestData);

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      return errorMessage
        ? reject("An error occurred")
        : responseData
        ? resolve(responseData)
        : resolve("Success");
    }, time)
  );
};

export default fakeApi;
