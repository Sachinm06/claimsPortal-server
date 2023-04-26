const mongoose = require("mongoose")
// connection string

mongoose.connect("mongodb://localhost:27017/claimsPortal", { useNewUrlParser: true })


//model

const User = mongoose.model("employee",
    {
        empname: String,
        employeeID: Number,
        jobtitle: String,
        location: String,
        password: String,
        admin: String,
        claims: []

    }
)
module.exports = {
    User
}