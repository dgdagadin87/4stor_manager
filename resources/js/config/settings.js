define({
    "defaults" : {
	"serverName" : "4stor.local",
        "numStart" : 2,
        "numEnd" : 2,
        "numLeft" : 2,
        "numRight" : 2
    },
    "url": {
        "getCommonData": "/index.php?mode=json&action=common",
        "getIndexData": "/index.php?mode=json&action=index",
        "getCategoryData": "/index.php?mode=json&action=category",
        "getSearchData": "/index.php?mode=json&action=search",
        "getStatisticsData": "/index.php?mode=json&action=statistics",
        "getStatchartData": "/index.php?mode=json&action=statchart",
        "getLinksData": "/index.php?mode=json&action=synclinks",
        
        "addLink": "/index.php?mode=json&action=addlink",
        "editLink": "/index.php?mode=json&action=editlink",
        "deleteLink": "/index.php?mode=json&action=dellink"
    }
});