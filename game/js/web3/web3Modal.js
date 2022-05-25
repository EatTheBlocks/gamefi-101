const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const FLOPPY_ADDRESS = '0x553f07Dbf6ED9f1C15b708d90f65EBC75548787f';
const FLOPPY_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "bp", "type": "address" }], "name": "BPAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bool", "name": "_enabled", "type": "bool" }], "name": "BPEnabled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BPTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "BP", "outputs": [{ "internalType": "contract BPContract", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bpEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_bp", "type": "address" }], "name": "setBpAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_enabled", "type": "bool" }], "name": "setBpEnabled", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const VAL_ADDRESS = '0x140A13fe4da9e9F6dc5B712bf10F5F9fE91fd430';
const VAL_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WITHDRAWER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxWithdrawAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_maxAmount", "type": "uint256" }], "name": "setMaxWithdrawAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "_token", "type": "address" }], "name": "setToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_isEnable", "type": "bool" }], "name": "setWithdrawEnable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawEnable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]

const GAS_FEE = 500000;
const GAS_FEE_APPROVAL = 60000;

const TESTNET_BSCSCAN = "https://testnet.bscscan.com/tx/"

let web3Modal
let provider;
let web3;
let selectedAccount;
let accountInfo;



function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          56: 'https://bsc-dataseed.binance.org/'
        },
      }
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    disableInjectedProvider: false,
  });
}

function shortAddress(address) {
  const shortAddress = `${address?.substr(0, 4)}...${address?.substr(
    address.length - 4,
    address.length - 1
  )}`
  return shortAddress;
}


async function fetchAccountData() {
  if (!provider) return;
  const accInfo = {};
  web3 = new Web3(provider);
  const chainId = await web3.eth.getChainId();
  accInfo.chainId = chainId;
  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];
  accInfo.walletAddress = selectedAccount;
  const balance = await web3.eth.getBalance(selectedAccount);
  accInfo.balance = web3.utils.fromWei(balance);

  const ticket = await getBalanceOf(accInfo.walletAddress);
  accInfo.ticket = ticket.balances;

  const flpBalance = await getFLPBalance(accInfo.walletAddress);
  accInfo.flpBalance = flpBalance;

  accountInfo = accInfo;

  const accountContainer = document.querySelector("#wallet-info");
  accountContainer.innerHTML = `
    <div class='wallet-address'>
      <span>Address: </span>
      <span>${shortAddress(accInfo.walletAddress)}</span>
    </div>   
    <div class='line'>
      <span>BNB: </span>
      <span>${parseFloat(accInfo.balance).toFixed(2)}</span>
    </div>
    <div class='line'>
      <span>FLP: </span>
      <span>${parseFloat(accInfo.flpBalance).toFixed(2)}</span>
    </div>
    <div class='line'>
      <span>Ticket: </span>
      <span>${accInfo.ticket}</span>
    </div>
    `;
  document.querySelector('.wallet-information').style.display = 'flex';
  document.querySelector("#walletConnect").style.display = "none";
}


async function refreshAccountData() {
  await fetchAccountData(provider);
}

async function deposit(address, amount) {
  const flappyContract = new web3.eth.Contract(FLOPPY_ABI, FLOPPY_ADDRESS);
  await flappyContract.methods
    .approve(VAL_ADDRESS, web3.utils.toWei(`${amount}`))
    .send({ from: address, gas: GAS_FEE_APPROVAL });

  const valContract = new web3.eth.Contract(VAL_ABI, VAL_ADDRESS);
  const rs = await valContract.methods.deposit(web3.utils.toWei(`${amount}`))
    .send({ from: address, gas: GAS_FEE });

  const response = await depositApi(address, amount, rs.transactionHash);
  console.log({ response })
  return rs.transactionHash;
}


async function getFLPBalance(address) {
  const flappyContract = new web3.eth.Contract(FLOPPY_ABI, FLOPPY_ADDRESS);
  const balance = await flappyContract.methods.balanceOf(address).call();
  return  web3.utils.fromWei(balance);
}


async function onConnect() {
  
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

async function onDisconnect() {
  if (provider) {
    try {
      await web3Modal.clearCachedProvider();
      provider = null;
    } catch (er) {
      console.log(er);
    }
  }
  selectedAccount = null;
  document.querySelector("#walletConnect").style.display = "block";
  document.querySelector(".wallet-information").style.display = "none";
}

function onShowConvertModal() {
  const modal = $("#deposit-withdraw").fadeToggle();
}

async function onConvertTicket() {
  $(this).attr("disabled", true);
  const process = $("#processing");
  process.show();
  const lblFrom = $("#label-from");
  const from =  $("#from-ticket");
  const to = $("#to-ticket");
  const fromVal = parseInt(from.val());  
  let tranHash = '';
  if (lblFrom.text() === 'Ticket') {
    const dataResponse = await withdrawApi(accountInfo.walletAddress, fromVal);
    tranHash = dataResponse.txHash;
  } else {
    tranHash = await deposit(accountInfo.walletAddress, fromVal);
  }
  from.val(0);
  to.val(0);

  await fetchAccountData();
  const aTransaction = $("#a-transactionHash");
  let url = `${TESTNET_BSCSCAN}${tranHash}`

  aTransaction.attr('href', url);
  aTransaction.text(shortAddress(tranHash));
  
  process.hide();
  $(this).attr("disabled", false);
  $("#deposit-withdraw").fadeToggle();

  $("#dialog").dialog(); 
}


function onRevert() {
  const from = $("#from-ticket");
  const to = $("#to-ticket");

  const fromVal = from.val();
  const toVal = to.val();

  const lblFrom = $("#label-from");
  const lblTo = $("#label-to");

  if (lblFrom.text() === 'Ticket') {
    lblTo.text('Ticket');
    lblFrom.text('FBird');
    from.val(toVal);
    to.val(fromVal);
  } else {
    lblTo.text('FBird');
    lblFrom.text('Ticket');
    from.val(toVal);
    to.val(fromVal);
  }
}

function onFromTicketChange() {
  const val = $(this).val();
  $("#to-ticket").val(val);
}

window.addEventListener('load', async () => {
  init();
  document.querySelector("#walletConnect").addEventListener("click", onConnect);
  document.querySelector("#disconnect-wallet").addEventListener("click", onDisconnect);
  document.querySelector("#convert-container").addEventListener("click", onShowConvertModal);
  document.querySelector("#btn-convert").addEventListener("click", onConvertTicket);
  document.querySelector('#img-convert').addEventListener('click', onRevert);
  document.querySelector('#from-ticket').addEventListener('change', onFromTicketChange);
});

