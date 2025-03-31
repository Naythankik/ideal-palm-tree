const express = require("express");
const { createSubscriber } = require("../src/controllers/subscribersController");
const { createPage, deletePage, updatePage } = require("../src/controllers/pagesController");
const upload = require('../src/helper/multer')
const { editACategoryDocument, deleteACategoryDocument } = require("../src/controllers/adminController");
const { deleteAComponent, updateAComponent, createAComponent } = require("../src/controllers/componentController");
const { createAnIndustry, deleteAnIndustry, updateAnIndustry } = require("../src/controllers/industriesController");
const { createAStack, deleteAStack, updateAStack } = require("../src/controllers/stacksController");
const { createAStyle, deleteAStyle, updateAStyle } = require("../src/controllers/stylesController");
const { createAType, deleteAType, updateAType } = require("../src/controllers/typesController");

const router = express.Router();

router.post("/page/create", upload.fields([{ name: 'pageImage', maxCount: 1}, {name: 'pageCoverImage', maxCount: 1}]), createPage)
router.post("/components/create", createAComponent);
router.post("/industries/create", createAnIndustry);
router.post("/stacks/create", createAStack);
router.post("/styles/create", createAStyle);
router.post("/types/create", createAType);
router.post("/subscribers/create", createSubscriber);

router.put("/page/update/:id", updatePage)
router.put("/components/update/:id", updateAComponent);
router.put("/industries/update/:id", updateAnIndustry);
router.put("/stacks/update/:id", updateAStack);
router.put("/styles/update/:id", updateAStyle);
router.put("/types/update/:id", updateAType);

router.delete("/page/delete/:id", deletePage)
router.delete('/components/delete/:id', deleteAComponent);
router.delete('/industries/delete/:id', deleteAnIndustry);
router.delete('/stacks/delete/:id', deleteAStack);
router.delete('/styles/delete/:id', deleteAStyle);
router.delete('/types/delete/:id', deleteAType);

router.put("/categories/:collection/update/:id", editACategoryDocument)
router.delete("/categories/:collection/delete/:id", deleteACategoryDocument)


module.exports = router;
