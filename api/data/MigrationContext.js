const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:');
function DatabaseInit(db) {
    db.serialize(() => {
        let tbl_player_vault_ddl = 
        `CREATE TABLE IF NOT EXISTS tbl_player_vault (
            wallet_id TEXT PRIMARY KEY,
            balance REAL DEFAULT 0,
            created_date INTEGER,
            update_date INTEGER,
            status INTEGER DEFAULT 1
        );`
    
        let tbl_vault_transaction =
        `CREATE TABLE IF NOT EXISTS tbl_vault_transaction (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wallet_id TEXT,
            transaction_type integer,
            amount REAL DEFAULT 0,
            transaction_date INTEGER,
            status INTEGER,
            transaction_id TEXT
        );`
    
        let tbl_player_match =
        `CREATE TABLE IF NOT EXISTS tbl_player_match (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wallet_id TEXT,
            start_time INTEGER,
            end_time INTEGER,
            play_data TEXT,
            player_point INTEGER DEFAULT 0,
            status INTEGER
        );`
    
        db.run(tbl_player_vault_ddl);
    
        db.run(tbl_vault_transaction);
    
        db.run(tbl_player_match);
        /*
        const stmt = db.prepare("INSERT INTO tbl_player_vault VALUES (?)");
        for (let i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();
        /*
        db.each("SELECT rowid AS id, info FROM floopybird.tbl_player_vault", (err, row) => {
            console.log(row.id + ": " + row.info);
        });
        */
    });
}
module.exports.DatabaseInit = DatabaseInit;

