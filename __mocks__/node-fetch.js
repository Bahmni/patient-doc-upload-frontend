const { ReadableStream } = require('web-streams-polyfill/ponyfill/es6');
const nodeFetch = jest.requireActual('node-fetch');

module.exports = async (url, options) => {
  if (url === '/api/patients') {
    const response = new nodeFetch.Response(
      JSON.stringify([{ uuid: '1', name: 'John Doe', identifier: '123' }]),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  }

  return nodeFetch(url, options);
};

module.exports.Response = nodeFetch.Response;
module.exports.Headers = nodeFetch.Headers;
module.exports.Request = nodeFetch.Request;
