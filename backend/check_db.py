import psycopg2

#PostgreSQL 연결 정보
DATABASE_URL = "postgresql://postgres:1111@172.30.16.52:5432/petcare"

try:
    #PostgreSQL에 연결
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # 현재 DB 이름 확인
    cur.execute("SELECT current_database();")
    db_name = cur.fetchone()[0]

    print(f"PostgreSQL 연결 성공! 현재 DB: {db_name}")

    cur.close()
    conn.close()
except Exception as e:
    print(f"PostgreSQL 연결 실패: {e}")
