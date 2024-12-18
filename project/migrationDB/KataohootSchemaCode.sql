SHOW DATABASES;
USE kataohoot;

-- User 表
CREATE TABLE User (
    User_id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(30) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(30) NOT NULL
);

-- Friendship 表
CREATE TABLE Friendship (
    User1_id INT NOT NULL,
    User2_id INT NOT NULL,
    PRIMARY KEY (User1_id, User2_id),
    FOREIGN KEY (User1_id) REFERENCES User(User_id) ON DELETE CASCADE,
    FOREIGN KEY (User2_id) REFERENCES User(User_id) ON DELETE CASCADE
);

-- Folder 表
CREATE TABLE Folder (
    Folder_id INT PRIMARY KEY AUTO_INCREMENT,
    Folder_name VARCHAR(30) NOT NULL,
    User_id INT NOT NULL,
    Parent_folder_id INT,
    FOREIGN KEY (User_id) REFERENCES User(User_id) ON DELETE CASCADE,
    FOREIGN KEY (Parent_folder_id) REFERENCES Folder(Folder_id) ON DELETE SET NULL
);

-- Quiz 表
CREATE TABLE Quiz (
    Quiz_id INT PRIMARY KEY AUTO_INCREMENT,
    Quiz_name VARCHAR(30) NOT NULL,
    Is_public BOOLEAN NOT NULL DEFAULT FALSE,
    Folder_id INT,
    Quiz_description VARCHAR(150) NOT NULL,
    FOREIGN KEY (Folder_id) REFERENCES Folder(Folder_id) ON DELETE CASCADE
);

-- Quiz_record 表
CREATE TABLE Quiz_record (
    Record_id INT PRIMARY KEY AUTO_INCREMENT,
    Total_points INT NOT NULL,
    Quiz_Date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    User_id INT NOT NULL,
    Quiz_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES User(User_id) ON DELETE CASCADE,
    FOREIGN KEY (Quiz_id) REFERENCES Quiz(Quiz_id) ON DELETE CASCADE
);

-- Fill_blank_question 表
CREATE TABLE Fill_blank_question (
    FB_id INT PRIMARY KEY AUTO_INCREMENT,
    Body VARCHAR(250) NOT NULL,
    Q_number INT NOT NULL,
    Answer VARCHAR(100) NOT NULL,
    Points INT NOT NULL,
    Quiz_id INT NOT NULL,
    FOREIGN KEY (Quiz_id) REFERENCES Quiz(Quiz_id) ON DELETE CASCADE
);

-- Single_open_question 表
CREATE TABLE Single_open_question (
    SO_id INT PRIMARY KEY AUTO_INCREMENT,
    Q_number INT NOT NULL,
    Body VARCHAR(250) NOT NULL,
    Points INT NOT NULL,
    Answer VARCHAR(250) NOT NULL,
    OptionA VARCHAR(50),
    OptionB VARCHAR(50),
    OptionC VARCHAR(50),
    Quiz_id INT NOT NULL,
    FOREIGN KEY (Quiz_id) REFERENCES Quiz(Quiz_id) ON DELETE CASCADE
);

-- TF_question 表
CREATE TABLE TF_question (
    TF_id INT PRIMARY KEY AUTO_INCREMENT,
    Body VARCHAR(250) NOT NULL,
    Answer BOOLEAN NOT NULL,
    Points INT NOT NULL,
    Q_number INT NOT NULL,
    Quiz_id INT NOT NULL,
    FOREIGN KEY (Quiz_id) REFERENCES Quiz(Quiz_id) ON DELETE CASCADE
);

-- FB_quiz_determination 表
CREATE TABLE FB_quiz_determination (
    FB_id INT NOT NULL,
    Record_id INT NOT NULL,
    Is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (FB_id, Record_id),
    FOREIGN KEY (FB_id) REFERENCES Fill_blank_question(FB_id) ON DELETE CASCADE,
    FOREIGN KEY (Record_id) REFERENCES Quiz_record(Record_id) ON DELETE CASCADE
);

-- SO_quiz_determination 表
CREATE TABLE SO_quiz_determination (
    SO_id INT NOT NULL,
    Record_id INT NOT NULL,
    Is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (SO_id, Record_id),
    FOREIGN KEY (SO_id) REFERENCES Single_open_question(SO_id) ON DELETE CASCADE,
    FOREIGN KEY (Record_id) REFERENCES Quiz_record(Record_id) ON DELETE CASCADE
);

-- TF_quiz_determination 表
CREATE TABLE TF_quiz_determination (
    TF_id INT NOT NULL,
    Record_id INT NOT NULL,
    Is_correct BOOLEAN NOT NULL,
    PRIMARY KEY (TF_id, Record_id),
    FOREIGN KEY (TF_id) REFERENCES TF_question(TF_id) ON DELETE CASCADE,
    FOREIGN KEY (Record_id) REFERENCES Quiz_record(Record_id) ON DELETE CASCADE
);
