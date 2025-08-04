const fs = require("fs");
const path = require("path");
const db = require("../config/configDB"); // MySQL DB 연결 설정

const ROOT_DIR = path.join(__dirname, "../data");

async function importMarkdownToMySQL() {
  const folders = fs.readdirSync(ROOT_DIR);

  for (const folder of folders) {
    const folderPath = path.join(ROOT_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const title = file.replace(/\.md$/, "");

      try {
        // 기존 title이 있는 데이터 삭제
        await db.execute(`DELETE FROM chatBotData WHERE category = ? AND title = ?`, [folder, title]);

        // 새로운 데이터 삽입
        await db.execute(
          `INSERT INTO chatBotData (category, title, content)
           VALUES (?, ?, ?)`,
          [folder, title, content]
        );

        console.log(`db import completed (갱신됨): [${folder}] ${title}`);
      } catch (err) {
        console.error(`db import failed: ${title}`, err);
      }
    }
  }

  console.log("All .md files DB import completed.");
}

importMarkdownToMySQL();
