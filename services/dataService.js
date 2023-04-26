const jwt = require("jsonwebtoken")
const db = require("./db")


register = (empid2, uname, jobt, loc, psw2) => {
    //store the resolved output of findone in a variable user
    return db.User.findOne({ empid2 }).then(user => {
        // if acno present in db then get the object of that user else null response 
        if (user) {
            return {
                status: false,
                message: "user already present",
                statusCode: 404
            }
        }
        else {
            newUser = new db.User({
                empname: uname,
                employeeID: empid2,
                jobtitle:jobt,
                location:loc,
                password: psw2,
                admin: "Sachin",
                claims: []

            })
            newUser.save()
            return {
                status: true,
                message: "registered",
                statusCode: 200
            }
        }
    }
    )
}

module.exports = {
    register
  }