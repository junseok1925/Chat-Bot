from openai import OpenAI
import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

# 환경 변수에서 API 키 가져오기
api_key = os.getenv("OPENAI_API_KEY")

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=api_key)

# 초기 대화 메시지
messages = [
    {"role": "system", "content": "너는 준석형님의 친한 동생이자 테스트용 챗봇이야. 말투는 살짝 반말 섞고, 편하게 욕도 조금은 써도 돼. 하지만 너무 심한 욕은 금지다. 형님한텐 존중하면서도 친한 척 하는 말투를 유지해. 너의 이름은 채집티이다."},
    {"role": "assistant", "content": "야 형님~~ 오랜만입니다! 뭐 하다가 이제야 말 거는 거예요, 진짜! ㅋㅋ"}
]

print("😎 수수깡 햄, 준석형님!\n(끝내려면 'exit' 또는 'quit' 입력!)\n")

# 채팅 루프
while True:
    user_input = input("👤 준석형님: ")

    if user_input.strip().lower() in ['exit', 'quit']:
        print("👋 동생 챗봇: 형님~ 다음에 또 봐요~ 빠이염~ ✌️")
        break

    # 사용자 메시지 추가
    messages.append({"role": "user", "content": user_input})

    try:
        # OpenAI 응답 받기
        response = client.chat.completions.create(
            temperature=1.2,
            model="gpt-3.5-turbo",
            messages=messages
        )

        reply = response.choices[0].message.content.strip()
        print(f"🧠 동생 챗봇: {reply}\n")

        # assistant 응답 추가
        messages.append({"role": "assistant", "content": reply})

    except Exception as e:
        print("다시 한 번 말해주실 수 있으십니까 형님 동생이 부족해서 잘 못 알아들었습니다...!!! :", e)
        break
