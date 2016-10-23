DROP TABLE categories;
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

DROP TABLE authors;
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

DROP TABLE stories;
CREATE TABLE stories 
(
    storId BIGINT NOT NULL , 
    storName TEXT NOT NULL , 
    storHref TEXT NOT NULL , 
    storRate INT NOT NULL , 
    storDesc TEXT NOT NULL , 
    storContent LONGTEXT ,
    storAuthorId INT NOT NULL , 
  
    PRIMARY KEY ( storId )
) 
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci
ENGINE = MYISAM;

DROP TABLE cats2stories;
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