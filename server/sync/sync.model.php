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
            exit ($getStorSQL . "\r\n" . DB_Error ('mysql', $this->connection));
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
            if (!$updateRateQuery) {
                exit ($updateRateSQL . "\r\n" . DB_Error ('mysql', $this->connection));
            }
        }
    }
    
    public function insertStorData ($pnStorId, $paStorData) {
        $storId = intval($pnStorId);
        $storName = DB_EscapeString('mysql', $this->connection, $paStorData['name']);
        $storHref = DB_EscapeString('mysql', $this->connection, $paStorData['link']);
        $storRate = $paStorData['rate'];
        $storDate = DB_EscapeString('mysql', $this->connection, $paStorData['date']);
        $storDesc = DB_EscapeString('mysql', $this->connection, $paStorData['desc']);
        $storWatches = DB_EscapeString('mysql', $this->connection, $paStorData['watches']);
        $storComments = DB_EscapeString('mysql', $this->connection, $paStorData['comments']);
        $authorId = $this->getAuthorId($paStorData['author']['name']);
        
        $SQL = 'INSERT INTO `stories` (storId, storName, storHref, storRate, storDate, storDesc, storAuthorId, storWatches, storComments) VALUES (\'' . $storId . '\', \'' . $storName . '\', \'' . $storHref . '\' , \'' . $storRate . '\', \'' . $storDate . '\', \'' . $storDesc . '\', \'' . $authorId . '\', \'' . $storWatches . '\', \'' . $storComments . '\')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
        }
        
        $SqlArray = array();
        foreach ($paStorData['cats'] as $catName) {
            $catId = $this->getCatId($catName);
            $SqlArray[] = '(\'' . $catId . '\', \'' . $storId . '\')';
        }
        $SQL = 'INSERT INTO `cats2stories` (catId, storId) VALUES ' . implode(', ', $SqlArray);
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
        }
    }
    
    public function getAuthorId ($psAuthorName) {
        $authName = DB_EscapeString('mysql', $this->connection, $psAuthorName);
        $getAuthorSQL = 'SELECT `authorId` FROM `authors` WHERE `authorName` = \'' .$authName  . '\'';
        $getAuthorQuery = DB_Query ('mysql', $getAuthorSQL, $this->connection);
        if (!$getAuthorQuery) {
            exit ($getAuthorSQL . "\r\n" . DB_Error ('mysql', $this->connection));
        }
        $authorData = DB_FetchAssoc ('mysql', $getAuthorQuery);
        return (intval($authorData['authorId']));
    }
    
    public function getCatId ($psCatName) {
        $catName = DB_EscapeString('mysql', $this->connection, $psCatName);
        $SQL = 'SELECT `catId` FROM `categories` WHERE `catName` = \'' .$catName  . '\'';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
        }
        $catData = DB_FetchAssoc ('mysql', $Query);
        return (intval($catData['catId']));
    }
    
    public function insertAuthorData ($paAuthorData) {
        $authName = DB_EscapeString('mysql', $this->connection, $paAuthorData['name']);
        $authHref = DB_EscapeString('mysql', $this->connection, $paAuthorData['href']);
        
        $getAuthorSQL = 'SELECT `authorId` FROM `authors` WHERE `authorName` = \'' .$authName  . '\'';
        $getAuthorQuery = DB_Query ('mysql', $getAuthorSQL, $this->connection);
        if (!$getAuthorQuery) {
            exit ($getAuthorSQL . "\r\n" . DB_Error ('mysql', $this->connection));
        }
        
        $numRows = DB_NumRows('mysql', $getAuthorQuery);
        if ($numRows < 1) {
            $SQL = 'INSERT INTO `authors` (authorName, authorHref) VALUES (\'' . $authName . '\', \'' . $authHref . '\')';
            $Query = DB_Query ('mysql', $SQL, $this->connection);
            if (!$Query) {
                exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
            }
        }
    }
    
    public function insertCatsData ($paCatsData) {
        foreach ($paCatsData as $catName) {
            $catName = DB_EscapeString('mysql', $this->connection, $catName);
            $catHref = DB_EscapeString('mysql', $this->connection, 'category link_');
            
            $SQL = 'SELECT `catId` FROM `categories` WHERE `catName` = \'' .$catName  . '\'';
            $Query = DB_Query ('mysql', $SQL, $this->connection);
            if (!$Query) {
                exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
            }

            $numRows = DB_NumRows('mysql', $Query);
            if ($numRows < 1) {
                $SQL = 'INSERT INTO `categories` (catName, catHref) VALUES (\'' . $catName . '\', \'' . $catHref . $catName . '\')';
                $Query = DB_Query ('mysql', $SQL, $this->connection);
                if (!$Query) {
                    exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
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