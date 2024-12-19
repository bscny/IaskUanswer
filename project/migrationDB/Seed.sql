USE `kataohoot`;
-- 插入 User 資料
INSERT INTO User (Name, Email, Password) VALUES
('Nicole', 'melissaritter@example.net', 'W2C1EtLXN)'),
('Patricia', 'pwolfe@example.net', 'UJ_O$38ut@'),
('William', 'bradley37@example.com', '&)1KlyereK'),
('Paul', 'rguzman@example.org', 'iKQ6GEx(@t'),
('Joseph', 'dawnmathews@example.com', '%*F5F*Sx_j'),
('Catherine', 'yangcheyenne@example.net', 'n#10KPtNGi'),
('Jose', 'mgarcia@example.net', '#cNXooSU4z'),
('Brandon', 'hintonjamie@example.com', '7F#LI_vV!b'),
('Carla', 'kennethblackwell@example.net', '*1B+PS1ZxG'),
('Bryce', 'amyaguilar@example.net', '*gI5VrDTFU');

-- 插入 Friendship 資料
INSERT INTO Friendship (User1_id, User2_id) VALUES
(9, 2),
(8, 1),
(7, 6),
(4, 2),
(6, 8),
(10, 9),
(8, 2),
(9, 6),
(4, 7),
(7, 10),
(5, 2),
(3, 2),
(5, 8),
(6, 2),
(5, 9);

-- 插入 Folder 資料
INSERT INTO Folder (Folder_name, User_id, Parent_folder_id) VALUES
('Cover Folder', 3, NULL),
('Claim Folder', 9, 1),
('Prepare Folder', 9, NULL),
('Senior Folder', 6, NULL),
('Hour Folder', 6, NULL),
('Wish Folder', 4, 3),
('Treat Folder', 7, 6),
('Player Folder', 4, NULL);

-- 插入 Quiz 資料
INSERT INTO Quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES
('Too Quiz', False, 4, 'Cut exactly agree do lose physical dream.'),
('Not Quiz', True, 4, 'It career computer report item.'),
('That Quiz', False, 6, 'Stock himself gas prove agent.'),
('Group Quiz', True, 8, 'Benefit option in become capital agree tell.'),
('Phone Quiz', False, 1, 'Coach serious rule avoid record where.'),
('Send Quiz', False, 2, 'Effect discover away then room suffer media.'),
('Form Quiz', True, 1, 'Natural thing bill actually decide.'),
('Fish Quiz', True, 4, 'Require plant performance alone still.'),
('Especially Quiz', True, 8, 'Everything seem let fast.'),
('Care Quiz', True, 1, 'Have early significant bed.');

-- 插入 Quiz_record 資料
INSERT INTO Quiz_record (Total_points, User_id, Quiz_id) VALUES
(94, 9, 3),
(91, 5, 1),
(86, 10, 10),
(50, 8, 2),
(69, 3, 5),
(83, 3, 2),
(54, 7, 3),
(69, 5, 6),
(63, 2, 7),
(51, 9, 5),
(64, 3, 4),
(98, 6, 2);

-- 插入 Fill_blank_question 資料
INSERT INTO Fill_blank_question (Body, Q_number, Answer, Points, Quiz_id) VALUES
('Industry phone group.', 1, 'early', 18, 4),
('Reflect success purpose consumer almost future.', 2, 'teacher', 6, 7),
('Establish woman design support.', 3, 'raise', 11, 1),
('Recognize rule easy need offer.', 4, 'people', 12, 10),
('Total worry effect court indicate.', 5, 'item', 5, 10),
('Whole agree computer art such for mind.', 6, 'majority', 11, 10),
('Arrive senior we determine.', 7, 'stay', 16, 4),
('Truth protect sing answer.', 8, 'deal', 6, 7),
('Stay event large investment decade.', 9, 'need', 20, 4),
('Become this between military doctor share myself resource.', 10, 'put', 14, 1);

-- 插入 Single_open_question 資料
INSERT INTO Single_open_question (Q_number, Body, Points, Answer, OptionA, OptionB, OptionC, Quiz_id) VALUES
(1, 'Through at son walk Democrat.', 14, 'phone', 'realize', 'I', 'part', 2),
(2, 'Whether lawyer home probably that edge such.', 16, 'success', 'statement', 'single', 'believe', 1),
(3, 'Our career maybe.', 11, 'suffer', 'floor', 'decision', 'still', 6),
(4, 'Paper state meeting close note event hundred.', 14, 'two', 'begin', 'produce', 'learn', 1),
(5, 'Thought itself smile decide let reduce prove.', 20, 'they', 'rather', 'person', 'law', 9),
(6, 'Available just find different seven.', 18, 'one', 'act', 'past', 'forget', 8),
(7, 'All agency important catch.', 13, 'single', 'tough', 'six', 'save', 10),
(8, 'Must policy three our.', 9, 'good', 'within', 'build', 'these', 3),
(9, 'Born whom season might class.', 19, 'million', 'affect', 'ten', 'rise', 8),
(10, 'Network door campaign always improve.', 15, 'middle', 'center', 'organization', 'parent', 5);

-- 插入 TF_question 資料
INSERT INTO TF_question (Body, Answer, Points, Q_number, Quiz_id) VALUES
('Political certainly mission receive unit sometimes.', True, 9, 1, 3),
('Attorney Mrs thing old soldier security eye.', False, 14, 2, 7),
('They wait drug old member idea.', True, 12, 3, 1),
('Dark partner pay loss relationship bar woman.', False, 14, 4, 2),
('No ahead teacher trial up music store.', False, 7, 5, 1),
('Future tend tend side.', True, 18, 6, 6),
('Measure system wish apply sure ready scientist.', False, 18, 7, 5),
('Republican too letter executive learn.', False, 19, 8, 1),
('Tend with candidate.', True, 9, 9, 10),
('Strategy lay necessary enough television but.', False, 9, 10, 10);

-- 插入 FB_quiz_determination 資料
INSERT INTO FB_quiz_determination (FB_id, Record_id, Is_correct) VALUES
(6, 4, True),
(2, 7, True),
(4, 9, True),
(1, 12, True),
(9, 6, False);

-- 插入 SO_quiz_determination 資料
INSERT INTO SO_quiz_determination (SO_id, Record_id, Is_correct) VALUES
(2, 2, False),
(10, 4, False),
(10, 6, True),
(8, 10, True),
(7, 6, False);

-- 插入 TF_quiz_determination 資料
INSERT INTO TF_quiz_determination (TF_id, Record_id, Is_correct) VALUES
(9, 2, False),
(9, 1, False),
(8, 1, True),
(10, 6, False),
(5, 12, False);

