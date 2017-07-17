// JSON-RPC
var rpcAuth = require('./rpcAuth.js');
var bitcoin = require( 'bitcoin-promise' ) ;

var rpcClient = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  user: rpcAuth.rpcuser,
  pass: rpcAuth.rpcpassword,
  timeout: 30000
});

// Firebase
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bpoch-bd639.firebaseio.com'
});
var db = admin.database();
var ref = db.ref('mempool');

var memPool = {}

var monitor = function() {
  // get a new address and return details about it
  rpcClient.getRawMemPool()
    .then( function(rawMemPool) {
      for( tx in rawMemPool ) {
        rpcClient.getRawTransaction(rawMemPool[tx])
          .then( function(rawTx) {
            rpcClient.decodeRawTransaction(rawTx)
              .then( function(decodedTx) {
                var memPoolRef = ref.child(decodedTx['txid']);
                memPoolRef.set({
                  size: decodedTx['size'],
                  vin: decodedTx['vin'],
                  vout: decodedTx['vout']
                });
              })
              .catch( function(err) {
                // console.log( err );
              });
          })
          .catch( function(err) {
            // console.log( err );
          });
      }
    })
    .catch( function(err) {
      // console.log( err );
    });
}

monitor();
setInterval(monitor, 1000*60);
