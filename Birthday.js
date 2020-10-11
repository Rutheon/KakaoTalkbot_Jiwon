/*
  생일축하하기
  CustomCMD.js에서 추가한 생일목록 기반
*/

const baseModule = require("baseval.js");
const dateModule = require("date.js");

const bv = new baseModule();
const date = new dateModule();

const THIS_FILENAME = "Birthday";
const ROOM_LIST = ["서지원", "유학생들모여라", "뽀로로와친구들"];
const birthdaypath = "birthdaypath.txt";
const iscelpath = "iscelebrated.txt";

// 오전에 한번, 오후에 한번 생일축하
const prevampm = {};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if (ROOM_LIST.indexOf(room) == -1) {
            return;
        }

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

        // 오전 오후인지 구별
        var isam = (date.getDate("hour")/12 < 1) ? true : false;

        // false 0, true 1
        var isdone = bv.ReadFile(room, iscelpath);
        // 최초 실행시 초기화
        if (isdone == "")
            isdone = "0";

        if (prevampm[room] == null)
            prevampm[room] = isam;
        
        // 오전 오후가 바뀔때마다 초기화
        if (prevampm[room] != isam) {
            isdone = "0";
        }

        if (isdone == "0") {
            let datalist = ReadList(room);
            let blist = [];

            datalist.forEach(function(value) {
                if (value.reply == date.getDate("month_day")) {
                    blist.push(value.cmd);
                }
            });

            if (blist != null) {
                blist.forEach(function(value) {
                    let name = value.replace("!", "").replace("생일", "");
                    let bmsg = "🥳🎉";

                    for (let i = 0; i < 50; i++) {
                        bmsg += (name + "님의 생일을 축하합니다!! 🥳🎂🎁🎈🎉🕯🍰");
                    }

                    replier.reply("🥳🎉오늘 " + date.getDate("month_day") + "은 " + name + "님의 생일입니다! 다들 격하게 생일을 축하해주시길 바랍니다~~🥳🎉\n\n혹시라도 " + name + "님이 이 메시지를 못 볼 수 있으니 @ 언급으로 알려주시길 바랍니당!\n\n만약 " + name + "님이 방을 이미 나가신 경우에는 개인톡으로 축하해주시면 감사하겠습니다😀");
                    replier.reply(bmsg);
                });
            }
            
            isdone = "1";
        }

        prevampm[room] = isam;
        bv.WriteFile(isdone, room, iscelpath);
    } catch(e) {
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function ReadList(room) {
    var list = bv.ReadList(room, birthdaypath);
    var flist = [];

    list.forEach(function(value, index) {
        let temp = value.split(/ (.+)/); 
        flist[index] = {cmd: temp[0], reply: temp[1]}; 
    });

    return flist;
}