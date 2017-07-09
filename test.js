// JSON-RPC
const rpcAuth = require('./rpcAuth.js');
var bitcoinRpc = require('./node_modules/bitcoin')
var rpcClient = new bitcoinRpc.Client({
  host: 'localhost',
  port: 8332,
  user: rpcAuth.rpcuser,
  pass: rpcAuth.rpcpassword,
  timeout: 30000
});
// client.getInfo().then((help) => console.log(help));

// Firebase
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bitphilia-f8be0.firebaseio.com'
});

var monitor = function() {
  // rpcClient.getBalance('*', 6, function(err, balance, resHeaders) {
  //   if (err) return console.log(err);
  //   console.log('Balance:', balance);
  // });
  rpcClient.getRawMemPool(function(err, memPool) {
    if(err) return console.log(err);
    for( tx in memPool ) {
      console.log('tx '+tx+': '+memPool[tx]);
      rpcClient.getRawTransaction(memPool[tx], function(err, txInfo) {
        if(err) return console.log(err);
        console.log(txInfo);
      });
    }
  });
}

setInterval(monitor, 1000);
