let Database = require('../models/Database');

class User{
    id = 0;
    name = '';
    email = '';
    password = '';
    query = '';
    db = new Database.Database();

    constructor(){
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
    }

    register(){
        this.query = "INSERT INTO users (name,email,password) ";
        this.query += "VALUES ('"+this.name.replace(/'/g, "''")+"','"+this.email.replace(/'/g, "''")+"','"+this.password.replace(/'/g, "''")+"')";
        return new Promise((resolve,reject)=>{
            this.db.query(this.query,(err,result)=>{
                this.db.close();
                if(err){
                    return reject(err);
                }
                resolve(result);
            });
        }) ;
    }
    login(){
        this.query = "SELECT * FROM users WHERE email = '" + this.email.replace(/'/g, "''") + "' AND password = '" + this.password.replace(/'/g, "''") + "'"; 
        return new Promise((resolve,reject)=>{
            this.db.query(this.query, (err,result)=>{
                this.db.close();
                if(err){
                    return reject(err);
                }
                resolve(result);
            });
        }) ;
    }
}

module.exports ={
    User : User
}