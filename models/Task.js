let Database = require('../models/Database');

class Task {
    id = 0;
    userid = '';
    tdate = '';
    ttime = '';
    task = '';
    status = '';
    query = '';
    db = new Database.Database();

    constructor() {
        this.id = 0;
        this.userid = 0;
        this.tdate = '';
        this.ttime = '';
        this.status = '';
        this.task = '';
    }

    save = () => {
        if (this.id == 0) {
            this.query = "INSERT INTO tasks (userid, tdate, ttime,task,status) ";
            this.query += "VALUES (" + this.userid + ",'" + this.tdate + "','" + this.ttime + "','" + this.task + "','open')";
        }
        else {
            this.query = "UPDATE tasks SET userid= '" + this.userid + "', tdate='" + this.tdate + "', ttime='" + this.ttime + "',task='" + this.task + "' WHERE id= " + this.id;
        }
        console.log(this.query);

        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
        // var result = this.db.query(this.query);
        // console.log(result);
    }
    delete = () => {

        this.query = "DELETE FROM tasks WHERE id=" + this.id;

        console.log(this.query);

        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
        
    }
    change = () => {

        this.query = "UPDATE tasks SET status = 'Closed' WHERE id=" + this.id;

        console.log(this.query);

        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
        
    }
    gettask = () => {

        this.query = "SELECT * FROM tasks WHERE id=" + this.id;

        console.log(this.query);
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
        
    }
    listtask = () => {

        this.query = "SELECT * FROM tasks WHERE userid=" + this.userid;

        console.log(this.query);

        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                this.db.close();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
        
    }
}

module.exports = {
    Task: Task
}