const express = require("express");
const { dashboard, readCollection, readACategoryDocument} = require("../src/controllers/adminController");
const {readSubscriber } = require("../src/controllers/subscribersController");
const { readPage, readPagesByTitle, readAPageByBrandTitle} = require("../src/controllers/pagesController");
const { readComponents, readAComponent } = require("../src/controllers/componentController");
const { readIndustries, readAnIndustry } = require("../src/controllers/industriesController");
const { readStacks, readAStack } = require("../src/controllers/stacksController");
const { readStyles, readAStyle } = require("../src/controllers/stylesController");
const { readTypes, readAType } = require("../src/controllers/typesController");

const router = express.Router();

router.get("/dashboard", dashboard)

router.get("/pages", readPagesByTitle)
router.get('/components', readComponents)
router.get('/industries', readIndustries)
router.get('/stacks', readStacks)
router.get('/styles', readStyles)
router.get('/types', readTypes)
router.get("/subscribers", readSubscriber)

router.get("/page/:id", readPage)
router.get('/components/:id', readAComponent)
router.get('/industries/:id', readAnIndustry)
router.get('/stacks/:id', readAStack)
router.get('/styles/:id', readAStyle)
router.get('/types/:id', readAType)
router.get("/categories/:collection", readCollection)

router.get("/page/:componentTitle/:brandName", readAPageByBrandTitle)
router.get("/categories/:collection/:id", readACategoryDocument)

module.exports = router;
