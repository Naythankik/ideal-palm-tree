const express = require("express");
const { dashboard, readCollection } = require("../src/controllers/adminController");
const { createSubscriber, readSubscriber } = require("../src/controllers/subscribersController");
const { readPages, createPages, readPage, deletePage, updatePage} = require("../src/controllers/pagesController");
const upload = require('../src/helper/multer')

const router = express.Router();

router.get("/dashboard", dashboard)

router.get("/pages", readPages)
router.post("/page/create", upload.fields([{ name: 'pageImage', maxCount: 1}, {name: 'pageCoverImage', maxCount: 1}]), createPages)
router.put("/page/update/:id", updatePage)
router.delete("/page/delete/:id", deletePage)
router.get("/page/read/:id", readPage)

router.get("/categories/:collection", readCollection)

router.post("/subscribers/create", createSubscriber);
router.get("/subscribers", readSubscriber)

module.exports = router;
