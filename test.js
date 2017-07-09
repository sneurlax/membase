const rpcAuth = require('./rpcAuth.js');
const Client = require('bitcoin-core');
const client = new Client({ username: rpcAuth.rpcuser, password: rpcAuth.rpcpassword});

// client.getInfo().then((help) => console.log(help));

var admin = require('firebase-admin');

var serviceAccount = require('serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sample-project.firebaseio.com'
});
