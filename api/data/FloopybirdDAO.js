const sqlite3 = require('sqlite3');
const StoreCommand = require('./cStoreCommand');
const MigrationContext = require('./MigrationContext');
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
    try{
      MigrationContext.DatabaseInit(this.db);
    }catch(err)
    {
      console.log(err);
    }
    
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

  async WithdrawPlayerBalance(wallet_id, amount)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.WithdrawPlayerBalanceCommand,{$wallet_id:wallet_id, $amount: amount});
    if(result == null || result.length == 0)
      return null;
    await this.AddPlayerBalanceTransaction(wallet_id, 1, amount, date, null);

    return amount;
  }

  async StartPlayerMatch(wallet_id)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.StartPlayerMatchCommand,{$wallet_id:wallet_id, $start_time: date});
    return result[0].id;
  }

  async EndPlayerMatch(wallet_id, id, play_data,player_point)
  {
    let date = parseInt(new Date().getTime()/1000);
    let result = await this.RunCommand(cStoreCommand.EndPlayerMatchCommand,{
        $wallet_id: wallet_id,
        $id: id,  
        $player_point: player_point,
        $play_data: play_data,
        $end_time: date
        });
        if(result == null || result.length == 0)
        return null;
      return result[0].id;
  }
}

module.exports = FloopybirdDAO;