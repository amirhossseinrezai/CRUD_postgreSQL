const client = require("../model/db");
const winston = require("winston");


const callBackError = (err, result)=>{
    if (err) {
        winston.log("error", ""+new Error(err));
    }else{
         console.log(result.rows);
    }
    client.end();
}
const getUsers = (req, res)=>{
    client.query("SELECT * FROM person LIMIT 10",callBackError);
}

const getUserById = (req, res)=>{
    const id = req.params.id;
    client.query(`SELECT * FROM person WHERE id=${id}`, callBackError);
};
const addUser = (req, res)=>{
    const { name, lname, email, gender, dob } = req.body;
    client.query(`SELECT s FROM person s WHERE s.email='${email}'`, (err, result)=>{
        if(result.rows.length != 0) {
            res.send("Email already exist!");
        }
        client.query(`INSERT INTO person (first_name, last_name, email, gender, date_of_birth)
            VALUES('${name}', '${lname}', '${email}', '${gender}', '${dob}')`,(error, result)=>{
                if(error) res.send(""+new Error(error));
                res.status(200).send("User successfuly registered!!");
            });
    });
};
const updateUser = (req, res)=>{
    const id = parseInt(req.params.id);
    const {fname, lname} = req.body;
    client.query(`SELECT * FROM person WHERE id='${id}'`, (err, result)=>{
        if(err) res.status(400).send("Invalid Id ...");
        client.query(`UPDATE person SET first_name='${fname}', last_name='${lname}' WHERE id='${id}'`, (error, result)=>{
            if(error) res.status(400).send("Invalid inputs..."+new Error(error));
            res.send("User Info Updated successfuly");
        });
    })
};
const deleteUser = (req, res)=>{
    const id = req.params.id;
    client.query(`SELECT * FROM person WHERE id='${id}'`, (err, result)=>{
        if(err) res.status(400).send("Invalid Id ...");
        client.query(`DELETE FROM person WHERE id='${id}'`, (error, result)=>{
            if(error) res.status(400).send("Invalid request...");
            res.send("User successfuly deleted..");
        })
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}