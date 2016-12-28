define({
    "defaults" : {
	"serverName" : "4stor.local",
        "numStart" : 2,
        "numEnd" : 2,
        "numLeft" : 2,
        "numRight" : 2
    },
    "url": {
        "getCommonData": "/server/api/json.php?action=common",
        "getIndexData": "/server/api/json.php?action=index",
        "getCategoryData": "/server/api/json.php?action=category",
        "getSearchData": "/server/api/json.php?action=search",
        "getStatisticsData": "/server/api/json.php?action=statistics",
        "getStatchartData": "/server/api/json.php?action=statchart",
        "getLinksData": "/server/api/json.php?action=synclinks"
    }
});