var express = require('express');
var router = express.Router();
const car = require("../controller/carcontroller");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/allcar",auth,car.getCarAvailable);
router.post("/create", admin, car.createcar);
router.put("/delete/:id", admin, car.deleteCar);
router.put("/update/:id", admin, car.updateCar);

module.exports = router;