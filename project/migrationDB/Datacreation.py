import random
from faker import Faker
import os

# 取得目前程式的執行目錄
base_dir = os.path.dirname(os.path.abspath(__file__))

# 在執行目錄下的 migrationDB 資料夾中生成檔案
output_path = os.path.join(base_dir, "Seed.sql")

# 確保資料夾存在，如果不存在則建立
os.makedirs(os.path.dirname(output_path), exist_ok=True)
# 初始化 Faker
faker = Faker()

# 設定生成資料數量
num_users = 10
num_friendships = 15
num_folders = 8
num_quizzes = 10
num_records = 12
num_fill_blank_questions = 10
num_single_open_questions = 10
num_tf_questions = 10
num_fb_determinations = 5
num_so_determinations = 5
num_tf_determinations = 5


# 建立檔案
with open(output_path, "w", encoding="utf-8") as f:
    # 插入 User 資料
    f.write("USE `kataohoot`;\n")
    f.write("-- 插入 User 資料\n")
    f.write("INSERT INTO User (Name, Email, Password) VALUES\n")
    users = []
    for i in range(num_users):
        name = faker.first_name()
        email = faker.email()
        password = faker.password(length=10)
        users.append(i + 1)
        f.write(f"('{name}', '{email}', '{password}')")
        if i < num_users - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 Friendship 資料
    f.write("-- 插入 Friendship 資料\n")
    f.write("INSERT INTO Friendship (User1_id, User2_id) VALUES\n")
    friendships = set()
    for _ in range(num_friendships):
        user1, user2 = random.sample(users, 2)
        while (user1, user2) in friendships or (user2, user1) in friendships:
            user1, user2 = random.sample(users, 2)
        friendships.add((user1, user2))
        f.write(f"({user1}, {user2})")
        if len(friendships) < num_friendships:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 Folder 資料
    f.write("-- 插入 Folder 資料\n")
    f.write("INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES\n")
    folders = []
    for i in range(num_folders):
        folder_name = faker.word().capitalize() + " Folder"
        user_id = random.choice(users)
        parent_folder_id = random.choice(folders) if folders and random.random() > 0.5 else "NULL"
        folders.append(i + 1)
        f.write(f"('{folder_name}', {user_id}, {parent_folder_id})")
        if i < num_folders - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")

    # 插入 Quiz 資料
    f.write("-- 插入 Quiz 資料\n")
    f.write("INSERT INTO Quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES\n")
    quizzes = []
    for i in range(num_quizzes):
        quiz_name = faker.word().capitalize() + " Quiz"
        is_public = random.choice([True, False])
        folder_id = random.choice(folders)
        description = faker.sentence()
        quizzes.append(i + 1)
        f.write(f"('{quiz_name}', {is_public}, {folder_id}, '{description}')")
        if i < num_quizzes - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 Quiz_record 資料
    f.write("-- 插入 Quiz_record 資料\n")
    f.write("INSERT INTO Quiz_record (Total_points, User_id, Quiz_id) VALUES\n")
    records = []
    for i in range(num_records):
        total_points = random.randint(50, 100)
        user_id = random.choice(users)
        quiz_id = random.choice(quizzes)
        records.append(i + 1)
        f.write(f"({total_points}, {user_id}, {quiz_id})")
        if i < num_records - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 Fill_blank_question 資料
    f.write("-- 插入 Fill_blank_question 資料\n")
    f.write("INSERT INTO Fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES\n")
    for i in range(num_fill_blank_questions):
        body = faker.sentence()
        q_number = i + 1
        answer = faker.word()
        points = random.randint(5, 20)
        quiz_id = random.choice(quizzes)
        f.write(f"('{body}', {q_number}, '{answer}', {points}, {quiz_id})")
        if i < num_fill_blank_questions - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 Single_open_question 資料
    f.write("-- 插入 Single_open_question 資料\n")
    f.write("INSERT INTO Single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES\n")
    for i in range(num_single_open_questions):
        q_number = i + 1
        body = faker.sentence()
        points = random.randint(5, 20)
        answer = faker.word()
        option_a, option_b, option_c = faker.word(), faker.word(), faker.word()
        quiz_id = random.choice(quizzes)
        f.write(f"({q_number}, '{body}', {points}, '{answer}', '{option_a}', '{option_b}', '{option_c}', {quiz_id})")
        if i < num_single_open_questions - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 TF_question 資料
    f.write("-- 插入 TF_question 資料\n")
    f.write("INSERT INTO TF_question (Body, Answer, Points, Q_number, Quiz_id) VALUES\n")
    for i in range(num_tf_questions):
        body = faker.sentence()
        answer = random.choice([True, False])
        points = random.randint(5, 20)
        q_number = i + 1
        quiz_id = random.choice(quizzes)
        f.write(f"('{body}', {answer}, {points}, {q_number}, {quiz_id})")
        if i < num_tf_questions - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")

    # 插入 FB_quiz_determination 資料
    f.write("-- 插入 FB_quiz_determination 資料\n")
    f.write("INSERT INTO FB_quiz_determination (FB_id, Record_id, Is_correct) VALUES\n")
    for i in range(num_fb_determinations):
        fb_id = random.randint(1, num_fill_blank_questions)
        record_id = random.choice(records)
        is_correct = random.choice([True, False])
        f.write(f"({fb_id}, {record_id}, {is_correct})")
        if i < num_fb_determinations - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 SO_quiz_determination 資料
    f.write("-- 插入 SO_quiz_determination 資料\n")
    f.write("INSERT INTO SO_quiz_determination (SO_id, Record_id, Is_correct) VALUES\n")
    for i in range(num_so_determinations):
        so_id = random.randint(1, num_single_open_questions)
        record_id = random.choice(records)
        is_correct = random.choice([True, False])
        f.write(f"({so_id}, {record_id}, {is_correct})")
        if i < num_so_determinations - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
    
    # 插入 TF_quiz_determination 資料
    f.write("-- 插入 TF_quiz_determination 資料\n")
    f.write("INSERT INTO TF_quiz_determination (TF_id, Record_id, Is_correct) VALUES\n")
    for i in range(num_tf_determinations):
        tf_id = random.randint(1, num_tf_questions)
        record_id = random.choice(records)
        is_correct = random.choice([True, False])
        f.write(f"({tf_id}, {record_id}, {is_correct})")
        if i < num_tf_determinations - 1:
            f.write(",\n")
        else:
            f.write(";\n\n")
