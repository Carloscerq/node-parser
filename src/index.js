const express = require('express');
const parseServer = require('parse-server').ParseServer;
const app = express();

const parseServerApi = new parseServer({
  databaseURI: 'mongodb://localhost:27017/dev',
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'http://localhost:1337/parse',
});

app.use('/parse', parseServerApi);

app.listen(1337, () => {
  console.log('parse-server-example running on port 1337.');
});
