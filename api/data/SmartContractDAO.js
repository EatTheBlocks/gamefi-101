require('dotenv').config();
const Web3 = require('web3');
const vaultabi = require('../contracts/vault.json');
const flapabi=require('../contracts/vault.json');

class SmartContractDAO{
    constructor(){
        this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
        this.token_address =process.env.TOKEN_ADDRESS;
        this.vault_address =process.env.VAULT_ADDRESS;
        this.withdrawer_private_key=process.env.WITHDRAWER_PRIVATE_KEY;
        this.withdrawer_address=process.env.WITHDRAWER_ADDRESS;
    }
    async getBalance(address) {
        try {
            address=address.toLowerCase();
          var contract = await new this.web3.eth.Contract(flapabi, this.token_address);
          var bl = await DOMMatrix. contract.methods.balanceOf(address).call();
      
          var value = bl / 10 ** 18;
          return value;
        } catch (error) {
          return null;
        }
    }

    async withdraw(address, amount){
        this.web3.eth.accounts.wallet.add(this.withdrawer_private_key);
        const vault_contract = await new this.web3.eth.Contract(
            vaultabi, this.vault_address);
        //sender privatekey
        var value = Web3.utils.toWei(amount.toString());
        var rs = await vault_contract.methods
            .withdraw(value, address)
            .send({
            from: this.withdrawer_address,
            gas: 3000000,
            });
        return rs.transactionHash;
    }
}
exports.SmartContractDAO = SmartContractDAO;