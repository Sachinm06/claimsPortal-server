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


//view status

app.post("/viewStatus", (req, res) => {
    ds.view(req.body.empid).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//delete claim

app.post("/deleteClaim", (req, res) => {

    ds.deleteClaim(req.body.claimid).then(result => {
        res.status(result.statusCode).json(result)

    })
})

//admin console


app.get("/adminLogin", (req, res) => {
    ds.adminLogin().then(result => {
        console.log("hy",result);
        res.status(result.statusCode).json(result);
    });
});

//accept claim

app.post("/accept", (req, res) => {

    ds.accept(req.body.userN).then(result => {
        res.status(result.statusCode).json(result)

    })
})


// app.post("/view", (req, res) => {

//     ds.view(req.body.employeeID).then(result => {
//         res.status(result.statusCode).json(result)

//     })
// })

app.listen(3001, () => {
    console.log("server started at 3001");
})