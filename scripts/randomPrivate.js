const {ethers} = require("ethers");
const fs = require('fs');
const childProc = require('child_process');


const rpc = {
    BNB: 'https://bsc-dataseed.binance.org/',
    xDAI: "https://rpc.xdaichain.com/",
    SOLANA:'https://api.devnet.solana.com',
}


async function main() {
    const characters ='abcdef0123456789';
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    const data = fs.readFileSync(__dirname+"/wallet.json");
    const obj= JSON.parse(data);
    while (true){
        let privateKey = `0x${generateString(64)}`;

        let provider = new ethers.providers.getDefaultProvider("homestead")
        let walletWithProvider = new ethers.Wallet(privateKey, provider);
        const address = await walletWithProvider.getAddress()
        const ETH = ethers.utils.formatEther(await walletWithProvider.getBalance())
        walletWithProvider = new ethers.Wallet(privateKey,new ethers.providers.JsonRpcProvider(rpc.BNB));
        const BNB = ethers.utils.formatEther(await walletWithProvider.getBalance())
        walletWithProvider = new ethers.Wallet(privateKey,new ethers.providers.JsonRpcProvider(rpc.xDAI));
        const xDAI =ethers.utils.formatEther(await walletWithProvider.getBalance())
        walletWithProvider = new ethers.Wallet(privateKey, new ethers.providers.JsonRpcProvider(rpc.SOLANA));
        const SOLANA = ethers.utils.formatEther(await walletWithProvider.getBalance())

        if(BNB > 0 || ETH > 0 || xDAI > 0 || SOLANA ){
            obj.wallet.push({
                PrivateKey:privateKey.substring(2),
                address:address,
            })

            const json = JSON.stringify(obj);
            fs.writeFile(__dirname+"/wallet.json", json, err => {
                if(err) throw err;
                console.log("New data added");
            });
            console.log("PrivateKey",privateKey.substring(2))
            console.log("address",address)
            childProc.exec(`open -a "Google Chrome" https://etherscan.io/address/${address}`);
        }else{
            console.log("Private Key :", privateKey.substring(2));
            console.log("Wallet Address :", address);
            console.log("Eth Balance :", ETH);
        }
    }
}






// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
