const fs = require("fs");
const path = require("path");

const loadKnowledge = () => {
  const baseDir = path.join(__dirname);

  const categories = fs.readdirSync(baseDir).filter((item) => fs.statSync(path.join(baseDir, item)).isDirectory());

  const knowledgeData = {};

  categories.forEach((category) => {
    const categoryPath = path.join(baseDir, category);
    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));

    knowledgeData[category] = files.map((file) => {
      const content = fs.readFileSync(path.join(categoryPath, file), "utf-8");
      return { filename: file, content };
    });
  });

  return knowledgeData;
};

module.exports = { loadKnowledge };
