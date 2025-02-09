const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knowledgeBaseRoutes = require("./routes/knowledgeBaseRoutes");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/knowledge-base", knowledgeBaseRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
