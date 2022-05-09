'use strict';
const FloopyDAO = require('../data/FloopybirdDAO');
const SmartContractDAO = require('../data/SmartContractDAO');
const matchCode = 5;
const dbfilepath = "floppyBird.db";

async function getBalance(Address) {
    let dao = new SmartContractDAO();
    return await dao.getBalance(Address);
}

async function addPlayer(address){
  try {
    let dao = new FloopyDAO(dbfilepath);
    return await dao.AddPlayerVault(address);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTicketBalance(address) {
  let dao = new FloopyDAO(dbfilepath);
  try{
    await dao.AddPlayerVault(address);
  }
  catch{}
  try {
    return await dao.GetPlayerBalance(address);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTopPlayer() {
  let dao = new FloopyDAO(dbfilepath);
  try {

    return await dao.GetTopPlayer();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function addTicketBalance(address, amount, transaction_id) {
  try {
    let dao = new FloopyDAO(dbfilepath);
    return await dao.AddPlayerBalance(address, amount, transaction_id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function withdrawTicketBalance(address, amount) {
  try {
    let dao = new FloopyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    let result =  await dao.WithdrawPlayerBalance(address, amount);

    return result;

  } catch (error) {
    console.log(error);
  }
  return null;
}

async function startPlayerMatch(address) {
  try {
    let dao = new FloopyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    let code =  await dao.WithdrawPlayerBalance(address, matchCode);
    if(code != null){
      let result =  await dao.StartPlayerMatch(address);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function endPlayerMatch(address, id, point, matchData) {
  try {
    let dao = new FloopyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    let updateId = await dao.EndPlayerMatch(address, id, point, matchData);
    if(updateId != null){
      let result =  await dao.AddPlayerBalance(address, point, null);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

exports.addPlayer = async function (req, res) {
  try {
    var bls = await addPlayer(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "balances": bls }, "Success"));

  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.getBalance = async function (req, res) {
  try {
    var bls = await getBalance(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "balances": bls }, "Success"));

  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.getTitketBalance = async function (req, res) {
  try {
    var bls = await getTicketBalance(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "balances": bls }, "Success"));

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
    console.log("call smart contract");
    let dao = new SmartContractDAO.SmartContractDAO();
    await dao.withdraw(address, result);

    return res.status(200).json(helper.APIReturn(0,{result}, "success"));   
  } catch (error) {
    console.log(error);
    return res.status(500).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.deposit = async function deposit(req, res) {
  try {
    let {address, amount, transaction_id} = req.body;
    if(address === undefined || amount === undefined || amount <= 0 || transaction_id === undefined){
      return res.status(400).json(helper.APIReturn(101, "bad request"));
    }
    let result = await addTicketBalance(address, amount, transaction_id);
    if(result == null){
      return res.status(400).json(helper.APIReturn(102, "bad request"));   
    }
    return res.status(200).json(helper.APIReturn(0,{result}, "success"));   
  } catch (error) {
    console.log(error);
    return res.status(500).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.startMatch = async function (req, res) {
  try {
    var bls = await startPlayerMatch(req.query.address);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "Id": bls }, "Success"));

  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.endMatch = async function (req, res) {
  try {
    let {address, id, point, matchData} = req.body;

    var bls = await endPlayerMatch(address, id, point, matchData);
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));
    return res.status(200).json(helper.APIReturn(0, { "result": bls }, "Success"));

  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}

exports.getTop = async function (req, res) {
  try {
    var bls = await getTopPlayer();
    if (bls == null)
      return res.status(401).json(helper.APIReturn(101, "something wrongs"));

    return res.status(200).json(helper.APIReturn(0, { "result": bls }, "Success"));
  } catch (error) {
    return res.status(401).json(helper.APIReturn(101, "something wrongs"));
  }
}
