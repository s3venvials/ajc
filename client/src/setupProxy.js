const { createProxyMiddleware } = require('http-proxy-middleware');
const network = {
    IP: "http://localhost:",
    PORT: "5000"
};
 
module.exports = function(app) {
    app.use(createProxyMiddleware(['/api'], { target: `${network.IP}${network.PORT}` }));
}