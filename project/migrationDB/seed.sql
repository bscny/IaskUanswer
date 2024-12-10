USE `kataohoot`;

-- 插入 User 表的測試資料
INSERT INTO User (name, email, password) VALUES
('Alice Smith', 'alice.smith@example.com', 'password123'),
('Bob Johnson', 'bob.johnson@example.com', 'password123'),
('Charlie Brown', 'charlie.brown@example.com', 'password123'),
('David Wilson', 'david.wilson@example.com', 'password123'),
('Emma Davis', 'emma.davis@example.com', 'password123'),
('Fiona Garcia', 'fiona.garcia@example.com', 'password123'),
('George Rodriguez', 'george.rodriguez@example.com', 'password123'),
('Hannah Martinez', 'hannah.martinez@example.com', 'password123'),
('Ivy White', 'ivy.white@example.com', 'password123'),
('Jack Lewis', 'jack.lewis@example.com', 'password123');

-- 插入 Friendship 表的測試資料
INSERT INTO Friendship (User1_id, User2_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(1, 10);

-- 插入 Folder 表的測試資料
INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES
('Folder 1', 1, NULL),
('Folder 2', 2, 1),
('Folder 3', 3, 2),
('Folder 4', 4, 3),
('Folder 5', 5, NULL),
('Folder 6', 6, 5),
('Folder 7', 7, 6),
('Folder 8', 8, 7),
('Folder 9', 9, NULL),
('Folder 10', 10, 9);

-- 插入 Quiz 表的測試資料
INSERT INTO Quiz (Quiz_name, is_public, Folder_id) VALUES
('Quiz 1', TRUE, 1),
('Quiz 2', FALSE, 2),
('Quiz 3', TRUE, 3),
('Quiz 4', FALSE, 4),
('Quiz 5', TRUE, 5),
('Quiz 6', FALSE, 6),
('Quiz 7', TRUE, 7),
('Quiz 8', FALSE, 8),
('Quiz 9', TRUE, 9),
('Quiz 10', FALSE, 10);

-- 插入 Quiz_record 表的測試資料
INSERT INTO Quiz_record (total_points, Quiz_Date, User_id, Quiz_id) VALUES
(85, '2024-01-01 10:00:00', 1, 1),
(90, '2024-01-02 11:00:00', 2, 2),
(95, '2024-01-03 12:00:00', 3, 3),
(80, '2024-01-04 13:00:00', 4, 4),
(75, '2024-01-05 14:00:00', 5, 5),
(70, '2024-01-06 15:00:00', 6, 6),
(65, '2024-01-07 16:00:00', 7, 7),
(60, '2024-01-08 17:00:00', 8, 8),
(55, '2024-01-09 18:00:00', 9, 9),
(50, '2024-01-10 19:00:00', 10, 10);

-- 插入 Fill_blank_question 表的測試資料
INSERT INTO Fill_blank_question (body, q_number, answer, points, Quiz_id) VALUES
('Fill in the blank question 1', 1, 'Answer 1', 10, 1),
('Fill in the blank question 2', 2, 'Answer 2', 10, 2),
('Fill in the blank question 3', 3, 'Answer 3', 10, 3),
('Fill in the blank question 4', 4, 'Answer 4', 10, 4),
('Fill in the blank question 5', 5, 'Answer 5', 10, 5);

-- 插入 Single_open_question 表的測試資料
INSERT INTO Single_open_question (q_number, body, points, answer, optionA, optionB, optionC, Quiz_id) VALUES
(1, 'Single open question 1', 10, 'Option A', 'Option A', 'Option B', 'Option C', 1),
(2, 'Single open question 2', 10, 'Option B', 'Option A', 'Option B', 'Option C', 2),
(3, 'Single open question 3', 10, 'Option C', 'Option A', 'Option B', 'Option C', 3);

-- 插入 TF_question 表的測試資料
INSERT INTO TF_question (body, answer, points, q_number, Quiz_id) VALUES
('True or False question 1', TRUE, 5, 1, 1),
('True or False question 2', FALSE, 5, 2, 2),
('True or False question 3', TRUE, 5, 3, 3);

-- 插入 fb_quiz_determination 表的測試資料
INSERT INTO fb_quiz_determination (FB_id, Record_id, is_correct) VALUES
(1, 1, TRUE),
(2, 2, FALSE),
(3, 3, TRUE);

-- 插入 so_quiz_determination 表的測試資料
INSERT INTO so_quiz_determination (SO_id, Record_id, is_correct) VALUES
(1, 1, TRUE),
(2, 2, FALSE),
(3, 3, TRUE);

-- 插入 TF_quiz_determination 表的測試資料
INSERT INTO TF_quiz_determination (TF_id, Record_id, is_correct) VALUES
(1, 1, TRUE),
(2, 2, FALSE),
(3, 3, TRUE);
