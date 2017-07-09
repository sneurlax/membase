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
// rpcClient.getInfo().then((help) => console.log(help));
// rpcClient.getBalance('*', 6, function(err, balance, resHeaders) {
//   if (err) return console.log(err);
//   console.log('Balance:', balance);
// });

// Firebase
/*
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bitphilia-f8be0.firebaseio.com'
});
var db = admin.database();
var ref = db.ref('mempool');
*/

var memPool = {}

var monitor = function() {
  rpcClient.getRawMemPool(function(err, rawMemPool) {
    if( err ) return console.log(err);
    for( tx in rawMemPool ) {
      // console.log('tx '+tx+': '+rawMemPool[tx]);
      rpcClient.getRawTransaction(rawMemPool[tx], function(err, rawTx) {
        if( err ) return console.log(err);
        // console.log('rawtx: '+rawTx);
        rpcClient.cmd('decoderawtransaction', rawTx, function(err, decodedTx) {
          if( err ) return /*console.log(err)*/;
          // console.log(decodedTx);
          memPool[] = decodedTx;
        });
      });
    }
    console.log(memPool);
    /*
    for( tx in memPool ) {
      var memPoolRef = ref.child(tx['hash']);
      memPoolRef.set({
        tx
      });
    }
    */
  });
}

monitor();
setInterval(monitor, 1000*60);
