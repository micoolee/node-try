var ethers = require('ethers');
var customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/1f7fc59f362a4bab84200522bd592a44'
);
var privateKey = 'xxx';
var wallet = new ethers.Wallet(privateKey);
console.log('Address: ' + wallet.address);

customHttpProvider
  .getTransaction('0xe471fa012e7204cb5a6ca0d0fbda0441390c9c854e4f56b3ef9966fe9c423502')
  .then(async function (tx) {
    console.log(tx.gasLimit.toString());
    console.log(tx.nonce.toString());
    tx.gasPrice = null;
    tx.type = 2;
    tx.maxFeePerGas = ethers.utils.parseUnits('90', 'gwei');
    tx.maxPriorityFeePerGas = ethers.utils.parseUnits('2', 'gwei');
    wallet
      .signTransaction(tx)
      .then(async (signedTX) => {
        await customHttpProvider
          .sendTransaction(signedTX)
          .then(async (resp) => {
            console.log(resp.hash);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  });
