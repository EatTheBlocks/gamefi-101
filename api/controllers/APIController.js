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

async function getTicketBalance(Address) {
  try {
    let dao = new FloopyDAO(':memory:');

    return await dao.GetPlayerBalance(Address);
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
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.withdraw = async function withdraw(req, res) {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json(helper.APIReturn(101, "something wrongs"));
  }
}

