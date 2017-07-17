// JSON-RPC
var rpcAuth = require('./rpcAuth.js');
var bitcoin = require( 'bitcoin-promise' ) ;

var client = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  user: rpcAuth.rpcuser,
  pass: rpcAuth.rpcpassword,
  timeout: 30000
});

// get a new address and return details about it
client.getNewAddress()
.then( function(addr){
  return client.validateAddress( addr ) ;
}) 
.then( function(addrInfo){
  console.log( addrInfo ) ;
}) 
.catch( function(err){
  console.log( err ) ;
}) ;


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

/*
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
          // if( err ) return console.log(err);
          if( err ) return console.log(err);
          console.log(decodedTx);
          // memPool[] = decodedTx;
        });
      });
    }
    console.log(memPool);
    // for( tx in memPool ) {
    //   var memPoolRef = ref.child(tx['hash']);
    //   memPoolRef.set({
    //     tx
    //   });
    // }
  });
}

monitor();
// setInterval(monitor, 1000*60);
*/
