/*
  웹 파싱 명령어
*/

const THIS_FILENAME = "WebCMD";
const filepath = "/storage/emulated/0/Documents/KakaoBot/";
const gangroom = ["차에탄깡따구", "뽀로로와 친구들", "서지원"];

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
        
        /*
        if (nbcmd == "!멜론차트" && room == "서지원") {
            let data = Utils.getWebText("https://www.melon.com/chart/index.htm", "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",false,false);
            let top = [];
            let str = "";
            let isgang = false;
            let gangrank;
            
            replier.repy(data);
            
            top[0] = data.split("id=\"lst50\"");
            top[1] = data.split("id=\"lst100\"");
            
            for (let i = 0; i < top.length; i++) {
                for (let j = 1; j < top[i].length; j++) {
                    let title = top[i][j].split("재생\">")[1].split("<")[0];
                    let singer = top50[i][j].split("class=\"ellipsis rank02\">")[1].split("\">")[1].split("<")[0];
                    replier.reply(title);
                    replier.reply(singer);
                    
                    if (title == "깡") {
                        isgang = true;
                        gangrank = (i ? (j + 50) : j);
                    }
                    
                    if (!(i == 0 && j == 1)) {
                        str += "\n";
                    }
                    str += (i ? (j + 50) : j) + "위 " + singer + " - " + title;
                }
            }
            
            replier.reply(str);
            
            if (isgang && gangroom.indexOf(room) != -1) {
                replier.reply("축하합니다 드디어 깡이 차트인을 하여 " + gangrank + "위에 안착했습니다!!!");
            } else if (!isgang && gangroom.indexOf(room) != -1) {
                replier.reply("안타깝게도 아직 깡은 TOP100에 들지 못했습니다 힝...");
            }
            
            
        }*/
    } catch (e) {
        let str = ReadFile(replier, "log", "errorlog.txt");
        str +=  "\n" + room + ", " + THIS_FILENAME + ", "+ e + ", " + e.lineNumber;
        WriteFile(replier, str, "log", "errorlog.txt");
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
        switch (room) {
            case "오버액션사랑방":
                replier.reply("엥 뭔가 잘못돼서 오액토가 잡아갔어용...");
                break;
            case "차에탄깡따구":
                replier.reply("엥 뭔가 잘못돼서 차에 탔어용...");
                break;
            default:
                replier.reply("엥 뭔가 잘못돼서 정보를 불러올 수 없습니당...");
                break;
        }
        
        let str = ReadFile(replier, "log", "errorlog.txt");
        str +=  "\n" + room + ", " + THIS_FILENAME + ", "+ e + ", " + e.lineNumber;
        WriteFile(replier, str, "log", "errorlog.txt");
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

function ReadFile(replier, room, filename) {
var file = new java.io.File(filepath + room + "/" + filename);

if (!file.exists())
    return null;

var fis = new java.io.FileInputStream(file);
var isr = new java.io.InputStreamReader(fis);
var br = new java.io.BufferedReader(isr);
var line = "";
var str = "";

for (let i = 0; (line = br.readLine()) != null; i++) {
    if (i != 0)
        str += "\n";

    str += line;
}

fis.close();
isr.close();
br.close();

return str;
}

function WriteFile(replier, data, room, filename) {
var file = new java.io.File(filepath + room + "/" + filename);

if (!file.exists())
    return;

var fos = new java.io.FileOutputStream(file);
var content = new java.lang.String(data);

fos.write(content.getBytes());
fos.close();
}