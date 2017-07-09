# membase
Push the bitcoin mempool to Firebase

### Setup
The Bitcoin configuration file must be set to allow JSON-RPC connections.  By defualt, Bitcoin (or bitcoind) will look for a file name `bitcoin.conf` in the bitcoin data directory, but both the data directory and the configuration file path may be changed using the -datadir and -conf command-line arguments.

| Operating System | Default bitcoin datadir                    | Typical path to configuration file                                |
|------------------|--------------------------------------------|------------------------------------------------------------------|
| Windows          | %APPDATA%\Bitcoin\                         | C:\Users\username\AppData\Roaming\Bitcoin\bitcoin.conf           |
| Linux            | $HOME/.bitcoin/                            | /home/username/.bitcoin/bitcoin.conf                             |
| Mac OSX          | $HOME/Library/Application Support/Bitcoin/ | /Users/username/Library/Application Support/Bitcoin/bitcoin.conf |

Specifically, the `server` flag must be set to 1 and both `rpcuser` and `rpcpassword` should be set to long unique strings.  For example:

```
##
## bitcoin.conf configuration file. Lines beginning with # are comments.
##

#
# JSON-RPC options (for controlling a running Bitcoin/bitcoind process)
#

# server=1 tells Bitcoin-Qt and bitcoind to accept JSON-RPC commands
server=1

# rpcuser and rpcpassword set the credentials necessary to access the JSON-RPC api.
rpcuser=Abscond
rpcpassword=You_Will_Get_Robbed_If_You_Use_This
```

Edit `rpcAuth.js` to reflect the values set in `bitcoin.conf`.
