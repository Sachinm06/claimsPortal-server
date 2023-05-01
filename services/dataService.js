const jwt = require("jsonwebtoken")
const db = require("./db")
const { v4: uuidv4 } = require('uuid');
const { accepts } = require("express/lib/request");



register = (empid2, uname, jobt, loc, psw2) => {
    //store the resolved output of findone in a variable user
    return db.Employee.findOne({ employeeID: empid2 }).then(user => {
        // if acno present in db then get the object of that user else null response 
        if (user) {
            return {
                status: false,
                message: "user already present",
                statusCode: 404
            }
        }
        else {
            newUser = new db.Employee({
                username: uname,
                employeeID: empid2,
                jobtitle: jobt,
                location: loc,
                password: psw2,
                admin: "Sachin",
                claims: []

            })
            newUser.save()
            return {
                status: true,
                message: "Registration successful!",
                statusCode: 200
            }
        }
    }
    )
}

login = (empid1, psw1) => {
    return db.Employee.findOne({ employeeID: empid1, password: psw1 }).then(user => {
        if (user) {
            currentUser = user.username
            currentempid1 = user.employeeID
            currentUsertitle = user.jobtitle
            currentlocation = user.location
            const token = jwt.sign({ empid1 }, "superkey1")
            return {
                status: true,
                message: "You have successfully logged in!",
                statusCode: 200,
                currentempid1, currentUser, token, currentUsertitle, currentlocation

            }
        }
        else {
            return {
                status: false,
                message: "Incorrect Employee ID or Password",
                statusCode: 404,



            }
        }
    }
    )
}


submitClaim = (empid, date, reason, amount) => {
    return db.Employee.findOne({ employeeID: empid }).then(user => {
        if (user) {
            const id = uuidv4();
            currentAdmin = user.admin

            user.claims.push({
                Date: date,
                EmployeeID: empid,
                Amount: amount,
                Reason: reason,
                id: id
            })
            user.save()
            return {
                transaction: user.claims,
                status: true,
                message: "Claim updated successfully!",
                statusCode: 200,
                currentAdmin,

            }
        }
        else {

            return {
                status: false,
                message: "user not present",
                statusCode: 404


            }

        }
    }
    )
}

viewStatus = (empid1) => {
    return db.Employee.findOne({ employeeID: empid1 }).then(user => {
        if (user) {
            return {
                status: true,
                claims: user.claims,
                statusCode: 200
            }
        }
    })
}

deleteClaim = (claimid) => {
    console.log("hey", claimid);

    return db.Employee.updateOne(
        { "claims.id": claimid },
        { $pull: { claims: { id: claimid } } }
    ).then((result) => {
        if (result) {
            return {
                status: true,
                message: "deleted",
                statusCode: 200,
            };
        } else {
            return {
                status: false,
                message: "error",
                statusCode: 404,
            };
        }
    });
};

adminLogin = () => {
    return db.Employee.find({}).then(user => {
        console.log("mnh", user);
        if (user) {

            return {
                status: true,
                user,
                statusCode: 200
            }

        }
    })
}
acceptClaim = (employeeID) => {
    return db.Employee.findOne({ employeeID }).then(user => {
        if (user) {
            user.accepted = "accepted"
            user.save()
            return {
                status: true,
                message: "Applicaton Accepted",
                statusCode: 200
            }

        }
        else {
            return {
                status: false,
                message: "Application reject",
                statusCode: 404
            }
        }
    })
}

view=(employeeID)=>{
    return db.Employee.findOne({employeeID}).then(user=>{
        if(user){
            if(user.accepted=="accepted"){
                return{
                    status:true,
                    message:"Claim accepted",
                    statusCode:200,

                }
            }
        }
    })
}



module.exports = {
    register, login, submitClaim, viewStatus, deleteClaim, adminLogin,acceptClaim,view
}