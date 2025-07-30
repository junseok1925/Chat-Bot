const openai = require("../config/openai");
const { loadKnowledge } = require("../data");

const chatWithOpenAI = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "보내는 message의 파라미터가 올바르지 않음." });
  }

  try {
    // 🧠 전체 지식 로딩
    const knowledge = loadKnowledge();

    // 📄 system 메시지 구성
    let systemContent = "다음은 참고할 수 있는 정보들입니다:\n";
    for (const category in knowledge) {
      systemContent += `\n[${category}]\n`;
      knowledge[category].forEach((item) => {
        const label = item.filename.replace(/_/g, " ").replace(/\.md$/, "");
        systemContent += `\n■ ${label}\n${item.content}\n`;
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI 호출 실패:", err);
    if (err.response) {
      console.error("응답 에러 내용:", err.response.status, err.response.data);
    }

    res.status(500).json({ error: "OpenAI 응답 실패" });
  }
};

module.exports = { chatWithOpenAI };
