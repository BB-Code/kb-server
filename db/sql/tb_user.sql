-- `knowledge-base`.tb_user definition

CREATE TABLE `tb_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `cover` blob,
  `sex` tinyint(1) DEFAULT '0',
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `boi` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '0',
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;