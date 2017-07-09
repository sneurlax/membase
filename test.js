const rpcAuth = require('./rpcAuth.js');
const Client = require('bitcoin-core');
const client = new Client({ username: rpcAuth.rpcuser, password: rpcAuth.rpcpassword});

client.getInfo().then((help) => console.log(help));
