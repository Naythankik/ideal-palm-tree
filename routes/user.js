const express = require("express");
const { dashboard, readCollection, readACategoryDocument} = require("../src/controllers/adminController");
const {readSubscriber } = require("../src/controllers/subscribersController");
const { readPages, readPage} = require("../src/controllers/pagesController");
const {readComponents, readAComponent} = require("../src/controllers/componentController");
const {readIndustries, readAnIndustry} = require("../src/controllers/industriesController");

const router = express.Router();

router.get("/dashboard", dashboard)

router.get("/pages", readPages)
router.get("/page/read/:id", readPage)

router.get('/components', readComponents)
router.get('/components/:id', readAComponent)

router.get('/industries', readIndustries)
router.get('/industries/:id', readAnIndustry)

router.get("/categories/:collection", readCollection)

router.get("/categories/:collection/:id", readACategoryDocument)

router.get("/subscribers", readSubscriber)

module.exports = router;
