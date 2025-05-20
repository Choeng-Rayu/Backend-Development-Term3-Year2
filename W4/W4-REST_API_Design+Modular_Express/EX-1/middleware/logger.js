
// filepath: d:\Year2\Term3\Backend-Development\GitHup\Backend-Development-Term3-Year2\W4\W4-REST_API_Design+Modular_Express\EX-1\middleware\logger.js
module.exports = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
// This middleware logs the request method and URL to the console.