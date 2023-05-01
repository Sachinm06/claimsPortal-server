const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/claimsPortal", { useNewUrlParser: true })


//model

const Employee = mongoose.model("Employee",
    {
        username: String,
        employeeID: Number,
        jobtitle: String,
        location: String,
        password: String,
        admin: String,
        claims: [],
        accepted:String


    }
)
module.exports = {
    Employee
}