import mysql.connector
import random
import faker

# 使用 faker 庫生成隨機資料
fake = faker.Faker()

# 連接到 MySQL 資料庫
conn = mysql.connector.connect(
    host="localhost",       # 資料庫主機
    user="root",            # 資料庫用戶名
    password="password",    # 資料庫密碼
    database="kataohoot"    # 使用的資料庫名稱
)

cursor = conn.cursor()

# 隨機生成 User 資料
def generate_users():
    users = []
    for _ in range(10):
        name = fake.name()
        email = fake.email()
        password = fake.password()
        users.append((name, email, password))
    return users

# 隨機生成 Friendship 資料
def generate_friendships():
    friendships = []
    for _ in range(10):
        user1_id = random.randint(1, 10)
        user2_id = random.randint(1, 10)
        while user1_id == user2_id:
            user2_id = random.randint(1, 10)
        friendships.append((user1_id, user2_id))
    return friendships

# 隨機生成 Folder 資料
def generate_folders():
    folders = []
    for i in range(1, 11):
        folder_name = fake.word()
        user_id = random.randint(1, 10)
        parent_folder_id = random.choice([None, random.randint(1, 10)])
        folders.append((folder_name, user_id, parent_folder_id))
    return folders

# 隨機生成 Quiz 資料
def generate_quizzes():
    quizzes = []
    for i in range(1, 11):
        quiz_name = fake.sentence()
        is_public = random.choice([True, False])
        folder_id = random.randint(1, 10)
        quiz_description = fake.text(max_nb_chars=150)
        quizzes.append((quiz_name, is_public, folder_id, quiz_description))
    return quizzes

# 隨機生成 Quiz_record 資料
def generate_quiz_records():
    quiz_records = []
    for i in range(1, 11):
        total_points = random.randint(50, 100)
        user_id = random.randint(1, 10)
        quiz_id = random.randint(1, 10)
        quiz_records.append((total_points, user_id, quiz_id))
    return quiz_records

# 隨機生成題目資料
def generate_questions(quiz_id):
    fill_blank_questions = []
    single_open_questions = []
    tf_questions = []

    for i in range(1, 6):
        fb_body = fake.sentence()
        fb_answer = fake.word()
        fb_points = random.randint(5, 10)
        fill_blank_questions.append((fb_body, i, fb_answer, fb_points, quiz_id))

        so_body = fake.sentence()
        so_answer = fake.word()
        so_points = random.randint(5, 10)
        options = [fake.word() for _ in range(3)]
        single_open_questions.append((i, so_body, so_points, so_answer, *options, quiz_id))

        tf_body = fake.sentence()
        tf_answer = random.choice([True, False])
        tf_points = random.randint(5, 10)
        tf_questions.append((tf_body, tf_answer, tf_points, i, quiz_id))

    return fill_blank_questions, single_open_questions, tf_questions

# 隨機生成 quiz_determination 資料
def generate_quiz_determinations(quiz_id, record_id, question_type, question_id):
    determinations = []
    for i in range(1, 6):
        is_correct = random.choice([True, False])
        determinations.append((question_id, record_id, is_correct))
    return determinations

# 插入資料
def insert_data():
    # 插入 User 資料
    users = generate_users()
    cursor.executemany("INSERT INTO User (Name, Email, Password) VALUES (%s, %s, %s)", users)

    # 插入 Friendship 資料
    friendships = generate_friendships()
    cursor.executemany("INSERT INTO Friendship (User1_id, User2_id) VALUES (%s, %s)", friendships)

    # 插入 Folder 資料
    folders = generate_folders()
    cursor.executemany("INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES (%s, %s, %s)", folders)

    # 插入 Quiz 資料
    quizzes = generate_quizzes()
    cursor.executemany("INSERT INTO Quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES (%s, %s, %s, %s)", quizzes)

    # 插入 Quiz_record 資料
    quiz_records = generate_quiz_records()
    cursor.executemany("INSERT INTO Quiz_record (Total_points, User_id, Quiz_id) VALUES (%s, %s, %s)", quiz_records)

    # 插入題目資料並插入 quiz_determination 資料
    for quiz_id in range(1, 11):
        fill_blank_questions, single_open_questions, tf_questions = generate_questions(quiz_id)

        # 插入 Fill_blank_question
        cursor.executemany("INSERT INTO Fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES (%s, %s, %s, %s, %s)", fill_blank_questions)

        # 插入 Single_open_question
        cursor.executemany("INSERT INTO Single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", single_open_questions)

        # 插入 TF_question
        cursor.executemany("INSERT INTO TF_question (Body, Answer, Points, Q_number, Quiz_id) VALUES (%s, %s, %s, %s, %s)", tf_questions)

        # 插入 quiz_determination 資料
        record_id = random.randint(1, 10)
        for fb_question in fill_blank_questions:
            cursor.executemany("INSERT INTO FB_quiz_determination (FB_id, Record_id, Is_correct) VALUES (%s, %s, %s)", generate_quiz_determinations(quiz_id, record_id, 'FB', fb_question[0]))

        for so_question in single_open_questions:
            cursor.executemany("INSERT INTO SO_quiz_determination (SO_id, Record_id, Is_correct) VALUES (%s, %s, %s)", generate_quiz_determinations(quiz_id, record_id, 'SO', so_question[0]))

        for tf_question in tf_questions:
            cursor.executemany("INSERT INTO TF_quiz_determination (TF_id, Record_id, Is_correct) VALUES (%s, %s, %s)", generate_quiz_determinations(quiz_id, record_id, 'TF', tf_question[0]))

    # 提交事務
    conn.commit()

# 執行資料插入
insert_data()

# 關閉連接
cursor.close()
conn.close()
