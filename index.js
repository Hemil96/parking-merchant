// Environment variables
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dbSetting = require('./config/database');
const logger = require('./helper/logger');


const app = express();
app.use(cors());


// Custom filename and path for files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
});

const upload = multer({ storage: storage });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});


// To secure the headers
app.use(helmet());

// app.use(app.limit('15mb'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// for parsing multipart/form-data
const fields = [
  { name: 'documents', maxCount: 20 },
  { name: 'signatureOnly', maxCount: 20 },
  { name: 'supportingDocument', maxCount: 20 },
];

const filelimits = upload.fields(fields);
app.use(filelimits);

app.use(express.static('public'));

// Import all modals
require('./db/merchantModel');
require('./db/parkingModel');
require('./db/premisesModel');
require('./db/myParkingModel');
require('./db/contestModel');


// Mongoose database connection
const connectDb = () => {
  mongoose.connect(dbSetting.connectionURL, { useNewUrlParser: true }, (err) => {
    if (err) {
      logger.info(`Could not connect to mongo: ${err}`);
      process.exit(0);
    }
    logger.info('mongoose connected to');
  });
};
connectDb();

// Express Settings
const serverPort = process.env.NCAPI_PORT || 4000;
app.set('port', serverPort);

// Router
app.use('/api/v1', limiter, require('./routes/v1'));

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
  } else {
    next();
  }
});

// Start server
const startServer = (p) => {
  const port = p || app.get('port');
  const server = http.createServer(app);
  server.listen(port, () => {
    logger.info(`server started on port: ${port}`);
  });
  return server;
};

if (!module.parent) {
  startServer();
}

const destroyServer = (server) => {
  server.close(() => {
    logger.info('closing out the server');
    process.exit(0);
  });
};


const serverHandlers = {
  startServer,
  dbSetting,
  destroyServer,
};
module.exports = serverHandlers;
