const sqlite3 = require('sqlite3');
const StoreCommand = require('./cStoreCommand');
const cStoreCommand = new StoreCommand.cStoreCommand();
class FloopybirdDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database');
      }
    });
  }
  async RunCommand(sql, parameters)
  {
    console.log(sql);
    return new Promise((resolve, reject) => {
      this.db.all(sql, parameters, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          console.log(result);
          resolve(result)
        }
      })
    });
  }


  async AddPlayerVault(wallet_id)
  {
    let date =parseInt(new Date().getTime()/1000);
    await this.RunCommand(cStoreCommand.AddPlayerVaultCommand,{$wallet_id:wallet_id,$created_date:date});
  }

  async GetPlayerBalance(wallet_id)
  {
    let result = await this.RunCommand(cStoreCommand.GetPlayerBalanceCommand,{$wallet_id:wallet_id});
    if(result == null || result.length == 0)
      return null;
    return result[0].balance;
  }

  async GetTopPlayer(row_count = 10)
  {
    let result = await this.RunCommand(cStoreCommand.GetTopPlayerCommand,{$row_count:row_count});
    
    if(result == null)
      return null;

    let matchs = await result.map((e) => ({
      wallet_id: e.wallet_id,
      point: e.player_point,
      start_time:e.start_time,
      end_time:e.end_time
    }));
    return matchs;
  }

  async AddPlayerBalanceTransaction(wallet_id, transaction_type, amount, transaction_date, transaction_id)
  {
    let result = await this.RunCommand(cStoreCommand.AddPlayerBalanceTransactionCommand,{
      $wallet_id: wallet_id, 
      $transaction_type: transaction_type,
       $amount: amount, 
       $transaction_date: transaction_date,
       $transaction_id: transaction_id
    });
    if(result == null || result.length == 0)
      return null;
    return result[0].id;
  }

  async AddPlayerBalance(wallet_id, amount, transaction_id = null)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.AddPlayerBalanceCommand,{$wallet_id:wallet_id, $amount: amount});
    if(result == null || result.length == 0)
      return null;
    await this.AddPlayerBalanceTransaction(wallet_id, 1, amount, date, transaction_id);

    return result[0].balance;
  }

  async UpdateTransaction(id, transid)
  {
    await this.RunCommand(cStoreCommand.UpdateTransactionCommand,{$id:id, $transid: transid});
  }

  async WithdrawPlayerBalance(wallet_id, amount)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.WithdrawPlayerBalanceCommand,{$wallet_id:wallet_id, $amount: amount});
    if(result == null || result.length == 0)
      return null;
    let tx =  await this.AddPlayerBalanceTransaction(wallet_id, 2, amount, date, null);
    return {amount:amount, transid:tx};
  }

  async StartPlayerMatch(wallet_id)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.StartPlayerMatchCommand,{$wallet_id:wallet_id, $start_time: date});
    return result[0].id;
  }

  async EndPlayerMatch(wallet_id, id, player_point, play_data)
  {
    let date = parseInt(new Date().getTime()/1000);
    let data = {
      $wallet_id: wallet_id,
      $id: id,  
      $player_point: player_point,
      $play_data: JSON.stringify( play_data),
      $end_time: date
      };
    console.log(data);
    
    let result = await this.RunCommand(cStoreCommand.EndPlayerMatchCommand, data);
        if(result == null || result.length == 0)
        return null;
      return result[0].id;
  }
}

module.exports = FloopybirdDAO;