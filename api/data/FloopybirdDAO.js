const sqlite3 = require('sqlite3')
const cStoreCommand = require('./cStoreCommand');
const MigrationContext = require('./MigrationContext');
class FloopybirdDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database');
        
      }
    });
    MigrationContext.DatabaseInit(this.db);
  }
  async RunCommand(sql, parameters)
  {
    return new Promise((resolve, reject) => {
      this.db.run(sql, parameters, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    });
  }

  async AddPlayerVault(wallet_id)
  {
    let date =parseInt(new Date().getTime()/1000);
    await this.RunCommand(cStoreCommand.AddPlayerVaultCommand,{wallet_id:wallet_id,created_date:date});
  }

  async GetPlayerBalance(wallet_id)
  {
    let result = await this.RunCommand(cStoreCommand.GetPlayerBalanceCommand,{wallet_id:wallet_id});
    if(result.rows == null)
    return result.rows[0].balance;
  }

  async AddPlayerBalance(wallet_id, amount)
  {
    await this.RunCommand(cStoreCommand.AddPlayerBalanceCommand,{wallet_id:wallet_id, amount: amount});
    return await this.GetPlayerBalance(wallet_id);
  }

  async WithdrawPlayerBalance(wallet_id, amount)
  {
    await this.RunCommand(cStoreCommand.WithdrawPlayerBalanceCommand,{wallet_id:wallet_id, amount: amount});
    return await this.GetPlayerBalance(wallet_id);
  }
  async StartPlayerMatch(wallet_id, amount)
  {
    let result = await this.RunCommand(cStoreCommand.StartPlayerMatchCommand,{wallet_id:wallet_id, amount: amount});
    return result.rows[0].id;
  }
  async EndPlayerMatch(wallet_id, amount)
  {
    await this.RunCommand(cStoreCommand.EndPlayerMatchCommand,{wallet_id:wallet_id, amount: amount});
  }
}

module.exports = FloopybirdDAO;