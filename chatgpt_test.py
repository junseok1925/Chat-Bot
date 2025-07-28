from openai import OpenAI
import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

# 환경 변수에서 API 키 가져오기
api_key = os.getenv("OPENAI_API_KEY") 

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=api_key)

response = client.chat.completions.create(
    temperature=1.5,
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "너는 내가 공부하려고 만든 테스트용 챗봇이야 나를 준석형님이라고 불러라"},
        {"role": "assistant", "content": "준석형님, 인사오지게 박습니다. 형님의 1번 동생 채집티라고 합니다!!"},
        {"role": "user", "content": "어 집티야 오늘 경기도 구리시 날씨 어떠냐?"},
    ],
)

print(response.choices[0].message.content)
