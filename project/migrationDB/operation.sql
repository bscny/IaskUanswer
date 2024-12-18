-- OPERATION

-- DROP TABLE

-- 判斷正確性相關的表格
DROP TABLE IF EXISTS fb_quiz_determination;
DROP TABLE IF EXISTS so_quiz_determination;
DROP TABLE IF EXISTS TF_quiz_determination;

-- 題目相關表格
DROP TABLE IF EXISTS Fill_blank_question;
DROP TABLE IF EXISTS Single_open_question;
DROP TABLE IF EXISTS TF_question;

-- 測驗紀錄表
DROP TABLE IF EXISTS Quiz_record;

-- 測驗與資料夾表格
DROP TABLE IF EXISTS Quiz;
DROP TABLE IF EXISTS Folder;

-- 使用者關聯表
DROP TABLE IF EXISTS Friendship;

-- 使用者主表
DROP TABLE IF EXISTS User;

-- SELECT TABLE
SHOW TABLES;

-- 判斷正確性相關的表格
DESCRIBE fb_quiz_determination;
SELECT * FROM fb_quiz_determination;
DESCRIBE so_quiz_determination;
SELECT * FROM so_quiz_determination;
DESCRIBE TF_quiz_determination;
SELECT * FROM TF_quiz_determination;

-- 題目相關表格
DESCRIBE Fill_blank_question;
SELECT * FROM Fill_blank_question;
DESCRIBE Single_open_question;
SELECT * FROM Single_open_question;
DESCRIBE TF_question;
SELECT * FROM TF_question;

-- 測驗紀錄表
DESCRIBE Quiz_record;
SELECT * FROM Quiz_record;

-- 測驗與資料夾表格
DESCRIBE Quiz;
SELECT * FROM Quiz;
DESCRIBE Folder;
SELECT * FROM Folder;

-- 使用者關聯表
DESCRIBE Friendship;
SELECT * FROM Friendship;

-- 使用者主表
DESCRIBE User;
SELECT * FROM  User;
