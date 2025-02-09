const express = require("express");
const KnowledgeBaseController = require("../controllers/knowledgeBaseController");

const router = express.Router();
const knowledgeBaseController = new KnowledgeBaseController();

router.post("/add", (req, res) => {
  knowledgeBaseController.addKnowledgeBase(req, res);
});

router.post("/query", (req, res) => {
  knowledgeBaseController.queryKnowledgeBase(req, res);
});

module.exports = router;
