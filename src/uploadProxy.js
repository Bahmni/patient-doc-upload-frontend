const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/openmrs', // This is the path where you will make requests from your UploadDocumentPage
    createProxyMiddleware({
      target: 'http://localhost', // Replace with your Bahmni server's URL without port
      changeOrigin: true,
      pathRewrite: {
        '^/openmrs': '', // Remove the '/openmrs' prefix
      },
    })
  );
};
