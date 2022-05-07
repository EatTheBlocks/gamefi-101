const Web3 = require('web3');
const vaultabi = require('../contracts/vault.json');
const flapabi=require('../contracts/vault.json');

class SmartContractDAO{
    constructor(){
        this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
        this.token_address ="";
        this.vault_address ="0x140A13fe4da9e9F6dc5B712bf10F5F9fE91fd430";
        this.withdrawer_private_key="";
        this.withdrawer_address="";
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
    }
}
exports.SmartContractDAO = SmartContractDAO;