-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 05 Juin 2020 à 16:02
-- Version du serveur :  5.7.30-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `twitter`
--
CREATE DATABASE IF NOT EXISTS `twitter` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `twitter`;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `content` varchar(140) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `content`, `created_at`, `id_user`) VALUES
(61, 'Hello', '2020-06-03 16:17:20', 13),
(62, 'Hello', '2020-06-03 16:26:06', 17),
(63, 'Hello', '2020-06-03 16:32:08', 12),
(64, 'Hello', '2020-06-03 16:32:28', 14),
(65, 'Hello', '2020-06-03 16:32:44', 16),
(66, 'Bonjour je m\'appelle Jack Sparrow et je suis un pirate #cool et #bogoss', '2020-06-03 17:07:17', 16),
(67, 'Je me suis fait douiller par twitter ils ont perdus la carte au trésor #douille #fatigué #trésor #carte', '2020-06-03 17:08:32', 16),
(68, 'HI !!', '2020-06-03 18:10:38', 13),
(69, 'Hello', '2020-06-04 11:00:46', 16),
(70, 'ZBEUB ZBEUB', '2020-06-04 11:18:12', 12);
-- --------------------------------------------------------
--
-- Structure de la table `sessions`
--
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Contenu de la table `sessions`
--
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('jU9ZCHgAIEvZPyarNiuQhJT0MWPkXSra', 1591440631, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
-- --------------------------------------------------------
--
-- Structure de la table `user`
--
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(225) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `tel` int(10) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Index pour les tables exportées
--
--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);
--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);
--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);
--
-- AUTO_INCREMENT pour les tables exportées
--
--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;