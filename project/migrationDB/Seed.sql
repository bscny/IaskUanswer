USE `kataohoot`;
-- 插入 User 資料
INSERT INTO User (Name, Email, Password) VALUES 
('Alice', 'alice@example.com', 'password123'),  -- User_id 1
('Bob', 'bob@example.com', 'password456'),      -- User_id 2
('Charlie', 'charlie@example.com', 'password789'), -- User_id 3
('David', 'david@example.com', 'password321'),   -- User_id 4
('Eve', 'eve@example.com', 'password654');       -- User_id 5

-- 插入 Friendship 資料
INSERT INTO Friendship (User1_id, User2_id) VALUES
(1, 2),  -- User1_id 1, User2_id 2
(2, 3),  -- User1_id 2, User2_id 3
(1, 3),  -- User1_id 1, User2_id 3
(4, 5),  -- User1_id 4, User2_id 5
(2, 4);  -- User1_id 2, User2_id 4

-- 插入 Folder 資料
INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES
('Math Folder', 1, NULL),  -- Folder_id 1, User_id 1
('Science Folder', 2, NULL),  -- Folder_id 2, User_id 2
('History Folder', 3, NULL),  -- Folder_id 3, User_id 3
('Math Subfolder', 1, 1),  -- Folder_id 4, User_id 1, Parent_folder_id 1
('Science Subfolder', 2, 2);  -- Folder_id 5, User_id 2, Parent_folder_id 2

-- 插入 Quiz 資料
INSERT INTO Quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES
('Math Quiz 1', TRUE, 1, 'A quiz on basic math topics'),  -- Quiz_id 1, Folder_id 1
('Science Quiz 1', FALSE, 2, 'A quiz on science topics'),  -- Quiz_id 2, Folder_id 2
('History Quiz 1', TRUE, 3, 'A quiz on world history'),  -- Quiz_id 3, Folder_id 3
('Math Quiz 2', TRUE, 1, 'An advanced math quiz'),  -- Quiz_id 4, Folder_id 1
('Science Quiz 2', FALSE, 2, 'Advanced science quiz');  -- Quiz_id 5, Folder_id 2

-- 插入 Quiz_record 資料
INSERT INTO Quiz_record (Total_points, User_id, Quiz_id) VALUES
(80, 1, 1),  -- Record_id 1, User_id 1, Quiz_id 1
(90, 2, 2),  -- Record_id 2, User_id 2, Quiz_id 2
(70, 3, 3),  -- Record_id 3, User_id 3, Quiz_id 3
(85, 1, 4),  -- Record_id 4, User_id 1, Quiz_id 4
(95, 5, 5);  -- Record_id 5, User_id 5, Quiz_id 5

-- 插入 Fill_blank_question 資料
INSERT INTO Fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES
('What is 2 + 2?', 1, '4', 10, 1),  -- FB_id 1, Quiz_id 1
('What is the capital of France?', 2, 'Paris', 15, 2),  -- FB_id 2, Quiz_id 2
('Who developed the theory of relativity?', 3, 'Einstein', 20, 5);  -- FB_id 3, Quiz_id 5

-- 插入 Single_open_question 資料
INSERT INTO Single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES
(1, 'What is 5 + 7?', 10, '12', '10', '12', '15', 1),  -- SO_id 1, Quiz_id 1
(2, 'What is the chemical formula of water?', 10, 'H2O', 'H2O', 'CO2', 'O2', 2),  -- SO_id 2, Quiz_id 2
(3, 'Who wrote "1984"?', 10, 'George Orwell', 'Aldous Huxley', 'George Orwell', 'Mark Twain', 3);  -- SO_id 3, Quiz_id 3

-- 插入 TF_question 資料
INSERT INTO TF_question (Body, Answer, Points, Q_number, Quiz_id) VALUES
('The Earth is flat.', FALSE, 5, 1, 1),  -- TF_id 1, Quiz_id 1
('The sun is a star.', TRUE, 5, 2, 3),  -- TF_id 2, Quiz_id 3
('Humans have landed on Mars.', FALSE, 5, 3, 5);  -- TF_id 3, Quiz_id 5

-- 插入 FB_quiz_determination 資料
INSERT INTO FB_quiz_determination (FB_id, Record_id, Is_correct) VALUES
(1, 1, TRUE),  -- FB_id 1, Record_id 1
(2, 2, FALSE),  -- FB_id 2, Record_id 2
(3, 5, TRUE);  -- FB_id 3, Record_id 5

-- 插入 SO_quiz_determination 資料
INSERT INTO SO_quiz_determination (SO_id, Record_id, Is_correct) VALUES
(1, 1, TRUE),  -- SO_id 1, Record_id 1
(2, 2, FALSE),  -- SO_id 2, Record_id 2
(3, 3, TRUE);  -- SO_id 3, Record_id 3

-- 插入 TF_quiz_determination 資料
INSERT INTO TF_quiz_determination (TF_id, Record_id, Is_correct) VALUES
(1, 1, FALSE),  -- TF_id 1, Record_id 1
(2, 2, TRUE),  -- TF_id 2, Record_id 2
(3, 3, FALSE);  -- TF_id 3, Record_id 3
