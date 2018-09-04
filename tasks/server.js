const express = require('express');
const enforceSSL = require('express-enforces-ssl');
const compression = require('compression');
const mime = require('mime');
const auth = require('marshmallows');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.ENFORCE_SSL) {
  app.enable('trust proxy');
  app.use(enforceSSL());
}

// Expires Headers
function setHeaders(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    const cacheControl = {
      'image/png': 24 * 60 * 60, // 24 hours
      'image/svg+xml': 24 * 60 * 60, // 24 hours
      'image/jpg': 24 * 60 * 60, // 24 hours
      'image/jpeg': 24 * 60 * 60, // 24 hours
      'text/css': 24 * 60 * 60, // 24 hours
      'application/javascript': 24 * 60 * 60, // 24 hours
      'text/html': 0 // never
    };

    const mimeType = mime.lookup(req.path);
    const milliseconds = cacheControl[mimeType] || 0;
    const header = `public, max-age=' + ${milliseconds}.toString()`;

    res.setHeader('Cache-Control', header);
  }

  next();
}

app.use(compression()); // gzip
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', auth, setHeaders, express.static('dist'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
