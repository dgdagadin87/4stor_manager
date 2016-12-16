define({
    "defaults" : {
	"serverName" : "4stor.local",
        "numStart" : 2,
        "numEnd" : 2,
        "numLeft" : 2,
        "numRight" : 2
    },
    "url": {
        "getCommonData": "http://4stor.local/server/api/json.php?action=common",
        "getIndexData": "http://4stor.local/server/api/json.php?action=index",
        "getCategoryData": "http://4stor.local/server/api/json.php?action=category",
        "getSearchData": "http://4stor.local/server/api/json.php?action=search",
        "getStatisticsData": "http://4stor.local/server/api/json.php?action=statistics",
        "getStatchartData": "http://4stor.local/server/api/json.php?action=statchart",
        "getLinksData": "http://4stor.local/server/api/json.php?action=synclinks"
    }
});