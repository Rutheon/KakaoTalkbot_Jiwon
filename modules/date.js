module.exports = (function() {
    function ex() {}

    ex.prototype.getDate = function(choice) {
        var date = new Date();
        var datestr = (date.getMonth() + 1) + "월 " + date.getDate() + "일";
        var timestr = date.getHours() + "시 " + date.getMinutes() + "분";
        var fulldatestr = date.getFullYear() + "년 " + datestr;
        var datetimestr = datestr + " " + timestr;
        var fulldatetimestr = fulldatestr + " " + timestr;
        var mhourstr = date.getHours() < 12 ? "오전 " + date.getHours() : "오후 " + (date.getHours() == 12 ? 12 : date.getHours() - 12);
        
        switch(choice) {
            case "month":
                return date.getMonth() + 1;
            case "day":
                return date.getDate();
            case "hour":
                return date.getHours();
            case "mhour":   //오전 오후
                return mhourstr;
            case "min":
                return date.getMinutes();
            case "sec":
                return date.getSeconds();
            case "dayofweek":   // 0~6
                return date.getDay();
            case "month_day" : // 월 일
                return datestr;
            case "hour_min" : // 시 분
                return timestr;
            case "year_month_day" : // 년 월 일
                return fulldatestr;
            case "month_day_hour_min" : // 월 일 시 분
                return datetimestr;
            case "year_month_day_hour_min" : // 년 월 일 시 분
                return fulldatetimestr;
            case "getTime":
                return date.getTime();
            default :
                return "";
        }
    };
    return ex;
})();