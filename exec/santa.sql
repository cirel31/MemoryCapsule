-- MariaDB dump 10.19-11.0.2-MariaDB, for osx10.18 (arm64)
--
-- Host: i9a608.p.ssafy.io    Database: santa
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB-1:11.0.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access` (
  `access_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `access_usr` bigint(20) NOT NULL,
  `access_date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`access_idx`),
  KEY `access_usr` (`access_usr`),
  CONSTRAINT `access_ibfk_1` FOREIGN KEY (`access_usr`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
INSERT INTO `access` VALUES
(41,1031,'2023-08-15 22:37:30'),
(42,1027,'2023-08-15 22:38:46'),
(43,1032,'2023-08-15 22:38:56'),
(44,1029,'2023-08-15 22:39:45'),
(45,1028,'2023-08-15 22:41:12'),
(46,1030,'2023-08-15 22:41:52');
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `article_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `article_pjt_idx` bigint(20) NOT NULL,
  `article_creator_idx` bigint(20) NOT NULL,
  `article_title` varchar(255) NOT NULL DEFAULT '',
  `article_content` varchar(5000) NOT NULL DEFAULT '',
  `article_created` timestamp NULL DEFAULT current_timestamp(),
  `article_updated` timestamp NULL DEFAULT current_timestamp(),
  `article_deleted` tinyint(1) DEFAULT 0,
  `article_stamp` int(11) DEFAULT NULL,
  PRIMARY KEY (`article_idx`),
  KEY `article_pjt_idx` (`article_pjt_idx`),
  KEY `article_creator_idx` (`article_creator_idx`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`article_pjt_idx`) REFERENCES `project` (`pjt_idx`),
  CONSTRAINT `article_ibfk_2` FOREIGN KEY (`article_creator_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
INSERT INTO `article` VALUES
(83,51,1027,'','처음 노트북을 받았던 순간.....','2023-07-04 07:57:07','2023-08-16 07:57:07',0,4),
(84,51,1027,'','우리 로고 처음 나왔는데 진짜 신기하네요\r\n이거 어캐만들었지....','2023-08-16 07:57:52','2023-08-16 07:57:52',0,5),
(85,51,1031,'','너무 더워요 겨울이 언제 오나요\r\n겨울이 빨리 왔으면 좋겠어요ㅠ^ㅠ','2023-08-16 08:01:51','2023-08-16 08:01:51',0,5),
(86,51,1031,'','input(커피)\r\noutput(코드)\r\n커피는 필수에요','2023-08-16 08:03:40','2023-08-16 08:03:40',0,6),
(87,51,1031,'','프로젝트의 끝은 어디일까요\r\n보이지 않아요','2023-08-16 08:04:32','2023-08-16 08:04:32',0,6),
(88,51,1027,'','카카오톡 로그인 회의중...\r\n다들 열심히 하는거 같아서 보기 좋긴한데 너무 어렵네요 ㅠ.ㅠ','2023-08-16 08:07:12','2023-08-16 08:07:12',0,7),
(90,51,1029,'','명진님이 얼굴을 가려버림','2023-08-16 08:07:18','2023-08-16 08:07:18',0,2),
(91,51,1028,'','싸피2학기 들어와서 받는 첫 노트북!\r\n앞으로 프로젝트를 열심히 해보자!','2023-08-16 08:07:38','2023-08-16 08:07:38',0,6),
(92,51,1028,'','멀티캠퍼스 뒤에 있는 탄  돈까스 집에서 먹는 저녁!\r\n생각보다 맛있고 가성비도 좋은것 같아요!\r\n집가서 프로젝트해야지','2023-08-16 08:09:08','2023-08-16 08:09:08',0,7),
(93,51,1027,'','중간점검날!\r\nMVP만 만들고 아직 따로 준비된게 없다...\r\n그런데 우리 프론트 디자인 진짜 쥑이는거같음\r\nㅁㅊㄷㅁㅊㅇ ;;;','2023-08-16 08:10:02','2023-08-16 08:10:02',0,2),
(94,51,1029,'','멋 지 다 \r\n김 재 현','2023-08-16 08:10:08','2023-08-16 08:10:08',0,7),
(95,51,1028,'','팀원들과 함께 먹은 브런치!\r\n맛있게 먹고 오후 회의하러 갑니당','2023-08-16 08:10:44','2023-08-16 08:10:44',0,1),
(96,51,1030,'','집에 갈게요... 퇴근길 사람 왜이렇게 많음','2023-08-16 08:12:07','2023-08-16 08:12:07',0,4),
(97,51,1030,'','음료로 배채우는 중','2023-08-16 08:12:32','2023-08-16 08:12:32',0,5),
(98,51,1028,'','아주 잘 자고 있는 옆 팀원…','2023-08-16 08:13:05','2023-08-16 08:13:05',0,2),
(99,51,1031,'','바나프레소 햄치즈머핀 맛있어요 \r\n이거 먹고 힘내서 코딩해야징','2023-08-16 08:13:13','2023-08-16 08:13:13',0,2),
(100,51,1029,'','리액트 너무 어려워여 응애...','2023-08-16 08:13:31','2023-08-16 08:13:31',0,4),
(101,51,1031,'','싸피 끝나고 집가는 길\r\n하늘에 구름이 너무 이뻐요','2023-08-16 08:13:55','2023-08-16 08:13:55',0,7),
(102,51,1029,'','오늘 우동은 맛있었다 흑흑','2023-08-16 08:13:58','2023-08-16 08:13:58',0,5),
(103,51,1030,'','와! SCSS 아시는구나 !!','2023-08-16 08:14:33','2023-08-16 08:14:33',0,7),
(104,51,1028,'','얘는 또 자네..\r\n밤마다 뭐하는거지 ','2023-08-16 08:15:23','2023-08-16 08:15:23',0,7),
(105,51,1030,'','육회는 맛이 좋다.','2023-08-16 08:15:44','2023-08-16 08:15:44',0,7),
(106,51,1030,'','디자인 담당에게 발표를 시키지 말아주세요  . . . . .','2023-08-16 08:17:37','2023-08-16 08:17:37',0,4),
(107,51,1027,'','발표입니다 ㅋㅋㅋㅋㅋㅋㅋㅋ\r\n팀장님 만만세\r\n && \r\n디자인 답변하시는 인간CSS','2023-08-16 08:19:03','2023-08-16 08:19:03',0,2),
(108,51,1027,'','SHY한 팀장님','2023-08-16 08:19:33','2023-08-16 08:19:33',0,7),
(109,51,1027,'','아 지하철.....\r\n2학기되고 빨리못감 \r\n흑흑흑','2023-08-16 08:21:06','2023-08-16 08:21:06',0,1),
(110,51,1032,'','8월 다같이 첫커피~','2023-08-16 08:22:42','2023-08-16 08:22:42',0,7),
(111,51,1027,'','6시가 넘었는데도 남아서 답변해주시는 코치님....\r\n죄송하고 감사합니다...\r\nㅠㅠ\r\nㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ','2023-08-16 08:22:47','2023-08-16 08:22:47',0,4),
(112,51,1027,'','열일하는 프론트 ㅋㅋㅋㅋㅋㅋ\r\n\r\n프론트파이팅~~~~~~','2023-08-16 08:26:34','2023-08-16 08:26:34',0,2),
(113,51,1027,'','백엔드 회의중','2023-08-16 08:27:04','2023-08-16 08:27:04',0,5),
(114,51,1027,'','거의 막바지인데 계속 오류터짐....\r\n아으\r\n왜이러는거야','2023-08-16 08:27:51','2023-08-16 08:27:51',0,1),
(115,51,1032,'','싸피 다니면서, 하늘이 가장 화려했던 날!','2023-07-18 08:27:55','2023-08-16 08:27:55',0,2),
(116,51,1032,'','싸피 필수탬 (커피)','2023-08-16 08:32:26','2023-08-16 08:32:26',0,7),
(117,51,1029,'','','2023-08-16 08:33:40','2023-08-16 08:33:40',0,1);
UNLOCK TABLES;

--
-- Table structure for table `article_img`
--

DROP TABLE IF EXISTS `article_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_img` (
  `articleimg_img_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `articleimg_article_idx` bigint(20) NOT NULL,
  `articleimg_imgurl` varchar(2048) DEFAULT '',
  `articleimg_created` timestamp NULL DEFAULT current_timestamp(),
  `articleimg_order` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`articleimg_img_idx`),
  KEY `articleimg_idx` (`articleimg_article_idx`),
  CONSTRAINT `article_img_ibfk_1` FOREIGN KEY (`articleimg_article_idx`) REFERENCES `article` (`article_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_img`
--

LOCK TABLES `article_img` WRITE;
INSERT INTO `article_img` VALUES
(89,83,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/88a8b55c77ef4e739145df1c96e34579.jpg','2023-08-16 07:57:07','0'),
(91,84,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/8cecd6ffcb0a4127a7a55ef1214fceaa.png','2023-08-16 07:57:52','1'),
(92,85,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/ff753e765a3b463f95e90758b3431734.gif','2023-08-16 08:01:51','0'),
(93,86,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/1891d556c3cd4e1d9b9d3e5b4ff309a8.gif','2023-08-16 08:03:40','0'),
(94,87,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/25cc14a8030f41e99ace057fbb681bdc.gif','2023-08-16 08:04:32','0'),
(95,88,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/08c00cd421e84a8faa8caa1da9a81734.jpeg','2023-08-16 08:07:12','0'),
(97,90,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/20493a6b40c04492be262b8be221ff1a.jpg','2023-08-16 08:07:18','0'),
(98,91,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/4d0f7738fea54390be52fe9adb8805d1.jpeg','2023-08-16 08:07:38','0'),
(99,92,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/b4ce906cbced4139884d3248f97737c9.jpeg','2023-08-16 08:09:08','0'),
(100,93,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/3e2153bdaf0b460a95e7d24a64b5553e.jpeg','2023-08-16 08:10:02','0'),
(101,94,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/ac642cac5e30483dacd75620f2ca73b1.jpg','2023-08-16 08:10:08','0'),
(102,95,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/36b74f86580d4d37b5fe572f9f40c555.jpeg','2023-08-16 08:10:45','0'),
(103,96,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/8b88689474c8422098fc4a3880141397.jpg','2023-08-16 08:12:08','0'),
(104,97,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/a6ce732419a0410f85eaba0d2cc3553a.jpg','2023-08-16 08:12:32','0'),
(105,98,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/c294d9e32f774c30b499700695d3361c.jpeg','2023-08-16 08:13:06','0'),
(107,99,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/349bc2b69f9644d7a35c699db25dbee4.jpg','2023-08-16 08:13:14','0'),
(108,100,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/c43e89501611432db27abb637e6ac4db.jpg','2023-08-16 08:13:31','0'),
(109,101,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/fe89fd93313444caac27ce9f4c74746c.jpg','2023-08-16 08:13:55','0'),
(110,102,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/28719a5924194ffab681bf95b6b89e1d.jpg','2023-08-16 08:13:58','0'),
(111,103,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/3d231a9035654edabf289f580b711d47.png','2023-08-16 08:14:33','0'),
(112,104,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/244c7fbf5ef84d079120da8e65b68df4.jpeg','2023-08-16 08:15:23','0'),
(113,105,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/e34b216cb0ea4f4fba729cfdafbcf10f.jpg','2023-08-16 08:15:44','0'),
(114,106,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/108d25a6f30d498c9ba93ab4f7e1eefc.jpeg','2023-08-16 08:17:37','0'),
(115,107,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/32a3e3fbe6404030b8233d3f9e338964.jpeg','2023-08-16 08:19:03','0'),
(116,107,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/fe9af16c59c94d418e90636d1e24ce9b.jpeg','2023-08-16 08:19:03','1'),
(117,107,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/deda77f1d9b64b7db210e536bc07a5ed.jpeg','2023-08-16 08:19:03','2'),
(118,108,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/381dd1795c3441b9a76b5e26b83db89d.jpeg','2023-08-16 08:19:33','0'),
(119,109,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/8a554f9de03b43acb074c49d6bb2622c.jpeg','2023-08-16 08:21:06','0'),
(120,109,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/bd8cd148d870417686793f7a14b58b70.jpeg','2023-08-16 08:21:07','1'),
(121,110,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/02bc2d6262494b92969ffa8d111fd1fe.jpeg','2023-08-16 08:22:42','0'),
(122,111,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/a06b6a0edbe941008dffa8d386d183ce.jpeg','2023-08-16 08:22:47','0'),
(123,112,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/50e05a29b2d44223b890fcb766196087.jpeg','2023-08-16 08:26:35','0'),
(124,113,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/5a362b18e42041aba5894d9abadb1b9c.jpeg','2023-08-16 08:27:04','0'),
(125,114,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/202b6ae049db4700b0622d99ec7057cb.jpeg','2023-08-16 08:27:51','0'),
(126,114,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/100b3effa5cd4b5aa792ea1d1976234c.jpeg','2023-08-16 08:27:52','1'),
(127,114,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/cd36a674ea4f42eda782ccfb2423d71c.jpeg','2023-08-16 08:27:52','2'),
(128,115,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/bb6a399237c74432a995c66da7f7c140.jpeg','2023-08-16 08:27:55','0'),
(129,116,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/0478a1a4542a4d91917ed32f490801f6.jpeg','2023-08-16 08:32:26','0'),
(130,117,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/6e24441340b842ca8049c5339cba9cd6.ico','2023-08-16 08:33:40','0'),
(131,117,'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/1611266b9a094ff6aa2defbcf64099cf.svg','2023-08-16 08:33:40','1');
UNLOCK TABLES;

--
-- Table structure for table `connected`
--

DROP TABLE IF EXISTS `connected`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connected` (
  `connected_er` bigint(20) NOT NULL,
  `connected_ee` bigint(20) NOT NULL,
  `connected_confirm` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`connected_er`,`connected_ee`),
  KEY `connected_ee` (`connected_ee`),
  CONSTRAINT `connected_ibfk_1` FOREIGN KEY (`connected_er`) REFERENCES `user` (`user_idx`),
  CONSTRAINT `connected_ibfk_2` FOREIGN KEY (`connected_ee`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connected`
--

LOCK TABLES `connected` WRITE;
INSERT INTO `connected` VALUES
(1030,1027,1),
(1030,1029,0),
(1030,1032,1),
(1031,1027,1),
(1031,1028,1),
(1031,1029,1),
(1031,1030,1),
(1031,1032,1);
UNLOCK TABLES;

--
-- Table structure for table `liked`
--

DROP TABLE IF EXISTS `liked`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liked` (
  `liked_review_idx` bigint(20) NOT NULL,
  `liked_usr_idx` bigint(20) NOT NULL,
  PRIMARY KEY (`liked_review_idx`,`liked_usr_idx`),
  KEY `liked_user_idx` (`liked_usr_idx`),
  CONSTRAINT `liked_ibfk_1` FOREIGN KEY (`liked_review_idx`) REFERENCES `review` (`review_idx`),
  CONSTRAINT `liked_ibfk_2` FOREIGN KEY (`liked_usr_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked`
--

LOCK TABLES `liked` WRITE;
UNLOCK TABLES;

--
-- Temporary table structure for view `manage_article`
--

DROP TABLE IF EXISTS `manage_article`;
/*!50001 DROP VIEW IF EXISTS `manage_article`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `manage_article` AS SELECT
 1 AS `article_idx`,
  1 AS `articleimg_article_idx`,
  1 AS `article_content`,
  1 AS `articleimg_imgurl`,
  1 AS `article_created` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `notice_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `notice_creator_idx` bigint(20) NOT NULL,
  `notice_title` varchar(255) DEFAULT '',
  `notice_content` varchar(5000) DEFAULT '',
  `notice_imgurl` varchar(2048) DEFAULT '',
  `notice_deleted` tinyint(1) DEFAULT 0,
  `notice_created` timestamp NULL DEFAULT current_timestamp(),
  `notice_updated` timestamp NULL DEFAULT current_timestamp(),
  `notice_hit` int(11) DEFAULT NULL,
  PRIMARY KEY (`notice_idx`),
  KEY `notice_creator_idx` (`notice_creator_idx`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`notice_creator_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
INSERT INTO `notice` VALUES
(40,1027,'Memory capsule을 이용해주셔서 감사합니다!','Memory capsule을 이용해주셔서 감사합니다!','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(41,1027,'Memory capsule 운영정책','Memory capsule 운영정책','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(42,1027,'게시글 작성 가이드','게시글 작성 가이드','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(43,1027,'게시글 작성 가이드 업데이트','게시글 작성 가이드 업데이트','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(44,1027,'2023.07.22~23 정기 점검에 따른 서비스 일시중지','2023.07.22~23 정기 점검에 따른 서비스 일시중지','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(45,1027,'Memory capsule 운영정책 업데이트','Memory capsule 운영정책 업데이트','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(46,1027,'📌공지사항 게시판📌이 오픈되었습니다!','📌공지사항 게시판📌이 오픈되었습니다!','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(47,1027,'친구를 찾아라 🎉이벤트🎉','친구를 찾아라 🎉이벤트🎉','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(48,1027,'친구를 찾아라 🎉이벤트🎉 [종료]','친구를 찾아라 🎉이벤트🎉 [종료]','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(49,1027,'[공지] 🎉신규 런칭 이벤트!!🎉','🎉신규 런칭 이벤트!!🎉','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(50,1027,'[공지] 신규 도장이 추가되었습니다!','신규 도장이 추가되었습니다!','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(51,1027,'[공지] Memory Capsule 포인트 적립 방법!!','[공지] Memory Capsule 포인트 적립 방법!!\n\n','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(52,1027,'Memory capsule을 이용해주셔서 감사합니다!','Memory capsule을 이용해주셔서 감사합니다!','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(53,1027,'Memory capsule 운영정책','Memory capsule 운영정책','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(54,1027,'게시글 작성 가이드','게시글 작성 가이드','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(55,1027,'게시글 작성 가이드 업데이트','게시글 작성 가이드 업데이트','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(56,1027,'2023.07.22~23 정기 점검에 따른 서비스 일시중지','2023.07.22~23 정기 점검에 따른 서비스 일시중지','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(57,1027,'Memory capsule 운영정책 업데이트','Memory capsule 운영정책 업데이트','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(58,1027,'📌공지사항 게시판📌이 오픈되었습니다!','📌공지사항 게시판📌이 오픈되었습니다!','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(59,1027,'친구를 찾아라 🎉이벤트🎉','친구를 찾아라 🎉이벤트🎉','',0,'2023-08-16 11:20:37','2023-08-16 11:20:37',NULL),
(60,1027,'친구를 찾아라 🎉이벤트🎉 [종료]','친구를 찾아라 🎉이벤트🎉 [종료]','',0,'2023-08-16 11:20:38','2023-08-16 11:20:38',NULL),
(61,1027,'[공지] 🎉신규 런칭 이벤트!!🎉','[공지] 🎉신규 런칭 이벤트!!🎉','',0,'2023-08-16 11:20:38','2023-08-16 11:20:38',NULL),
(62,1027,'[공지] 😉신규 도장이 추가되었습니다!','[공지] 😉신규 도장이 추가되었습니다!','',0,'2023-08-16 11:20:38','2023-08-16 11:20:38',NULL);
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `pjt_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `pjt_title` varchar(255) NOT NULL DEFAULT '',
  `pjt_content` varchar(5000) NOT NULL DEFAULT '',
  `pjt_started` timestamp NULL DEFAULT current_timestamp(),
  `pjt_ended` timestamp NULL DEFAULT current_timestamp(),
  `pjt_created` timestamp NULL DEFAULT current_timestamp(),
  `pjt_imgurl` varchar(2048) DEFAULT '',
  `pjt_shareurl` varchar(2048) DEFAULT '',
  `pjt_type` int(11) DEFAULT 0 COMMENT '프로젝트의 타입에 관한 col\\\\n- 개인용 타입 (0)\\\\n- 그룹용 타입 (1)',
  `pjt_state` tinyint(1) DEFAULT 0 COMMENT '완료 여부',
  `pjt_gift_url` varchar(2048) DEFAULT '',
  `pjt_limit` int(11) DEFAULT NULL,
  `pjt_deleted` tinyint(1) DEFAULT 0,
  `pjt_alarm_type` int(11) DEFAULT NULL,
  `pjt_alarm` int(11) DEFAULT NULL,
  `pjt_updated` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pjt_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
INSERT INTO `project` VALUES
(51,'MemoryCapsule','SSAFY 공통프로젝트 파이팅!','2023-08-15 15:00:00','2023-08-18 15:00:00','2023-08-16 07:40:16','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/cbc02763fa1241f4b4c16acc143ce6aa.png','a',0,1,'a',0,0,0,0,'2023-08-16 08:33:40'),
(52,'aaaaaaaaaaaaaaa','15글자','2023-08-15 15:00:00','2023-08-16 15:00:00','2023-08-16 08:04:37','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/dd49e382dd084b2196148d4a45fb8be8.','',0,0,'',0,1,0,0,'2023-08-16 08:04:37'),
(53,'가나다라마바사가나다라마바사','14글자','2023-08-15 15:00:00','2023-08-16 15:00:00','2023-08-16 08:05:15','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/267d1419ab8e435c9760c3d5e6998627.','',0,0,'',0,1,0,0,'2023-08-16 08:05:15');
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `register` (
  `rgstr_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `rgstr_usr_idx` bigint(20) NOT NULL,
  `rgstr_pjt_idx` bigint(20) NOT NULL,
  `rgstr_type` tinyint(1) DEFAULT 0 COMMENT '개설자인지 아닌지',
  `rgstr_confirm` tinyint(1) DEFAULT 0 COMMENT '프로젝트 초대를 받았는지 아닌지',
  `rgstr_alarm` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`rgstr_idx`),
  UNIQUE KEY `rgstr_usr_idx` (`rgstr_usr_idx`,`rgstr_pjt_idx`),
  KEY `rgstr_pjt_idx` (`rgstr_pjt_idx`),
  CONSTRAINT `register_ibfk_1` FOREIGN KEY (`rgstr_usr_idx`) REFERENCES `user` (`user_idx`),
  CONSTRAINT `register_ibfk_2` FOREIGN KEY (`rgstr_pjt_idx`) REFERENCES `project` (`pjt_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
INSERT INTO `register` VALUES
(52,1027,51,1,1,0),
(53,1028,51,0,1,0),
(55,1030,51,0,1,0),
(56,1031,51,0,1,0),
(57,1032,51,0,1,0),
(62,1029,51,0,1,0),
(63,1032,52,1,1,0),
(64,1032,53,1,1,0);
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `review_usr_idx` bigint(20) NOT NULL,
  `review_title` varchar(255) DEFAULT '',
  `review_content` varchar(5000) DEFAULT '',
  `review_imgurl` varchar(2048) DEFAULT '',
  `review_hit` int(11) DEFAULT 0,
  `review_like` int(11) DEFAULT 0,
  `review_deleted` tinyint(1) DEFAULT 0,
  `review_created` timestamp NULL DEFAULT current_timestamp(),
  `review_updated` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_idx`),
  KEY `review_usr_idx` (`review_usr_idx`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`review_usr_idx`) REFERENCES `user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
INSERT INTO `review` VALUES
(1,1032,' 123',' 123',NULL,7,0,0,'2023-08-15 23:40:04','2023-08-15 23:40:04'),
(2,1028,'이거 생각보다 좋네요',' 생각보다 추억을 회귀하는게 좋은거 같아요!',NULL,16,0,0,'2023-08-16 02:24:14','2023-08-16 02:24:14');
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT '',
  `user_point` int(11) DEFAULT 0,
  `user_name` varchar(255) DEFAULT '',
  `user_nickname` varchar(255) DEFAULT '',
  `user_pwd` varchar(255) NOT NULL DEFAULT '',
  `user_created` timestamp NULL DEFAULT current_timestamp(),
  `user_updated` timestamp NULL DEFAULT current_timestamp(),
  `user_deleted` tinyint(1) DEFAULT 0,
  `user_role` int(11) DEFAULT 0,
  `user_phone` varchar(12) DEFAULT '',
  `user_imgurl` varchar(2048) DEFAULT '',
  `user_isoauth` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_idx`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=1035 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES
(1027,'KJH@ssafy.com',100250,'김재현','닉네임으로장난치지맙시다','$2a$10$fZ/XTNaA4AxDWe3hTXZE7OB93kNC0GX1Q7kFsytmXOJ.jitaFMs4i','2023-08-14 15:15:45','2023-08-14 15:15:45',0,0,'01050055348','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/c13e420203984587845c533b2cf9b3f4.jpeg',0),
(1028,'KYD@ssafy.com',100250,'김영도','수원킹','$2a$10$NzMqBiCZWNXwJyDdZ5N7OuKRJUoj4zBjIVBgcWtquh8eKj/boVWQ.','2023-08-14 15:18:14','2023-08-14 15:18:14',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/474c288e9fd7430a8e28a7b713d2a777.png',0),
(1029,'JDH@ssafy.com',100200,'정도현','또현','$2a$10$v7n9HpxjYCq3kcN5Pmu6m.jbWPGcR/qDdv9bZxgp92XEJz/xx81Wy','2023-08-14 15:18:42','2023-08-14 15:18:42',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/8241e7950ec343ee92a49e9cdefd4f8c.png',0),
(1030,'KTG@ssafy.com',100250,'김태경','그만 괴롭혀주세요','$2a$10$Sno0dyCjJ1jy3idkrCq5nOba3utBbrdluhYD4KU67vRFQGRCFIoSy','2023-08-14 15:19:11','2023-08-14 15:19:11',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/c29606ab55df4a56a39a1ccfe7ce5cd1.png',0),
(1031,'KMJ@ssafy.com',155950,'김명진','싫어요','$2a$10$1hC0CQpeNXxsgEEjxvcWY.6CtWpxS/0NIRP/5W/ieW1Qb1Wy3FpQm','2023-08-14 15:19:46','2023-08-14 15:19:46',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/abd5e8bd588042c09730ad250c678345.png',0),
(1032,'LJM@ssafy.com',100150,'이정명','정령','$2a$10$025C6RiugFWTuFWfOXtVAeY9rwzpkP3gyIC6RWL1QFG1GQNMMlbpW','2023-08-14 15:20:45','2023-08-14 15:20:45',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/634e51f90a514e89a0fe4e9b32e1c027.png',0),
(1033,'user1@ssafy.com',500,'유저1','귀요미','$2a$10$VM4BAZ5DPQ1XYMQjmywI3OcBRkCHNC.Ulisf53ESNcex/yy8QK82K','2023-08-14 15:21:58','2023-08-14 15:21:58',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/6c1fa64ac07e41eb97c162281c3c8842.jpeg',0),
(1034,'user2@ssafy.com',500,'유저2','귀요미2','$2a$10$fPyD.TRan5fGG6AFa1DX/.xz90PaOhj6rnFzsyirCP9/QJdVaS30S','2023-08-14 15:22:25','2023-08-14 15:22:25',0,0,'대충폰번','https://ssafysanta.s3.ap-northeast-2.amazonaws.com/eed43a3f615c4b73ab469e091a5c5273.jpeg',0);
UNLOCK TABLES;

--
-- Final view structure for view `manage_article`
--

/*!50001 DROP VIEW IF EXISTS `manage_article`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`kimqhahqhah`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `manage_article` AS select `a`.`article_idx` AS `article_idx`,`ai`.`articleimg_article_idx` AS `articleimg_article_idx`,`a`.`article_content` AS `article_content`,`ai`.`articleimg_imgurl` AS `articleimg_imgurl`,`a`.`article_created` AS `article_created` from (`article` `a` join `article_img` `ai` on(`ai`.`articleimg_article_idx` = `a`.`article_idx`)) order by `a`.`article_created` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 21:04:12
