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
// rpcClient.getInfo() // test connection and print results
//   .then( function(help) { console.log(help); }) 
//   .catch( function(err) { console.log(err); });

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
        // console.log('tx '+tx+': '+rawMemPool[tx]);
        memPool[rawMemPool[tx]] = false;

        rpcClient.getRawTransaction(rawMemPool[tx])
          .then( function(rawTx) {
            // console.log('rawtx: '+rawTx);
            // memPool[rawMemPool[tx]] = {};
            // memPool[rawMemPool[tx]]['raw'] = rawTx;

            rpcClient.decodeRawTransaction(rawTx)
              .then( function(decodedTx) {
                // console.log('decodedTx: '+JSON.stringify(decodedTx));
                // memPool[rawMemPool[tx]]['decoded'] = decodedTx;

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

  /*
  rpcClient.getRawMemPool(function(err, rawMemPool) {
    if( err ) return console.log(err);

    console.log(memPool);

    // TODO: check if any memPool[] are false
    // rpcClient.cmd('decoderawtransaction', rawTx, function(err, decodedTx) {
    //   // if( err ) return console.log(err);
    //   if( err ) return console.log(err);
    //   console.log(decodedTx);
    //   // memPool[] = decodedTx;
    // });

    // console.log(memPool);
    // for( tx in memPool ) {
    // }
  });
  */
}

monitor();
// setInterval(monitor, 1000*60);
