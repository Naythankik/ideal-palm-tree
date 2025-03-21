const express = require("express");
const { createSubscriber } = require("../src/controllers/subscribersController");
const { createPage, deletePage, updatePage} = require("../src/controllers/pagesController");
const upload = require('../src/helper/multer')

const router = express.Router();

router.post("/page/create", upload.fields([{ name: 'pageImage', maxCount: 1}, {name: 'pageCoverImage', maxCount: 1}]), createPage)
router.put("/page/update/:id", updatePage)
router.delete("/page/delete/:id", deletePage)
router.post("/subscribers/create", createSubscriber);

module.exports = router;
