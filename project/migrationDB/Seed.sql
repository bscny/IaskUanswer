USE `kataohoot`;
-- 插入 User 資料
INSERT INTO user (Name, Email, Password) VALUES
('Nicholas', 'christopher03@example.org', 'p805PUKh_T'),
('Aaron', 'odawson@example.net', '1_9LTN91Gy'),
('April', 'sortiz@example.com', 'K0a&C6GaEg'),
('Alyssa', 'nmiller@example.org', '$#SDc6Ot2G'),
('Charles', 'jbolton@example.com', '9i7v+SW@%2'),
('April', 'kellyhunt@example.com', '^%O&(qzuN2'),
('Nicholas', 'xjones@example.org', '@37K^jTk@^'),
('Alice', 'pglass@example.net', 'jx4T6!Vr!K'),
('Seth', 'opetersen@example.org', 'Y3J5qv%s*q'),
('Susan', 'perryadam@example.org', '2b4v5Iv^+5');

-- 插入 Friendship 資料
INSERT INTO friendship (User1_id, User2_id) VALUES
(10, 6),
(1, 4),
(5, 10),
(8, 3),
(10, 3),
(9, 5),
(3, 4),
(8, 6),
(7, 3),
(6, 3),
(5, 6),
(1, 9),
(10, 2),
(1, 10),
(3, 5);

-- 插入 Folder 資料
INSERT INTO folder (Folder_name, User_id, Parent_folder_id) VALUES
('Most Folder', 10, NULL),
('Quickly Folder', 7, NULL),
('Child Folder', 7, 1),
('Wide Folder', 10, 2),
('Cold Folder', 2, 3),
('Article Folder', 10, NULL),
('Management Folder', 2, NULL),
('Able Folder', 4, 7);

-- 插入 Quiz 資料
INSERT INTO quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES
('Case Quiz', False, 6, 'Inside bank skill doctor grow.'),
('Itself Quiz', True, 2, 'Situation no these whom son loss seven.'),
('Standard Quiz', False, 4, 'Last often either little rise.'),
('Condition Quiz', False, 4, 'Physical center center ask.'),
('Five Quiz', True, 8, 'Career father finally partner usually spring for their.'),
('Age Quiz', True, 5, 'Your those respond.'),
('Skin Quiz', True, 4, 'American wait I rock property push.'),
('True Quiz', False, 2, 'Child remember hope state fly.'),
('Rock Quiz', False, 4, 'Cut decide firm maybe.'),
('Art Quiz', False, 3, 'Hair heart hear say south.');

-- 插入 Quiz_record 資料
INSERT INTO quiz_record (Total_points, User_id, Quiz_id) VALUES
(59, 8, 5),
(91, 1, 8),
(80, 4, 8),
(62, 5, 8),
(54, 1, 8),
(84, 4, 1),
(92, 4, 4),
(58, 2, 6),
(71, 7, 10),
(71, 8, 6),
(87, 10, 3),
(76, 1, 4);

-- 插入 Fill_blank_question 資料
INSERT INTO fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES
('Evidence treat enter big indicate no or.', 1, 'which', 13, 5),
('Wife unit beautiful.', 2, 'out', 17, 3),
('Dinner check single bit physical else couple view.', 3, 'trouble', 15, 7),
('Personal head his produce that long hospital.', 4, 'idea', 13, 4),
('Recognize newspaper find until other.', 5, 'brother', 8, 8),
('Believe exactly chance low perform.', 6, 'foreign', 19, 4),
('Maintain size ago page.', 7, 'collection', 14, 10),
('These minute miss cell center.', 8, 'order', 13, 6),
('Economy our but significant story.', 9, 'yes', 12, 8),
('Choice according seem reveal.', 10, 'national', 18, 10);

-- 插入 Single_open_question 資料
INSERT INTO single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES
(1, 'Radio real bill.', 16, 'price', 'firm', 'maybe', 'world', 5),
(2, 'Kid stuff top ground.', 15, 'hour', 'thank', 'box', 'picture', 7),
(3, 'Moment big song position wrong.', 10, 'quality', 'late', 'culture', 'out', 10),
(4, 'Few media behavior space lead against agree let.', 14, 'drop', 'behavior', 'or', 'bit', 1),
(5, 'Call TV continue practice.', 17, 'travel', 'financial', 'brother', 'low', 9),
(6, 'Along prove course nice field.', 17, 'want', 'expect', 'third', 'example', 10),
(7, 'Of enter doctor anything.', 13, 'option', 'to', 'identify', 'wish', 6),
(8, 'Everybody example born third religious star skill grow.', 17, 'onto', 'budget', 'yourself', 'different', 5),
(9, 'Fill itself deal throughout watch.', 11, 'poor', 'them', 'scientist', 'brother', 4),
(10, 'Can partner threat.', 6, 'interesting', 'bag', 'true', 'detail', 6);

-- 插入 TF_question 資料
INSERT INTO tf_question (Body, Answer, Points, Q_number, Quiz_id) VALUES
('Answer discover before nature.', True, 17, 1, 5),
('Experience same spring listen somebody agency.', False, 6, 2, 5),
('Film protect degree environmental cost somebody stand citizen.', False, 15, 3, 10),
('Management house certain financial.', False, 15, 4, 4),
('You company issue commercial buy must quickly.', True, 20, 5, 3),
('Employee teacher big share.', False, 15, 6, 4),
('Herself spring movement total raise morning glass top.', False, 18, 7, 1),
('Teach foot citizen development.', True, 20, 8, 7),
('Group country method majority process we.', False, 10, 9, 4),
('Value top three table response.', False, 12, 10, 5);

-- 插入 FB_quiz_determination 資料
INSERT INTO fb_quiz_determination (FB_id, Record_id, Is_correct) VALUES
(10, 6, True),
(8, 2, True),
(10, 6, True),
(4, 6, False),
(4, 10, False);

-- 插入 SO_quiz_determination 資料
INSERT INTO so_quiz_determination (SO_id, Record_id, Is_correct) VALUES
(2, 11, False),
(4, 4, True),
(4, 8, False),
(10, 1, False),
(3, 2, False);

-- 插入 TF_quiz_determination 資料
INSERT INTO tf_quiz_determination (TF_id, Record_id, Is_correct) VALUES
(2, 5, True),
(6, 1, False),
(9, 8, False),
(7, 1, False),
(2, 7, True);

