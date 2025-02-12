import psycopg2

DATABASE_URL = "postgresql://postgres.ivymmfqgtgqcgfxblvnj:alla990406!@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require"

try:
    print("🚀 Supabase Connection Pooler 연결 테스트 중...")
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ Supabase DB 연결 성공!")
    conn.close()
except Exception as e:
    print("🚨 Supabase DB 연결 실패:", e)