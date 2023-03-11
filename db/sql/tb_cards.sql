-- `knowledge-base`.tb_cards definition

CREATE TABLE `tb_cards` (
  `title` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `starred` tinyint(1) DEFAULT '0',
  `description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cover` blob,
  `flag` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tags` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `annotations` int DEFAULT NULL,
  `url` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `folder` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ranking` int DEFAULT '-1',
  `update_date` timestamp NULL DEFAULT NULL,
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;