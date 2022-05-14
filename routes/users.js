var express = require('express');
var router = express.Router();
const users = require("../controller/usercontroller");
const SuperAdmin = require("../middleware/superAdmin");
const auth = require("../middleware/auth")


/* GET users listing. */
router.post("/member", users.MemberRegister);
router.post("/admin", SuperAdmin, users.AdminRegister);
router.post("/login", users.login);
router.get("/currentuser", auth, users.currentUser);
router.get("/allUser", users.getAllUser);

module.exports = router;
