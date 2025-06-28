const router = require("express").Router();
const { sign_up, login } = require("../Controller/Api");
const { Sign_upValidation, LoginValidation } = require("../MiddleWare/Auth_validation");

router.post("/login", LoginValidation,login);
router.post("/signup", Sign_upValidation, sign_up);

module.exports = router;
