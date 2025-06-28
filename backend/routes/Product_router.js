const Authenticator = require("../MiddleWare/Authenticator");

const router = require("express").Router();


router.get("/", Authenticator,(req, res) => {
    console.log("✅ Root route hit", req.user);
    
    res.send("Hello World");
});

module.exports = router;