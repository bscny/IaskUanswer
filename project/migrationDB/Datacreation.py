import random
from datetime import datetime, timedelta

# 隨機生成使用者名稱
def generate_name():
    first_names = ["Alice", "Bob", "Charlie", "David", "Emma", "Fiona", "George", "Hannah", "Ivy", "Jack"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"]
    return f"{random.choice(first_names)} {random.choice(last_names)}"

# 隨機生成 Email
def generate_email(name):
    domains = ["example.com", "testmail.com", "demo.org", "sample.net"]
    return f"{name.replace(' ', '.').lower()}@{random.choice(domains)}"

# 隨機生成日期
def generate_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)

# 生成測試資料
def generate_test_data():
    users = []
    folders = []
    quizzes = []
    quiz_records = []
    fill_blank_questions = []
    single_open_questions = []
    tf_questions = []
    fb_determinations = []
    so_determinations = []
    tf_determinations = []

    # 生成 User 資料
    for user_id in range(1, 51):
        name = generate_name()
        email = generate_email(name)
        password = f"password{user_id}"
        users.append(f"({user_id}, '{name}', '{email}', '{password}')")

    # 生成 Folder 資料
    for folder_id in range(1, 16):
        folder_name = f"Folder_{folder_id}"
        user_id = random.randint(1, 50)
        parent_folder_id = "NULL" if random.random() < 0.3 else random.randint(1, folder_id)
        folders.append(f"({folder_id}, '{folder_name}', {user_id}, {parent_folder_id})")

    # 生成 Quiz 資料
    for quiz_id in range(1, 21):
        quiz_name = f"Quiz_{quiz_id}"
        is_public = random.choice([0, 1])
        folder_id = random.randint(1, 15)
        quizzes.append(f"({quiz_id}, '{quiz_name}', {is_public}, {folder_id})")

    # 生成 Quiz_record 資料
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 12, 1)
    for record_id in range(1, 51):
        total_points = random.randint(50, 100)
        date = generate_date(start_date, end_date).strftime('%Y-%m-%d')
        user_id = random.randint(1, 50)
        quiz_id = random.randint(1, 20)
        quiz_records.append(f"({record_id}, {total_points}, '{date}', {user_id}, {quiz_id})")

    # 生成題目資料
    for fb_id in range(1, 21):
        body = f"Fill in the blank question {fb_id}"
        q_number = random.randint(1, 10)
        answer = f"Answer_{fb_id}"
        points = random.randint(5, 20)
        quiz_id = random.randint(1, 20)
        fill_blank_questions.append(f"({fb_id}, '{body}', {q_number}, '{answer}', {points}, {quiz_id})")

    for so_id in range(1, 21):
        body = f"Single open question {so_id}"
        q_number = random.randint(1, 10)
        points = random.randint(5, 20)
        answer = f"Option_{random.randint(1, 3)}"
        optionA, optionB, optionC = "Option_1", "Option_2", "Option_3"
        quiz_id = random.randint(1, 20)
        single_open_questions.append(f"({so_id}, {q_number}, '{body}', {points}, '{answer}', '{optionA}', '{optionB}', '{optionC}', {quiz_id})")

    for tf_id in range(1, 21):
        body = f"True or False question {tf_id}"
        answer = random.choice(['True', 'False'])
        points = random.randint(5, 20)
        q_number = random.randint(1, 10)
        quiz_id = random.randint(1, 20)
        tf_questions.append(f"({tf_id}, '{body}', '{answer}', {points}, {q_number}, {quiz_id})")

    # 生成判斷資料
    for fb_id in range(1, 21):
        record_id = random.randint(1, 50)
        is_correct = random.choice([0, 1])
        fb_determinations.append(f"({fb_id}, {record_id}, {is_correct})")

    for so_id in range(1, 21):
        record_id = random.randint(1, 50)
        is_correct = random.choice([0, 1])
        so_determinations.append(f"({so_id}, {record_id}, {is_correct})")

    for tf_id in range(1, 21):
        record_id = random.randint(1, 50)
        is_correct = random.choice([0, 1])
        tf_determinations.append(f"({tf_id}, {record_id}, {is_correct})")

    # 輸出 SQL 語句
    print("INSERT INTO User (User_id, name, email, password) VALUES")
    print(",\n".join(users) + ";")
    print("\nINSERT INTO Folder (Folder_id, Folder_name, User_id, parent_folder_id) VALUES")
    print(",\n".join(folders) + ";")
    print("\nINSERT INTO Quiz (Quiz_id, Quiz_name, is_public, Folder_id) VALUES")
    print(",\n".join(quizzes) + ";")
    print("\nINSERT INTO Quiz_record (record_id, total_points, date, User_id, Quiz_id) VALUES")
    print(",\n".join(quiz_records) + ";")
    print("\nINSERT INTO Fill_blank_question (fb_id, body, q_number, answer, points, Quiz_id) VALUES")
    print(",\n".join(fill_blank_questions) + ";")
    print("\nINSERT INTO Single_open_question (so_id, q_number, body, points, answer, optionA, optionB, optionC, Quiz_id) VALUES")
    print(",\n".join(single_open_questions) + ";")
    print("\nINSERT INTO TF_question (tf_id, body, answer, points, q_number, Quiz_id) VALUES")
    print(",\n".join(tf_questions) + ";")
    print("\nINSERT INTO fb_quiz_determination (fb_id, record_id, is_correct) VALUES")
    print(",\n".join(fb_determinations) + ";")
    print("\nINSERT INTO so_quiz_determination (so_id, record_id, is_correct) VALUES")
    print(",\n".join(so_determinations) + ";")
    print("\nINSERT INTO TF_quiz_determination (tf_id, record_id, is_correct) VALUES")
    print(",\n".join(tf_determinations) + ";")

# 執行生成測試資料
generate_test_data()
