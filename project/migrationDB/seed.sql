use kataohoot;
-- 1. User 表
INSERT INTO User (Name, Email, Password) VALUES
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 'password456'),
('Charlie', 'charlie@example.com', 'password789'),
('David', 'david@example.com', 'password321'),
('Eva', 'eva@example.com', 'password654'),
('Frank', 'frank@example.com', 'password987'),
('Grace', 'grace@example.com', 'password135'),
('Helen', 'helen@example.com', 'password246'),
('Ivy', 'ivy@example.com', 'password369'),
('Jack', 'jack@example.com', 'password111');

-- 2. Friendship 表
INSERT INTO Friendship (User1_id, User2_id) VALUES
(1, 2),
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9),
(8, 10),
(9, 1);

-- 3. Folder 表
INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES
('Science', 1, NULL),
('Math', 2, 1),
('History', 3, NULL),
('English', 4, NULL),
('Geography', 5, 4),
('Programming', 6, NULL),
('Art', 7, NULL),
('Music', 8, 7),
('Physics', 9, NULL),
('Chemistry', 10, 9);

-- 4. Quiz 表
INSERT INTO Quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES
('Basic Science Quiz', TRUE, 1, 'A basic quiz about science.'),
('Advanced Math Quiz', FALSE, 2, 'A challenging math quiz.'),
('History Knowledge Quiz', TRUE, 3, 'Test your knowledge of history.'),
('English Grammar Quiz', TRUE, 4, 'A quiz on English grammar.'),
('Geography World Quiz', FALSE, 5, 'How well do you know the world geography?'),
('Programming Basics Quiz', TRUE, 6, 'Test your basic programming skills.'),
('Art Knowledge Quiz', TRUE, 7, 'A quiz on famous art and artists.'),
('Music Theory Quiz', FALSE, 8, 'A quiz on music theory basics.'),
('Physics Fundamentals Quiz', TRUE, 9, 'How much do you know about physics?'),
('Chemistry Concepts Quiz', TRUE, 10, 'A chemistry quiz for advanced learners.');

-- 5. Quiz_record 表
INSERT INTO Quiz_record (Total_points, User_id, Quiz_id) VALUES
(85, 1, 1),
(90, 2, 2),
(80, 3, 3),
(75, 4, 4),
(95, 5, 5),
(88, 6, 6),
(92, 7, 7),
(78, 8, 8),
(85, 9, 9),
(90, 10, 10);

-- 6. Fill_blank_question 表
INSERT INTO Fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES
('The capital of France is ___.', 1, 'Paris', 5, 1),
('Water boils at ___ degrees Celsius.', 2, '100', 5, 2),
('The Earth orbits the ___.', 3, 'Sun', 5, 3),
('Shakespeare wrote ___ and Juliet.', 4, 'Romeo', 5, 4),
('Mount Everest is located in ___.', 5, 'Nepal', 5, 5),
('A byte is equal to ___ bits.', 6, '8', 5, 6),
('The Mona Lisa was painted by ___.', 7, 'Leonardo da Vinci', 5, 7),
('Mozart was born in ___.', 8, 'Austria', 5, 8),
('The symbol for hydrogen is ___.', 9, 'H', 5, 9),
('Atoms are made of protons, neutrons, and ___.', 10, 'Electrons', 5, 10);

-- 7. Single_open_question 表
INSERT INTO Single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES
(1, 'Who was the first president of the United States?', 10, 'George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams', 3),
(2, 'Which element is most abundant in Earth’s crust?', 10, 'Oxygen', 'Silicon', 'Iron', 'Aluminum', 4),
(3, 'Who developed the theory of relativity?', 10, 'Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla', 9),
(4, 'Which artist painted the ceiling of the Sistine Chapel?', 10, 'Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello', 7),
(5, 'What is the freezing point of water in Celsius?', 10, '0', '32', '100', '273', 10);

-- 8. TF_question 表
INSERT INTO TF_question (Body, Answer, Points, Q_number, Quiz_id) VALUES
('The Earth is flat.', FALSE, 5, 1, 1),
('Water is made up of hydrogen and oxygen.', TRUE, 5, 2, 2),
('Shakespeare was born in Italy.', FALSE, 5, 3, 3),
('The sun rises in the east.', TRUE, 5, 4, 4),
('An atom is the smallest unit of matter.', TRUE, 5, 5, 5);

-- 9. FB_quiz_determination 表
INSERT INTO FB_quiz_determination (FB_id, Record_id, Is_correct) VALUES
(1, 1, TRUE),
(2, 2, TRUE),
(3, 3, FALSE),
(4, 4, TRUE),
(5, 5, TRUE),
(6, 6, TRUE),
(7, 7, FALSE),
(8, 8, TRUE),
(9, 9, TRUE),
(10, 10, FALSE);

-- 10. SO_quiz_determination 表
INSERT INTO SO_quiz_determination (SO_id, Record_id, Is_correct) VALUES
(1, 1, TRUE),
(2, 2, TRUE),
(3, 3, FALSE),
(4, 4, TRUE),
(5, 5, TRUE),
(6, 6, TRUE),
(7, 7, FALSE),
(8, 8, TRUE),
(9, 9, TRUE),
(10, 10, FALSE);

-- 11. TF_quiz_determination 表
INSERT INTO TF_quiz_determination (TF_id, Record_id, Is_correct) VALUES
(1, 1, FALSE),
(2, 2, TRUE),
(3, 3, FALSE),
(4, 4, TRUE),
(5, 5, TRUE),
(6, 6, TRUE),
(7, 7, FALSE),
(8, 8, TRUE),
(9, 9, TRUE),
(10, 10, FALSE);
