-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 20 2016 г., 10:37
-- Версия сервера: 5.5.50-0ubuntu0.14.04.1
-- Версия PHP: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `webinse`
--

-- --------------------------------------------------------

--
-- Структура таблицы `_users`
--

CREATE TABLE IF NOT EXISTS `_users` (
  `id_user` int(3) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) COLLATE utf8_bin NOT NULL,
  `second_name` varchar(32) COLLATE utf8_bin NOT NULL,
  `email` varchar(32) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `_users`
--

INSERT INTO `_users` (`id_user`, `first_name`, `second_name`, `email`) VALUES
(7, 'Vladislav', 'Nebesnyuk', 'oyn1973@gmail.com'),
(8, 'Vladik', 'Ivanov', 'vlad13zp@yandex.ru'),
(9, 'Nastya', 'Danilenko', 'vlad13zp@mail.ru'),
(10, 'Oksana', 'Sorokina', 'test@test.ru'),
(11, 'Webinse', 'Company', 'webise@webinse.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
