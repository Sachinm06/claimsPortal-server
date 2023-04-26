const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const ds = require("./services/dataService")

const app = express()

app.use(cors({ origin: 'http://localhost:4200' }))

app.use(express.json())

const jwtMiddleware = (req, res, next) => {
    // access data from reqquest body
    try {
        const token = req.headers['access_token']

        //verify the token with secret key

        const data = jwt.verify(token, "superkey1")
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 404
        })
    }
}

//employee register

app.post("/register", (req, res) => {

    ds.register(req.body.empid2, req.body.uname, req.body.jobt, req.body.loc, req.body.psw2).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//employee login

app.post("/login", (req, res) => {

    ds.login(req.body.empid1, req.body.psw1).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//submit claim

app.post("/empForm", (req, res) => {

    ds.submitClaim(req.body.empid, req.body.date, req.body.reason, req.body.amount).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//admin login-console

app.post("/adminLogin", (req, res) => {

    ds.adminLogin(req.body.studentid).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.listen(3000, () => {
    console.log("server started at 3000");
})