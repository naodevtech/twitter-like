CREATE TABLE user(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `lastname` text,
  `firstname` text,
  `datebirth` date,
  `gender` text,
  `city` text,
  `email` text,
  `password` text,
  `username` text,
  `avatar` text
);

CREATE TABLE `tweet` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_author` FOREIGN KEY (userID) REFERENCES user(userID),
  `text` text,
  `creation` timestamp
);

CREATE TABLE `follow` (
  `id_followed` [fk],
  `id_follower` [fk]
);

CREATE TABLE `image` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_tweet` [fk],
  `filename` text
);

CREATE TABLE `reply` (
  `id_tweet` [fk],
  `text` text,
  `id_author` [fk]
);

CREATE TABLE `like` (
  `id_tweet` [fk],
  `id_author` [fk]
);

CREATE TABLE `retweet` (
  `id_tweet` [fk],
  `id_retweet` [fk]
);

ALTER TABLE `tweet` ADD FOREIGN KEY (`id`) REFERENCES `reply` (`id_tweet`);

ALTER TABLE `follow` ADD FOREIGN KEY (`id_follower`) REFERENCES `user` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`id_followed`) REFERENCES `user` (`id`);

ALTER TABLE `tweet` ADD FOREIGN KEY (`id_author`) REFERENCES `user` (`id`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `like` (`id_author`);

ALTER TABLE `tweet` ADD FOREIGN KEY (`id`) REFERENCES `like` (`id_tweet`);

ALTER TABLE `tweet` ADD FOREIGN KEY (`id`) REFERENCES `retweet` (`id_tweet`);

ALTER TABLE `tweet` ADD FOREIGN KEY (`id`) REFERENCES `retweet` (`id_retweet`);

ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `reply` (`id_author`);
