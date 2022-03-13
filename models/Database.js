let mysql = require('mysql');

class Database {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "to_do_list"
        });
    }

    query(sql,arg) {
        return new Promise((resolve, reject) => {
            // console.log('sql result ' + sql);
            this.con.query(sql,arg,(err, result) =>{
                if(err){
                    return reject(err);
                }
                // console.log(result)
                resolve(result);
            });
        });
    }
    close(){
        return new Promise((resolve,reject)=>{
            this.con.end((err)=>{
                if(err){
                    reject(err);
                }
                resolve('success');
            })
        });
    };
}
module.exports = {
    Database: Database
}