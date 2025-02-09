const knowledgeBaseSchema = {
  name: String,
  clients: Array,
  modelProvider: String,
  settings: Object,
  plugins: Array,
  bio: Array,
  lore: Array,
  knowledge: Array,
  messageExamples: Array,
  postExamples: Array,
  topics: Array,
  style: Object,
  adjectives: Array,
  userProfile: Object,
};

module.exports = knowledgeBaseSchema;
