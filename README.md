
This tool is only for safety testing, and it is strictly forbidden to be used for illegal purposes, and the consequences have nothing to do with our team


### Random Private 
Access Wallet by random private key. Default Query Coins from :

* BNB
* xDAI
* SOLANA

### Start From Base Key.
Access Wallet start from base key (edit the value of baseKey). Default Query Coins from :

* ETH

### Add Chains
Add the rpc link to the rpc{}.

```
const rpc = { NEWCHAIN : "url" };
walletWithProvider = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpc.NEWCHAIN));
const BALANCE = ethers.utils.formatEther(await walletWithProvider.getBalance());
```


### Quick Start
```
npm i

node scripts/randomPrivate.js 
or 
node scripts/startFromBaseKey.js
```
