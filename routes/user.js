const express = require("express");
const { dashboard, readCollection, readACategoryDocument} = require("../src/controllers/adminController");
const {readSubscriber } = require("../src/controllers/subscribersController");
const { readPages, readPage} = require("../src/controllers/pagesController");

const router = express.Router();

router.get("/dashboard", dashboard)

router.get("/pages", readPages)
router.get("/page/read/:id", readPage)

router.get("/categories/:collection", readCollection)

router.get("/categories/:collection/:id", readACategoryDocument)

router.get("/subscribers", readSubscriber)

module.exports = router;
