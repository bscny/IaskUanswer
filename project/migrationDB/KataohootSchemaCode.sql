CREATE DATABASE `kataohoot`;
USE kataohoot;

-- User 表
CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);

-- Friendship 表
CREATE TABLE friendship (
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    PRIMARY KEY (user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- Folder 表
CREATE TABLE folder (
    folder_id INT PRIMARY KEY AUTO_INCREMENT,
    folder_name VARCHAR(30) NOT NULL,
    user_id INT NOT NULL,
    parent_folder_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_folder_id) REFERENCES folder(folder_id) ON DELETE SET NULL
);

-- Quiz 表
CREATE TABLE quiz (
    quiz_id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_name VARCHAR(30) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    folder_id INT,
    quiz_description VARCHAR(150) NOT NULL,
    FOREIGN KEY (folder_id) REFERENCES folder(folder_id) ON DELETE CASCADE
);

-- Quiz_record 表
CREATE TABLE quiz_record (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    total_points INT NOT NULL,
    quiz_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
);

-- Fill_blank_question 表
CREATE TABLE fill_blank_question (
    fb_id INT PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(250) NOT NULL,
    q_number INT NOT NULL,
    answer VARCHAR(100) NOT NULL,
    points INT NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
);

-- Single_open_question 表
CREATE TABLE single_open_question (
    so_id INT PRIMARY KEY AUTO_INCREMENT,
    q_number INT NOT NULL,
    body VARCHAR(250) NOT NULL,
    points INT NOT NULL,
    answer VARCHAR(250) NOT NULL,
    optiona VARCHAR(50),
    optionb VARCHAR(50),
    optionc VARCHAR(50),
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
);

-- TF_question 表
CREATE TABLE tf_question (
    tf_id INT PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(250) NOT NULL,
    answer BOOLEAN NOT NULL,
    points INT NOT NULL,
    q_number INT NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE
);

-- FB_quiz_determination 表
CREATE TABLE fb_quiz_determination (
    fb_id INT NOT NULL,
    record_id INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (fb_id, record_id),
    FOREIGN KEY (fb_id) REFERENCES fill_blank_question(fb_id) ON DELETE CASCADE,
    FOREIGN KEY (record_id) REFERENCES quiz_record(record_id) ON DELETE CASCADE
);

-- SO_quiz_determination 表
CREATE TABLE so_quiz_determination (
    so_id INT NOT NULL,
    record_id INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (so_id, record_id),
    FOREIGN KEY (so_id) REFERENCES single_open_question(so_id) ON DELETE CASCADE,
    FOREIGN KEY (record_id) REFERENCES quiz_record(record_id) ON DELETE CASCADE
);

-- TF_quiz_determination 表
CREATE TABLE tf_quiz_determination (
    tf_id INT NOT NULL,
    record_id INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (tf_id, record_id),
    FOREIGN KEY (tf_id) REFERENCES tf_question(tf_id) ON DELETE CASCADE,
    FOREIGN KEY (record_id) REFERENCES quiz_record(record_id) ON DELETE CASCADE
);
