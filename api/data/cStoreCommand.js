class cStoreCommand{
    constructor(){
        this.AddPlayerVaultCommand = 
        `INSERT INTO tbl_player_vault(wallet_id, created_date)
        VALUES($wallet_id, $created_date) RETURNING *`;
    
        this.GetPlayerBalanceCommand = `SELECT * FROM tbl_player_vault WHERE wallet_id = $wallet_id AND STATUS = 1`;
    
        this.AddPlayerBalanceCommand = 
        `UPDATE tbl_player_vault SET balance = balance + $amount
        WHERE wallet_id = $wallet_id AND $amount > 0 RETURNING balance`;
    
        this.WithdrawPlayerBalanceCommand =
        `UPDATE tbl_player_vault SET balance = balance - $amount
        WHERE wallet_id = $wallet_id AND balance >= $amount AND $amount > 0 RETURNING balance;`;
    
        this.StartPlayerMatchCommand = 
        `INSERT INTO tbl_player_match(wallet_id, start_time)
        VALUES($wallet_id, $start_time)
        returning id`;
    
        this.EndPlayerMatchCommand = 
        `UPDATE tbl_player_match 
        SET end_time =$end_time, play_data=$play_data, player_point=$player_point
        WHERE wallet_id = $wallet_id AND id = $id returning id`;
        this.AddPlayerBalanceTransactionCommand = 
        `INSERT INTO tbl_vault_transaction (wallet_id, transaction_type, amount, transaction_date,transaction_id)
        VALUES($wallet_id, $transaction_type, $amount, $transaction_date,$transaction_id) returning id`;
    }
}

exports.cStoreCommand = cStoreCommand;