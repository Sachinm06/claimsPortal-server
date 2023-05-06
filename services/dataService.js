const jwt = require("jsonwebtoken")
const db = require("./db")
const { v4: uuidv4 } = require('uuid');
const { accepts } = require("express/lib/request");
const { status } = require("express/lib/response");



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
                id: id,
                // accepted:String

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
                message: "user not found",
                statusCode: 404


            }

        }
    }
    )
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
// accept = (userN) => {
//     return db.Employee.findOne({ username: userN }).then(user => {
//         if (user) {
//             user.accepted = "accepted"
//             user.save()
//             return {
//                 status: true,
//                 message: "Applicaton Accepted",
//                 statusCode: 200
//             }

//         }
//         else {
//             return {
//                 status: false,
//                 message: "Error",
//                 statusCode: 404
//             }
//         }
//     })
// }
accept = (userN) => {
    return db.Employee.findOne({ username: userN }).then(user => {
  
  
      if (user) {
        user.accepted = "accepted"
        user.save()
        return {
  
          status: true,
          message: "application accepted",
          statusCode: 200
  
  
  
  
        }
      }
      else {
        return {
  
          status: false,
          message: "application reject",
          statusCode: 404
  
  
  
  
        }
      }
  
  
    })
  }
// accept = (userN) => {
//     return db.Employee.findOne({ username: userN }).then(user => {
//         if (user) {
//             const claims = user.claims || []
//             claims.push({ accepted: "accepted" })
//             user.claims = claims
//             user.save()
//             return {
//                 status: true,
//                 message: "Application Accepted",
//                 statusCode: 200
//             }
//         } else {
//             return {
//                 status: false,
//                 message: "Error",
//                 statusCode: 404
//             }
//         }
//     })
// }



// view = (empid) => {
//     return db.Employee.findOne({ employeeID: empid }).then(user => {
//         if (user) {
//             if (user.accepted == "accepted") {
//                 return {
//                     status: true,
//                     message: "accepted",
//                     claims: user.claims,
//                     statusCode: 200
//                 }
//             }
//             else {
//                 return {
//                     status: false,
//                     message: "Pending",
//                     statusCode: 404
//                 }
//             }

//         }
//     })
// }

view = (empid) => {

    return db.Employee.findOne({ employeeID: empid }).then(user => {
        if (user) {
            if (user.accepted == "accepted") {
                return {
                    status: true,
                    message: "Accepted ",
                    statusCode: 200

                }
            }
            else if (user.accepted == "Rejected") {

                return {
                    status: true,
                    message: "Rejected",
                    statusCode: 200

                }
            }
            else {
                return {
                    status: true,
                    message: "",
                    statusCode: 200
                }
            }
        }
    })


}

// view = (empid) => {
//     return db.Employee.findOne({ employeeID: empid }).then(user => {
//         if (user) {
//             const claims = user.claims || []
//             const acceptedClaims = claims.filter(res => res.accepted === "accepted")
//             if (acceptedClaims.length > 0) {
//                 return {
//                     status: true,
//                     message: "Accepted",
//                     claims: acceptedClaims,
//                     statusCode: 200
//                 }
//             } else {
//                 return {
//                     status: false,
//                     message: "Pending",
//                     statusCode: 404
//                 }
//             }
//         } else {
//             return {
//                 status: false,
//                 message: "Employee not found",
//                 statusCode: 404
//             }
//         }
//     })
// }




module.exports = {
    register, login, submitClaim, deleteClaim, adminLogin, accept, view
}