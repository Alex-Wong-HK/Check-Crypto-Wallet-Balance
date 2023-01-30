const {ethers} = require("ethers");
const fs = require('fs');
const childProc = require('child_process');

async function main() {
    const data = fs.readFileSync(__dirname+"/wallet2.json");
    const obj= JSON.parse(data);
    const stringList = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f"]
    const baseKey = "2953a48d0ce85fabe7fbc59d635a144fa999fe430189433fc15ed159e1d9d797"
    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
    for(let i = 2;i<baseKey.length;i++){
        for(let k =0 ; k<stringList.length;k++){

            if(stringList[k]==baseKey.charAt(i)){
                continue
            }
            const privateKey = baseKey.replaceAt(i, stringList[k]);
            let provider = new ethers.providers.getDefaultProvider("homestead")
            let walletWithProvider = new ethers.Wallet(privateKey, provider);


            const address = await walletWithProvider.getAddress()
            const ETH = ethers.utils.formatEther(await walletWithProvider.getBalance())

            if(ETH > 0 ){
                obj.wallet.push({
                    PrivateKey:privateKey.substring(2),
                    address:address,
                })
                const json = JSON.stringify(obj);
                fs.writeFile(__dirname+"/wallet2.json", json, err => {
                    if(err) throw err;
                    console.log("New data added");
                });

                childProc.exec(`open -a "Google Chrome" https://etherscan.io/address/${address}`);
            }else{
                console.log("Private Key :", privateKey.substring(2));
                console.log("Wallet Address :", address);
                console.log("Eth Balance :", ETH);
            }
            await sleep(3000);
        }

    }

    async function sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
