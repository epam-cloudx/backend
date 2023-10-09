export const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const responseParser = (statusCode: number, body = {}) => {
  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(body),
  };
};
