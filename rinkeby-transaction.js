var ethers = require('ethers');
var privateKey = 'xxx';
var wallet = new ethers.Wallet(privateKey);
console.log('Address: ' + wallet.address);
tx = {
  to: '0xA96f026F9A232E556F306D2B27677133B4dAe7Ff',
  value: ethers.utils.parseEther('0.05'),
  chainId: 4,
  nonce: 933,
};
var customHttpProvider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/1f7fc59f362a4bab84200522bd592a44'
);

customHttpProvider.estimateGas(tx).then(async function (estimate) {
  console.log(tx);
  tx = await customHttpProvider.getTransaction('0x00cac1ff2bd573be08a309123b8359c22e6334c3cf819ac40fae5bc1c910fe06');
  console.log(tx);
  console.log(estimate.toString());
  tx.gasPrice = null;

  tx.gasLimit = estimate;
  tx.type = 2;
  //pending
  // tx.maxFeePerGas = ethers.utils.parseUnits("1000000000", "wei");
  // tx.maxPriorityFeePerGas = ethers.utils.parseUnits("1", "wei");

  //replace
  tx.maxFeePerGas = ethers.utils.parseUnits('2.000000001', 'gwei');
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
