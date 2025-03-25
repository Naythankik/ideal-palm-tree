const express = require("express");
const { createSubscriber } = require("../src/controllers/subscribersController");
const { createPage, deletePage, updatePage } = require("../src/controllers/pagesController");
const upload = require('../src/helper/multer')
const { editACategoryDocument, deleteACategoryDocument } = require("../src/controllers/adminController");
const { deleteAComponent, updateAComponent, createAComponent } = require("../src/controllers/componentController");
const { createAnIndustry, deleteAnIndustry, updateAnIndustry } = require("../src/controllers/industriesController");

const router = express.Router();

router.post("/page/create", upload.fields([{ name: 'pageImage', maxCount: 1}, {name: 'pageCoverImage', maxCount: 1}]), createPage)
router.put("/page/update/:id", updatePage)
router.delete("/page/delete/:id", deletePage)

router.post("/components/create", createAComponent);
router.delete('/components/delete/:id', deleteAComponent);
router.put("/components/update/:id", updateAComponent);

router.post("/industries/create", createAnIndustry);
router.delete('/industries/delete/:id', deleteAnIndustry);
router.put("/industries/update/:id", updateAnIndustry);

router.put("/categories/:collection/update/:id", editACategoryDocument)
router.delete("/categories/:collection/delete/:id", deleteACategoryDocument)

router.post("/subscribers/create", createSubscriber);

module.exports = router;
