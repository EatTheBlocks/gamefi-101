class cStoreCommand{
    constructor(){

    }
    AddPlayerVaultCommand = 
    `INSERT INTO floopybird.tbl_player_vault(wallet_id, created_date)
    VALUES($wallet_id, $created_date)`;

    GetPlayerBalanceCommand = `SELECT * FROM floopybird.tbl_player_vault WHERE wallet_id = $wallet_id AND STATUS = 1`;

    AddPlayerBalanceCommand = 
    `UPDATE floopybird.tbl_player_vault SET balance = balance + $amount
    WHERE wallet_id = $wallet_id AND $amount > 0`;

    WithdrawPlayerBalanceCommand =
    `UPDATE floopybird.tbl_player_vault SET balance = balance - $amount
    WHERE wallet_id = $wallet_id AND balance > $amount AND $amount > 0`;

    StartPlayerMatchCommand = 
    `INSERT INTO floopybird.tbl_player_match(wallet_id, start_time)
    VALUES($wallet_id, $start_time)
    returning id`;

    EndPlayerMatchCommand = 
    `UPDATE floopybird.tbl_player_match 
    SET end_time =$end_time, play_data=$play_data, player_point=$player_point
    WHERE wallet_id = $wallet_id AND id = $id`;
}

exports.cStoreCommand = new cStoreCommand();