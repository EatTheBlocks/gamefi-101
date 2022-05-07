'use strict';
const Web3 = require('web3');
const vaultabi = require('../contracts/vault.json');
const flapabi=require('../contracts/vault.json');
const FloopyDAO = require('../data/FloopybirdDAO');
var web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


async function getBalance(Address) {
  try {
    Address=Address.toLowerCase();
    var contract = await new web3.eth.Contract(flapabi, token_address);
    var bl = await contract.methods.balanceOf(Address).call();

    var value = bl / 10 ** 18;
    return value;
  } catch (error) {
    return null;
  }
}

async function getTicketBalance(address) {
  try {
    let dao = new FloopyDAO(':memory:');
    
    return await dao.GetPlayerBalance(address);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addTicketBalance(address, amount) {
  try {
    let dao = new FloopyDAO(':memory:');
    //await dao.AddPlayerVault(address);
    return await dao.AddPlayerBalance(address, amount);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function withdrawTicketBalance(address, amount) {
  try {
    let dao = new FloopyDAO(':memory:');
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    let result =  await dao.WithdrawPlayerBalance(address, amount);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function startPlayerMatch(address, amount) {
  try {
    let dao = new FloopyDAO(':memory:');
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    let result =  await dao.WithdrawPlayerBalance(address, amount);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


async function deposit(Address, ticket, transaction_id) {
  try {

  } catch (error) {
    return null;
  }
}

async function withdraw(Address, ticket, transaction_id) {
  try {

  } catch (error) {
    return null;
  }
}

exports.getBalance = async function (req, res) {
  try {
    var bls = await getBalance(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "Balances": bls }, "Success"));

  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.getTitketBalance = async function (req, res) {
  try {
    var bls = await getTicketBalance(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "Balances": bls }, "Success"));

  } catch (error) {
    console.log(error);
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.withdraw = async function withdraw(req, res) {
  try {
    let {address, amount} = req.body;
    if(address ===undefined || amount === undefined || amount <= 0){
      return res.status(400).json(helper.APIReturn(101, "bad request"));
    }
    let result = await withdrawTicketBalance(address, amount);
    if(result == null){
      return res.status(400).json(helper.APIReturn(102, "bad request"));   
    }
    return res.status(200).json(helper.APIReturn(0,{result}, "success"));   
  } catch (error) {
    console.log(error);
    return res.status(500).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.deposit = async function deposit(req, res) {
  try {
    let {address, amount} = req.body;
    if(address ===undefined || amount === undefined || amount <= 0){
      return res.status(400).json(helper.APIReturn(101, "bad request"));
    }
    let result = await addTicketBalance(address, amount);
    if(result == null){
      return res.status(400).json(helper.APIReturn(102, "bad request"));   
    }
    return res.status(200).json(helper.APIReturn(0,{result}, "success"));   
  } catch (error) {
    console.log(error);
    return res.status(500).json(helper.APIReturn(101, "something wrongs"));
  }
}

