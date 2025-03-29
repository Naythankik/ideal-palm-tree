const express = require("express");
const { dashboard, readCollection, readACategoryDocument} = require("../src/controllers/adminController");
const {readSubscriber } = require("../src/controllers/subscribersController");
const { readPages, readPage, readPagesByTitle, readAPageByBrandTitle} = require("../src/controllers/pagesController");
const { readComponents, readAComponent } = require("../src/controllers/componentController");
const { readIndustries, readAnIndustry } = require("../src/controllers/industriesController");
const { readStacks, readAStack } = require("../src/controllers/stacksController");
const { readStyles, readAStyle } = require("../src/controllers/stylesController");
const { readTypes, readAType } = require("../src/controllers/typesController");

const router = express.Router();

router.get("/dashboard", dashboard)

router.get("/pages", readPages)
router.get("/pages/:componentTitle", readPagesByTitle)
router.get("/page/:componentTitle/:brandName", readAPageByBrandTitle)
router.get("/page/read/:id", readPage)

router.get('/components', readComponents)
router.get('/components/:id', readAComponent)

router.get('/industries', readIndustries)
router.get('/industries/:id', readAnIndustry)

router.get('/stacks', readStacks)
router.get('/stacks/:id', readAStack)

router.get('/styles', readStyles)
router.get('/styles/:id', readAStyle)

router.get('/types', readTypes)
router.get('/types/:id', readAType)

router.get("/categories/:collection", readCollection)

router.get("/categories/:collection/:id", readACategoryDocument)

router.get("/subscribers", readSubscriber)

module.exports = router;
