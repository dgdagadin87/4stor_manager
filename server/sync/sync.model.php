<?php

class serverSyncModel {
    
    public $connection = null;
    
    public function run ($paData) {
        $this->syncConnect();
        foreach ($paData as $storId=>$storData) {
            $this->insertStor($storId, $storData);
        }
    }
    
    public function insertStor ($pnStorId, $paStorData) {
        $getStorSQL = 'SELECT `storId` FROM `stories` WHERE `storId` = \'' . intval($pnStorId) . '\'';
        $getStorQuery = DB_Query ('mysql', $getStorSQL, $this->connection);
        if (!$getStorQuery) {
            exit ($getStorSQL . "\r\n" . DB_Error ('mysql'));
        }
        
        $numRows = DB_NumRows('mysql', $getStorQuery);
        if ($numRows < 1) {
            $this->insertAuthorData($paStorData['author']);
            $this->insertCatsData($paStorData['cats']);
            $this->insertStorData($pnStorId, $paStorData);
        }
        else {
            $updateRateSQL = 'UPDATE `stories` SET `storRate` = \'' . $paStorData['rate'] . '\' WHERE `storId` = \'' . intval($pnStorId) . '\'';
            $updateRateQuery = DB_Query ('mysql', $updateRateSQL, $this->connection);
            if (!$getStorQuery) {
                exit ($updateRateSQL . "\r\n" . DB_Error ('mysql'));
            }
        }
    }
    
    public function insertStorData ($pnStorId, $paStorData) {
        $storId = intval($pnStorId);
        $storName = DB_EscapeString('mysql', $this->connection, $paStorData['name']);
        $storHref = DB_EscapeString('mysql', $this->connection, $paStorData['href']);
        $storRate = $paStorData['rate'];
        $storDesc = DB_EscapeString('mysql', $this->connection, $paStorData['desc']);
        $authorId = $this->getAuthorId($paStorData['author']['name']);
        
        $SQL = 'INSERT INTO `stories` (storId, storName, storHref, storRate, storDesc, storAuthorId) VALUES (\'' . $storId . '\', \'' . $storName . '\', \'' . $storHref . '\', , \'' . $storRate . '\', , \'' . $storDesc . '\', \'' . $authorId . '\')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            exit ($SQL . "\r\n" . DB_Error ('mysql'));
        }
    }
    
    public function getAuthorId ($psAuthorName) {
        $authName = DB_EscapeString('mysql', $this->connection, $psAuthorName);
        $getAuthorSQL = 'SELECT `authorId` FROM `authors` WHERE `authorName` = \'' .$authName  . '\'';
        $getAuthorQuery = DB_Query ('mysql', $getAuthorSQL, $this->connection);
        if (!$getAuthorQuery) {
            exit ($getAuthorSQL . "\r\n" . DB_Error ('mysql'));
        }
        $authorData = DB_FetchAssoc ('mysql', $getAuthorQuery);
        return (intval($authorData['authorId']));
    }
    
    public function insertAuthor ($paAuthorData) {
        $authName = DB_EscapeString('mysql', $this->connection, $paAuthorData['name']);
        $authHref = DB_EscapeString('mysql', $this->connection, $paAuthorData['href']);
        
        $getAuthorSQL = 'SELECT `authorId` FROM `authors` WHERE `authorName` = \'' .$authName  . '\'';
        $getAuthorQuery = DB_Query ('mysql', $getAuthorSQL, $this->connection);
        if (!$getAuthorQuery) {
            exit ($getAuthorSQL . "\r\n" . DB_Error ('mysql'));
        }
        
        $numRows = DB_NumRows('mysql', $getAuthorQuery);
        if ($numRows < 1) {
            $SQL = 'INSERT INTO `authors` (authorName, authorHref) VALUES (\'' . $authName . '\', \'' . $authHref . '\')';
            $Query = DB_Query ('mysql', $SQL, $this->connection);
            if (!$Query) {
                exit ($SQL . "\r\n" . DB_Error ('mysql'));
            }
        }
    }
    
    public function insertCats ($paCatsData) {
        foreach ($paCatsData as $key=>$catName) {
            $catName = DB_EscapeString('mysql', $this->connection, $catName);
            $catHref = DB_EscapeString('mysql', $this->connection, 'category link');
            
            $SQL = 'SELECT `catId` FROM `categories` WHERE `catName` = \'' .$catName  . '\'';
            $Query = DB_Query ('mysql', $SQL, $this->connection);
            if (!$Query) {
                exit ($SQL . "\r\n" . DB_Error ('mysql'));
            }

            $numRows = DB_NumRows('mysql', $Query);
            if ($numRows < 1) {
                $SQL = 'INSERT INTO `categories` (catName, catHref) VALUES (\'' . $catName . '\', \'' . $catHref . '\')';
                $Query = DB_Query ('mysql', $SQL, $this->connection);
                if (!$Query) {
                    exit ($SQL . "\r\n" . DB_Error ('mysql'));
                }
            }
        }
    }
    
    public function syncConnect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

