'use strict';

const config = {

  // Change to your endpoint did's endpoint
  endpointDidEndpoint: process.env.PUBLIC_DID_ENDPOINT,

  // IP Address of the running ledger
  testPoolIp: process.env.TEST_POOL_IP || '127.0.0.1',

  // the port to run the agent server on
  port: process.env.PORT || 3001,

  // Optional: Give your wallet a unique name
  walletName: `${process.env.USERNAME || 'cbr'}_wallet`,

  // Optional: Give your pool config a unique name
  poolName: process.env.POOL_NAME || 'pool1',

  // This information is used to issue your "Government ID"
  userInformation: {
    name: process.env.NAME || 'CBR',
    email: process.env.EMAIL || 'cbradmin@cbr.nl',
    tax_id: process.env.TAX_ID || '123-45-6789',
    icon_src: process.env.ICON_SRC || 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538738-school_512x512.png',
    username: process.env.USERNAME || 'cbr',
    password: process.env.PASSWORD || '123'
  },

  sessionSecret: "YUYFDISYFSIUOFYERTEWRTEWTWETRNNNMNJHKHFASDdyfiudayDAYIUSDFYASIOFOOASIUDFYEREAHLSKJFE57894502354354HJKAFDDFS"
};

module.exports = config;