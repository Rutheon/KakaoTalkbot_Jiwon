/*
  삼백플 스택쌓기
  채팅이 300회가 쌓일 때 마다 ㅅㅂㅍ이라는 알림을 보냅니다.
*/

const THIS_FILENAME = "SBP";
const filepath = "/storage/emulated/0/KakaobotData";

const MASTER_ROOM = "서지원"; // master room

const count300 = {}; // for chats counting 300+
const count300_blacklist = ["오버액션사랑방", "키보드팬들모여라"];
const count300_swear_room = ["유학생들모여라"];
const count300path = "count300.txt";
const count300timepath = "count300time.txt";

// Main
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if (count300_blacklist.indexOf(room) != -1) {
            return;
        }

        const date = new Date();
        const datestr = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
        const fulldatestr = datestr + date.getHours() + "시 " + date.getMinutes() + "분";

        var list = msg.split(" ");
        var cmd = list[0];
        var option = [];
        var nbcmd = msg.replace(/\s/g, "");
        var nbsender = sender.replace(/\s/g, "");

        // options after cmd divided by space
        for (let i = 0; i < list.length; i++) {
            if (i != 0) {
                option[i-1] = list[i];
            }
        }

        if (count300[room] == null) {
            count300[room] = 1;
        } else {
            count300[room]++;
        }

        if (count300[room] > 300) {
            let tempcount = ReadFile(room, count300path);
            let time = ReadFile(room, count300timepath);
            let allcount;

            if (tempcount == "" || tempcount == null || tempcount == undefined)
                allcount = 0;
            else
                allcount = Number(tempcount);

            if (allcount == 0) {
                time = date.getTime();
                WriteFile(time, room, count300timepath);
            }

            count300[room] = 0;
            allcount = allcount + 1;
            WriteFile(allcount, room, count300path);

            replier.reply("ㅅㅂㅍx" + allcount);

            if (Number.isInteger(allcount/10)) {
                let timediff = date.getTime() - Number(time);
                let inithour = Math.trunc(timediff/1000/3600);
                let initmin = Math.trunc((timediff - (inithour*3600*1000)) / 1000 / 60);
                let initday;

                if (inithour > 23) {
                    initday = Math.trunc(timediff/1000/3600/24);
                    inithour = inithour - initday*24;
                } else {
                    initday = 0;
                }
                
                if (allcount == 300)
                    replier.reply("🎉 ㅅㅂㅍ이 드디어 ㅅㅂㅍ이 됐당! 🎉");
                    
                replier.reply("삼백플 " + allcount + "번째 달성 축하드립니당 ~~ 🥳🎉");

                if (initday == 0)
                    replier.reply("여러분은 " + inithour + "시간 " + initmin + "분 동안 최소 " + (300 * allcount) + "번 이상 채팅을 쳤습니다!!");
                else
                    replier.reply("여러분은 " + initday + "일 " + inithour + "시간 " + initmin + "분 동안 최소 " + (300 * allcount) + "번 이상 채팅을 쳤습니다!!");
            } 
        }
    } catch(e) {
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function ReadFile(room, filename) {
    var file = new java.io.File(filepath + "/" + room + "/" + filename);

    if (!file.exists()) {
        let newfile = file.createNewFile();
        l = "";
        
        return l;
    }

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

function WriteFile(data, room, filename) {
    var file = new java.io.File(filepath + "/" + room + "/" + filename);

    if (!file.exists())
        return;

    var fos = new java.io.FileOutputStream(file);
    var content = new java.lang.String(data);

    fos.write(content.getBytes());
    fos.close();
}