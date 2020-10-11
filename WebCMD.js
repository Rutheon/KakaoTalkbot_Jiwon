/*
  웹 파싱 명령어
*/

const THIS_FILENAME = "WebCMD";
const filepath = "/storage/emulated/0/KakaobotData";

const COMPRESS = "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​"; //전체보기 만들기용 투명문자 1000개

// Main
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        var list = msg.split(" ");
        var cmd = list[0];
        var option = [];
        var nbcmd = msg.replace(/\s/g, "");

        // options after cmd
        for (let i = 0; i < list.length; i++) {
            if (i != 0) {
                option[i-1] = list[i];
            }
        }
        
        var nballoption = option.join().replace(",", "");

        if (cmd == "!날씨") {
            if (option[0] == "" || option[0] == null) {
                let data = Utils.getWebText("https://m.search.naver.com/search.naver?query=전국날씨");
                let raw = data.split("class=\"wt_map_area map_nation\"")[1].split("class=\"map_unit\"")[0].split("lcl_name\">");
                let str = "";
                
                for (let i = 1; i < raw.length; i++) {
                    let area = raw[i].split("<")[0];
                    let temp = raw[i].split("<span>")[1].split("<")[0];
                    let sky = raw[i].split("ico_status")[1].split(">")[1].split("<")[0];
                    
                    if (i != 1) {
                        str += "\n";
                    }
                    str += area + ": " + temp + "도 " + sky;
                }

                replier.reply("🌧 대한민국 지역별 날씨 🌧" + COMPRESS + "\n\n" + str);
            } else {
                    GetWeather(replier, room, nballoption, true);
            }
        }
        
        if (cmd == "!화씨날씨") {
            if (option[0] == "" || option[0] == null)
                replier.reply("대한민국의 전국날씨는 화씨로 제공되지 않습니다.");
            else
                GetWeather(replier, room, nballoption, false);
        }
            
        if (nbcmd.charAt(0) == "!" && nbcmd.split("날씨")[1] == "" && nbcmd != "!날씨" && nbcmd != "!화씨날씨") {
            let loc = nbcmd.replace("!", "");
            let iscelsius = true;
            
            if (nbcmd.split("화씨날씨")[1] == "") {
                loc = loc.replace("화씨날씨", "");
                iscelsius = false;
            } else {
                loc = loc.replace("날씨", "");
            }
            
            if (["한강", "한강물"].indexOf(loc) == -1)
                GetWeather(replier, room, loc, iscelsius);
        }
        
        if (["!한강물온도", "!한강온도", "!한강수온", "!한강물수온", "!한강날씨", "!한강물날씨"].indexOf(nbcmd) != -1) {
            let data = Utils.getWebText("http://hangang.dkserver.wo.tc");
            let temp = data.split("temp\":\"")[1].split("\"")[0];
            let time = data.split("time\":\"")[1].split("\"")[0];
            let d = time.split(" ")[0].split("-");
            let year = d[0];
            let month = d[1];
            let day = d[2];
            let t = time.split(" ")[1].split(":");
            let hour = t[0];
            let min = t[1];
            
            replier.reply("대한민국 " + month + "월 " + day + "일 " + hour + "시 " + min + "분 기준\n" + "한강물의 온도는 섭씨 " + temp + "도입니다.");
        }

        if (nbcmd == "!코로나") {
            let data = Utils.getWebText("http://ncov.mohw.go.kr");
            let nraw = data.split("실시간 집계현황")[1].split("help_info")[0].split("<li>");
            let distraw = data.split("\"rpsam_graph\">")[1].split("<svg")[0];
            
            let nationwide = gDate("fulldate") + " 기준 대한민국\n";
            let district = "";
            let list = "";
                
            for (let i = 1; i < nraw.length; i++) {
                let title = nraw[i].split("tit\">")[1].split("<")[0];
                let num = nraw[i].replace("<span class=\"mini\">(누적)</span>", "").split("num\">")[1].split("<")[0];
                let before = nraw[i].split("before\">")[1].split("<")[0].replace("전일대비 ", "").replace(" ", "");

                if (i == 3) {
                    nationwide += "\n";
                }

                nationwide += title + ": " + num + "명 " + before;

                if (i % 2 != 0) {
                    nationwide += " ";
                }
            }

            
            for (let i = 1; list = distraw.split("map_city" + i + "\">")[1]; i++) {
                let title = list.split("name\">")[1].split("<")[0];
                let num = list.split("num\">")[1].split("<")[0];
                let before = list.split("before\">")[1].split("<")[0];
                
                if (title == "검역") {
                    title = "해외감염";
                }

                if (i != 1) {
                    district += "\n";
                }

                district += title + ": " + num + "명 " + before;
            }


            replier.reply(nationwide);
            replier.reply("💉 지역별 코로나 현황 💉" + COMPRESS + "\n\n" + district);
        }

        if (nbcmd == "!실검") {
            let str = Utils.getWebText("https://www.naver.com/srchrank?frm=main&ag=all&gr=1&ma=-2&si=0&en=0&sp=0");
            let data = str.split("\"keyword\":\"");
            let rank = gDate("fulldatetime") + " 기준\n";

            for (let i = 0; i < (data.length - 1); i++) {
                if (i != 0) {
                    rank += "\n";
                }

                rank += (i + 1) + ". " + data[i+1].split("\",\"keyword_synonyms\":")[0];
            }

            replier.reply(rank);
        }
    } catch (e) {
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function GetWeather(replier, room, loc, iscelsius) {
    try {
        let data = Utils.getWebText("https://www.google.com/search?q=" + loc + "+날씨").split("Weather Result")[1];

        let title = data.split("role=\"heading\">\n")[1].split("\n")[0].replace("             ", "");
        let temp = data.split("id=\"wob_tm\">")[1];
        let temp_c = temp.split("\"display:none\">")[1].split("<")[0];
        let temp_f = temp.split("<")[0];
        let sky = data.split("\"wob_dc\">")[1].split("<")[0];
        let time = data.split("\"wob_dts\">")[1].split("<")[0];

        if (title.indexOf("94566") != -1 || title.indexOf("94588") != -1) {
            replier.reply("지원이의 집주소를 염탐하려하지 마십쇼");
        } else {
            if (iscelsius)
                replier.reply("The weather in " + title + " is " + temp_c + "°C and " + sky + " at " + time);
            else
                replier.reply("The weather in " + title + " is " + temp_f + "°F and " + sky + " at " + time);
        }
    } catch (e) {
        replier.reply("엥 뭔가 잘못돼서 정보를 불러올 수 없거나 지역 이름을 인식할 수가 없습니당...");
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function gDate(choice) {
var date = new Date();
var datestr = (date.getMonth() + 1) + "월 " + date.getDate() + "일";
var timestr = date.getHours() + "시 " + date.getMinutes() + "분";
var fulldatestr = date.getFullYear() + "년 " + datestr;
var datetimestr = datestr + " " + timestr;
var fulldatetimestr = fulldatestr + " " + timestr;
var mhourstr = date.getHours() <= 12 ? "오전 " + date.getHours() : "오후 " + (date.getHours() - 12);

switch(choice) {
    case "month":
        return date.getMonth() + 1;
    case "d":
        return date.getDate();
    case "hour":
        return date.getHours();
    case "mhour":
        return mhourstr;
    case "min":
        return date.getMinutes();
    case "sec":
        return date.getSeconds();
    case "day":
        return date.getDay();
    case "date" : // 월 일
        return datestr;
    case "time" : // 시 분
        return timestr;
    case "fulldate" : // 년 월 일
        return fulldatestr;
    case "datetime" : // 월 일 시 분
        return datetimestr;
    case "fulldatetime" : // 년 월 일 시 분
        return fulldatetimestr;
    case "getTime":
        return date.getTime();
    default :
        return "";
}
}