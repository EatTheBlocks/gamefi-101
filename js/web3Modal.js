const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal
let provider;
let selectedAccount;

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
  const accInfo = {};
  const web3 = new Web3(provider);
  const chainId = await web3.eth.getChainId();
  accInfo.chainId = chainId;
  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];
  accInfo.walletAddress = selectedAccount;
  const balance = await web3.eth.getBalance(selectedAccount);
  accInfo.balance = web3.utils.fromWei(balance);

  const accountContainer = document.querySelector("#wallet-info");
  accountContainer.innerHTML = `
    <div class='wallet-address'>
      <span>Address: </span>
      <span>${shortAddress(accInfo.walletAddress)}</span>
    </div>   
    <div class='line'>
      <span>Balance: </span>
      <span>${accInfo.balance}</span>
    </div>
    `;

  document.querySelector('.wallet-information').style.display = 'flex';
  document.querySelector("#walletConnect").style.display = "none";
}


async function refreshAccountData() {
  await fetchAccountData(provider);
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
  alert('disconnect nef')
  console.log('onDisconnect ')
  if (provider.close) {
    await web3Modal.clearCachedProvider();
    provider = null;
  }
  selectedAccount = null;
  document.querySelector("#walletConnect").style.display = "block";
  document.querySelector(".wallet-information").style.display = "none";
}

$("#disconnect-wallet").click(function() {
  alert('on disconnected');
})


window.addEventListener('load', async () => {
  init();
  document.querySelector("#walletConnect").addEventListener("click", onConnect);
  // document.querySelector("#disconnect-wallet").addEventListener("click", onDisconnect);
});

  