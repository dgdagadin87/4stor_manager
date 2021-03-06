DROP TABLE IF EXISTS categories;
CREATE TABLE categories 
(
    catId INT AUTO_INCREMENT NOT NULL , 
    catName VARCHAR(200) NOT NULL , 
    catHref VARCHAR(200) NOT NULL , 
  
    PRIMARY KEY ( catId ) , 
    UNIQUE ( catName ) , 
    UNIQUE ( catHref )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

ALTER TABLE `categories` ADD `catImportant` VARCHAR(1) NOT NULL DEFAULT 'n' ;

DROP TABLE IF EXISTS authors;
CREATE TABLE authors 
(
    authorId INT AUTO_INCREMENT NOT NULL , 
    authorName VARCHAR(200) NOT NULL , 
    authorHref VARCHAR(200) NOT NULL , 
  
    PRIMARY KEY ( authorId ) , 
    UNIQUE ( authorName ) , 
    UNIQUE ( authorHref )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS stories;
CREATE TABLE stories 
(
    storId BIGINT NOT NULL , 
    storName TEXT NOT NULL , 
    storHref TEXT NOT NULL , 
    storRate INT NOT NULL , 
    storWatches INT NOT NULL ,
    storComments INT NOT NULL ,
    storDate DATETIME NOT NULL , 
    storDesc TEXT NOT NULL , 
    storContent LONGTEXT ,
    storAuthorId INT NOT NULL , 
  
    PRIMARY KEY ( storId )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS cats2stories;
CREATE TABLE cats2stories 
(
    cat2storId BIGINT AUTO_INCREMENT NOT NULL , 
    storId BIGINT NOT NULL , 
    catId INT NOT NULL ,
  
    PRIMARY KEY ( cat2storId ) , 
    UNIQUE ( storId, catId )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS settings;
CREATE TABLE settings 
(
    settingId BIGINT AUTO_INCREMENT NOT NULL , 
    settingName VARCHAR(100) NOT NULL , 
    settingValue VARCHAR(100) NOT NULL ,
  
    PRIMARY KEY ( settingId ) , 
    UNIQUE ( settingName )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS sync_links;
CREATE TABLE sync_links 
(
    linkId BIGINT AUTO_INCREMENT NOT NULL , 
    linkName VARCHAR(100) NOT NULL , 
    linkHref VARCHAR(100) NOT NULL ,
    linkIsOn VARCHAR(1) NOT NULL ,
    linkIsMultipage  VARCHAR(1) NOT NULL ,
  
    PRIMARY KEY ( linkId ) , 
    UNIQUE ( linkName )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS queries;
CREATE TABLE queries 
(
    queryId BIGINT AUTO_INCREMENT NOT NULL , 
    queryName VARCHAR(100) NOT NULL , 
    queryData LONGTEXT NOT NULL ,
  
    PRIMARY KEY ( queryId ) , 
    UNIQUE ( queryName )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE IF EXISTS system_users;
CREATE TABLE system_users 
(
    userId BIGINT AUTO_INCREMENT NOT NULL , 
    userLogin VARCHAR(100) NOT NULL , 
    userName VARCHAR(100) NOT NULL , 
    userPassword VARCHAR(100) NOT NULL ,
  
    PRIMARY KEY ( userId ) , 
    UNIQUE ( userName )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;