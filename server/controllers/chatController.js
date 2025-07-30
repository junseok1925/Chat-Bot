const openai = require("../config/openai");

const chatWithOpenAI = async (req, res) => {
  const { message } = req.body;

  //유효성 검사: 보내는 message가 없거나 문자열이 아니면 에러 응답
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "보내는 message의 파라미터가 올바르지 않음." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
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
