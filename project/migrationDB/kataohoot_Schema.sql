CREATE DATABASE  IF NOT EXISTS `kataohoot` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kataohoot`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: kataohoot
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fb_quiz_determination`
--

DROP TABLE IF EXISTS `fb_quiz_determination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fb_quiz_determination` (
  `FB_id` int NOT NULL,
  `Record_id` int NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`FB_id`,`Record_id`),
  KEY `fk_fbdetermination_record` (`Record_id`),
  CONSTRAINT `fk_fbdetermination_fillblank` FOREIGN KEY (`FB_id`) REFERENCES `fill_blank_question` (`FB_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fbdetermination_record` FOREIGN KEY (`Record_id`) REFERENCES `quiz_record` (`Record_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fill_blank_question`
--

DROP TABLE IF EXISTS `fill_blank_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fill_blank_question` (
  `FB_id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(250) NOT NULL,
  `q_number` int NOT NULL,
  `answer` varchar(100) NOT NULL,
  `points` int NOT NULL,
  `Quiz_id` int NOT NULL,
  PRIMARY KEY (`FB_id`),
  KEY `fk_fillblank_quiz` (`Quiz_id`),
  CONSTRAINT `fk_fillblank_quiz` FOREIGN KEY (`Quiz_id`) REFERENCES `quiz` (`Quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `folder`
--

DROP TABLE IF EXISTS `folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folder` (
  `Folder_id` int NOT NULL AUTO_INCREMENT,
  `Folder_name` varchar(30) NOT NULL,
  `User_id` int NOT NULL,
  `Parent_folder_id` int DEFAULT NULL,
  PRIMARY KEY (`Folder_id`),
  KEY `fk_folder_user` (`User_id`),
  KEY `fk_folder_parent` (`Parent_folder_id`),
  CONSTRAINT `fk_folder_parent` FOREIGN KEY (`Parent_folder_id`) REFERENCES `folder` (`Folder_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_folder_user` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `User1_id` int NOT NULL,
  `User2_id` int NOT NULL,
  PRIMARY KEY (`User1_id`,`User2_id`),
  KEY `fk_friendship_user2` (`User2_id`),
  CONSTRAINT `fk_friendship_user1` FOREIGN KEY (`User1_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_friendship_user2` FOREIGN KEY (`User2_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `Quiz_id` int NOT NULL AUTO_INCREMENT,
  `Quiz_name` varchar(30) NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `Folder_id` int DEFAULT NULL,
  PRIMARY KEY (`Quiz_id`),
  KEY `fk_quiz_folder` (`Folder_id`),
  CONSTRAINT `fk_quiz_folder` FOREIGN KEY (`Folder_id`) REFERENCES `folder` (`Folder_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quiz_record`
--

DROP TABLE IF EXISTS `quiz_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_record` (
  `Record_id` int NOT NULL AUTO_INCREMENT,
  `total_points` int NOT NULL,
  `Quiz_Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` int NOT NULL,
  `Quiz_id` int NOT NULL,
  PRIMARY KEY (`Record_id`),
  KEY `fk_quizrecord_user` (`User_id`),
  KEY `fk_quizrecord_quiz` (`Quiz_id`),
  CONSTRAINT `fk_quizrecord_quiz` FOREIGN KEY (`Quiz_id`) REFERENCES `quiz` (`Quiz_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_quizrecord_user` FOREIGN KEY (`User_id`) REFERENCES `user` (`User_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `single_open_question`
--

DROP TABLE IF EXISTS `single_open_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `single_open_question` (
  `SO_id` int NOT NULL AUTO_INCREMENT,
  `q_number` int NOT NULL,
  `body` varchar(250) NOT NULL,
  `points` int NOT NULL,
  `answer` varchar(250) NOT NULL,
  `optionA` varchar(50) DEFAULT NULL,
  `optionB` varchar(50) DEFAULT NULL,
  `optionC` varchar(50) DEFAULT NULL,
  `Quiz_id` int NOT NULL,
  PRIMARY KEY (`SO_id`),
  KEY `fk_singleopen_quiz` (`Quiz_id`),
  CONSTRAINT `fk_singleopen_quiz` FOREIGN KEY (`Quiz_id`) REFERENCES `quiz` (`Quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `so_quiz_determination`
--

DROP TABLE IF EXISTS `so_quiz_determination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `so_quiz_determination` (
  `SO_id` int NOT NULL,
  `Record_id` int NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`SO_id`,`Record_id`),
  KEY `fk_sodetermination_record` (`Record_id`),
  CONSTRAINT `fk_sodetermination_record` FOREIGN KEY (`Record_id`) REFERENCES `quiz_record` (`Record_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sodetermination_singleopen` FOREIGN KEY (`SO_id`) REFERENCES `single_open_question` (`SO_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tf_question`
--

DROP TABLE IF EXISTS `tf_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tf_question` (
  `TF_id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(250) NOT NULL,
  `answer` tinyint(1) NOT NULL,
  `points` int NOT NULL,
  `q_number` int NOT NULL,
  `Quiz_id` int NOT NULL,
  PRIMARY KEY (`TF_id`),
  KEY `fk_tfquestion_quiz` (`Quiz_id`),
  CONSTRAINT `fk_tfquestion_quiz` FOREIGN KEY (`Quiz_id`) REFERENCES `quiz` (`Quiz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tf_quiz_determination`
--

DROP TABLE IF EXISTS `tf_quiz_determination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tf_quiz_determination` (
  `TF_id` int NOT NULL,
  `Record_id` int NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`TF_id`,`Record_id`),
  KEY `fk_tfdetermination_record` (`Record_id`),
  CONSTRAINT `fk_tfdetermination_record` FOREIGN KEY (`Record_id`) REFERENCES `quiz_record` (`Record_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tfdetermination_tfquestion` FOREIGN KEY (`TF_id`) REFERENCES `tf_question` (`TF_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL,
  PRIMARY KEY (`User_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 12:49:57
