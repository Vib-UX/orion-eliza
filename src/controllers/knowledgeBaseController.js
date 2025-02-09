class KnowledgeBaseController {
  constructor() {
    this.knowledgeBases = {};
    this.baseDir = "./characters"; // Specify the base directory for storing knowledge bases
    this.loadKnowledgeBases();
  }

  loadKnowledgeBases() {
    const fs = require("fs");
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir);
    }
    const files = fs.readdirSync(this.baseDir);
    files.forEach((file) => {
      const data = fs.readFileSync(`${this.baseDir}/${file}`);
      const knowledgeBase = JSON.parse(data);
      this.knowledgeBases[knowledgeBase.name] = knowledgeBase;
    });
  }

  saveKnowledgeBase(name, knowledgeBase) {
    const fs = require("fs");
    fs.writeFileSync(
      `${this.baseDir}/${name}.json`,
      JSON.stringify(knowledgeBase, null, 2)
    );
  }

  addKnowledgeBase(req, res) {
    const {
      name,
      clients,
      modelProvider,
      settings,
      plugins,
      bio,
      lore,
      knowledge,
      messageExamples,
      postExamples,
      topics,
      style,
      adjectives,
      userProfile,
    } = req.body;
    const knowledgeBase = {
      name,
      clients,
      modelProvider,
      settings,
      plugins,
      bio,
      lore,
      knowledge,
      messageExamples,
      postExamples,
      topics,
      style,
      adjectives,
      userProfile,
    };
    this.knowledgeBases[name] = knowledgeBase;
    this.saveKnowledgeBase(name, knowledgeBase);
    res.status(201).json({ name });
  }

  queryKnowledgeBase(req, res) {
    const { name, question } = req.body;
    const knowledgeBase = this.knowledgeBases[name];

    if (!knowledgeBase) {
      return res.status(404).json({ error: "Knowledge base not found" });
    }

    const { queryOpenAI } = require("../services/openAIService");
    queryOpenAI(knowledgeBase, question)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "Error querying OpenAI", details: error });
      });
  }

  generateUniqueId() {
    return "kb_" + Math.random().toString(36).substr(2, 9);
  }
}

module.exports = KnowledgeBaseController;
