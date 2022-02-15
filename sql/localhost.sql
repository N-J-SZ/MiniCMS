-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2022. Feb 08. 14:11
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `214SZFT_MiniCMS`
--
CREATE DATABASE IF NOT EXISTS `214SZFT_MiniCMS` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `214SZFT_MiniCMS`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `adminmenu`
--

CREATE TABLE `adminmenu` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `url` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `rights` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `adminmenu`
--

INSERT INTO `adminmenu` (`ID`, `name`, `url`, `rights`) VALUES
(1, 'Fehasználók kezelése', 'users', 2),
(2, 'Menüpontok kezelése', 'navitems', 2),
(3, 'Tartalmak kezelése', 'contents', 2),
(4, 'Carousel kezelése', 'carousel', 2),
(5, 'Jelszó módosítás', 'passmod', 1),
(6, 'Profil módosítás', 'profilmod', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `carousels`
--

CREATE TABLE `carousels` (
  `ID` int(11) NOT NULL,
  `file` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `header` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `text` text COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `carousels`
--

INSERT INTO `carousels` (`ID`, `file`, `header`, `text`) VALUES
(1, 'img/1.png', 'Ez az első carousel', 'Nagyon szép hegyek a ködben'),
(2, 'img/2.jpg', 'Ez a második carousel', 'Ez egy naplemente az óceánon.'),
(3, 'img/3.jpg', 'Ez a harmadik carousel', 'Ez egy város részlet illusztráció'),
(4, 'img/4.jpg', 'Negyedik carousel', 'Halvány nap a kéklő hegyek felett');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contents`
--

CREATE TABLE `contents` (
  `ID` int(11) NOT NULL,
  `title` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `content` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `menuID` int(11) DEFAULT NULL,
  `userName` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `last` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `contents`
--

INSERT INTO `contents` (`ID`, `title`, `content`, `menuID`, `userName`, `last`) VALUES
(1, 'Bemutatkozás', 'aaksdjbf jkasdhf kjasdhfiasdf \r\nasdf űasdf asdjfhasjkfhasdfú\r\nasdúf asdobasd', 1, 'Adminisztrátor', '2022-02-08 13:18:53'),
(2, 'Elérhetőségeink', 'fjgksld fjksdf hfjskdhfjkasd fasd\r\nfasdfasdf\r\nasdf', 2, 'Adminisztrátor', '2022-02-08 13:20:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `navitems`
--

CREATE TABLE `navitems` (
  `ID` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_hungarian_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `url` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `navitems`
--

INSERT INTO `navitems` (`ID`, `name`, `icon`, `url`, `status`) VALUES
(1, 'Bemutatkozás', NULL, 'bemutatkozat', 1),
(2, 'Elérhetőségeink', NULL, 'contacts', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `passwd` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `reg` datetime NOT NULL,
  `last` datetime DEFAULT NULL,
  `rights` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `passwd`, `reg`, `last`, `rights`, `status`) VALUES
(1, 'Adminisztrátor', 'admin@admin.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-02-01 12:15:00', '2022-02-08 14:08:07', 'adminisztrátor', 2),
(2, 'Teszt Elek', 'teszt1@valami.hu', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', '2022-02-01 12:17:07', '2022-02-07 12:29:57', 'felhasználó', 1),
(10, 'Kovács Béla', 'teszt2@valami.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-02-01 12:40:44', NULL, 'felhasználó', 0),
(11, 'Horváth Géza', 'teszt3@valami.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-02-01 12:51:29', NULL, 'felhasználó', 1),
(12, 'Fül Elek', 'teszt4@valami.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-02-01 12:58:26', NULL, 'felhasználó', 1),
(13, 'Teszt Tamás', 'teszt50@valami.hu', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-02-08 10:21:55', NULL, 'felhasználó', 1),
(14, 'Teszt József', 'teszt10@valami.hu', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', '2022-02-08 10:26:33', NULL, 'felhasználó', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `adminmenu`
--
ALTER TABLE `adminmenu`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `carousels`
--
ALTER TABLE `carousels`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `navitems`
--
ALTER TABLE `navitems`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `adminmenu`
--
ALTER TABLE `adminmenu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `carousels`
--
ALTER TABLE `carousels`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `contents`
--
ALTER TABLE `contents`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `navitems`
--
ALTER TABLE `navitems`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
