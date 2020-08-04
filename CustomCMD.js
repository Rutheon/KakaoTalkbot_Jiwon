/*
  Custom CMD
*/

const THIS_FILENAME = "CustomCMD";
const filepath = "/storage/emulated/0/Documents/KakaoBot/";
const cmdpath = "cmdlist.txt";
const instapath = "instagramlist.txt";
const alloweduserpath = "alloweduserlist.txt";
const mynamelistpath = "mynamelist.txt";

const roomblacklist = [];
const instaroomblacklist = ["뽀로로와친구들", "차에탄깡따구", "오버액션사랑방"];
const alluser_allowed_room =["뽀로로와친구들"];

const COMPRESS = "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​"; //전체보기 만들기용 투명문자 1000개

function CmdData(c, r) {
    this.c = c;
    this.r = r;
}

function Reply(replier, room, msg, filename) {
    var cmdlist = ReadList(replier, room, "cmdlist", filename);
    
    for (let i = 0; i < cmdlist.length; i++) {
        if (msg == cmdlist[i].c) {
            replier.reply(cmdlist[i].r.replace(/\\n/g, "\n"));
        }
    }
}

// Read File and Return Data
function ReadList(replier, room, type, filename) {
    var file = new java.io.File(filepath + room + "/" + filename);

    if (!file.exists()) {
        l = {};
        
        return l;
    }

    var fis = new java.io.FileInputStream(file);
    var isr = new java.io.InputStreamReader(fis);
    var br = new java.io.BufferedReader(isr);
    var line = "";
    var str = "";
    var list = [];
    var temp = [];

    switch(type) {
        case "cmdlist":
            for (let i = 0; (line = br.readLine()) != null; i++) {
                temp = line.split(/ (.+)/);
                let c = temp[0];
                let r = temp[1];
                list[i] = new CmdData(c, r);
            }

            break;
        case "userlist":
            for (let i = 0; (line = br.readLine()) != null; i++) {
                list[i] = line;
            }

            break;
        default:
            break;
    }

    fis.close();
    isr.close();
    br.close();

    return list;
}

// boolean type false if no file exists
function WriteList(replier, room, type, data, filename) {
    var file = new java.io.File(filepath + room + "/" + filename);

    if (!file.exists())
        return false;

    var str = "";

    for (let i = 0; i < data.length; i++) {
        if (i != 0)
            str += "\n";

        switch(type) {
            case "cmdlist":
                str += (data[i].c + " " + data[i].r);

                break;
            case "userlist":
                str += data[i];

                break;
            default:
                break;
        }
    }

    var fos = new java.io.FileOutputStream(file);
    var content = new java.lang.String(str);

    fos.write(content.getBytes());
    fos.close();
    
    // Back up files
    let backup = ReadFile(replier, "Backup", "backup.txt");
    backup += "\n\n" + str;
    WriteFile(replier, backup, "Backup", "backup.txt");
    
    return true;
}

function AddList(replier, room, msg, filename) {
    var list = msg.split(" ");

    if (list.length > 2 && list[2] != "") {
        let li = msg.replace("!추가 ", "").split(/ (.+)/);
        let cm = li[0];
        let re = li[1];

        if (cm.charAt(0) == "!") {
            let cmdlist = ReadList(replier, room, "cmdlist", filename);
            let isfound = false;

            for (let i = 0; i < cmdlist.length; i++) {
                if (cmdlist[i].c == cm) {
                    isfound = true;
                }
            }

            if (!isfound) {
                let curobj = new CmdData(cm, re);

                cmdlist.push(curobj);
                if (!(WriteList(replier, room, "cmdlist", cmdlist, filename)))
                    return;
                
                replier.reply("명령어가 성공적으로 추가되었습니다.\n명령어: " + cm + "\n대답: " + re);
            } else {
                replier.reply("해당 명령어는 이미 추가되어있습니다.");
            }
        } else {
            replier.reply("명령어는 !으로 시작해야합니다.");
        }
    } else {
        replier.reply("명령어 추가하는 방법\n!추가 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !추가 !지원이는? 지원이는 귀엽다.");
    }
}

function RemoveList(replier, room, msg, filename) {
    var list = msg.split(" ");

    if (list.length > 1 && list[1] != "") {
        var cmd = msg.replace("!제거 ", "").replace("!삭제 ", "");
        var cmdlist = ReadList(replier, room, "cmdlist", filename);
        var isfound = false;
        var numfound;

        for (let i = 0; i < cmdlist.length; i++) {
            if (cmdlist[i].c == cmd) {
                isfound = true;
                numfound = i;

                break;
            }
        }

        if (isfound) {
            let removed = cmdlist.splice(numfound, 1);

            //Update list
            if (!WriteList(replier, room, "cmdlist", cmdlist, filename))
                return;
            
            replier.reply(cmd + " 명령어가 삭제되었습니다. 뾰로롱~!");
        } else {
            replier.reply(cmd + " 명령어는 원래 없었습니다. 헿");
        }

    } else {
        replier.reply("명령어 제거하는 방법\n!제거 명령어 \n\n예) !제거 !햇쨜이강퇴");
    }
}

function ShowList(replier, room, filename) {
    var cmdlist = ReadList(replier, room, "cmdlist", filename);
    var str = "";

    for (let i = 0; i < cmdlist.length; i++) {
        if (i != 0)
            str += "\n";

        str += (cmdlist[i].c + " " + cmdlist[i].r);
    }

    replier.reply("🍎🍑 명령어 목록 🍎🍑" + COMPRESS + "\n\n" + str);
}

function AddUser(replier, room, user, filename) {
    var userlist = ReadList(replier, room, "userlist", filename);

    userlist.push(user);

    if(!WriteList(replier, room, "userlist", userlist, filename)) {
        return;
    } else {
        replier.reply(user + "님이 성공적으로 관리자목록에 추가되었습니다.");
    }
}

function RemoveUser(replier, room, user, filename) {
    var ulist = ReadList(replier, room, "userlist", filename);
    var isfound = false;
    var numfound;

    for (let i = 0; i < ulist.length; i++) {
        if (ulist[i] == user) {
            isfound = true;
            numfound = i;

            break;
        }
    }

    if (isfound) {
        let removed = ulist.splice(numfound, 1);

        //Update list
        if(!WriteList(replier, room, "userlist", ulist, filename)){
            return;
        } else{
            replier.reply(user + "님은 관리자 목록에서 제거되었습니다.");
        }
    } else {
        replier.reply(user + "님은 관리자 목록에서 이미 없습니다.");
    }
}
                
function ShowUser(replier, room, filename) {
    var userlist = ReadList(replier, room, "userlist", filename);
    var str = "";

    for (let i = 0; i < userlist.length; i++) {
        if (i != 0)
            str += "\n";

        str += userlist[i];
    }

    replier.reply("🍎🍑 관리자 목록 🍎🍑" + COMPRESS + "\n\n" + str);
}

// Main
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        var list = msg.split(" ");
        var cmd = list[0];
        var option = [];
        var nbcmd = msg.replace(/\s/g, "");
        var nbsender = sender.replace(/\s/g, "");

        // options after cmd
        for (let i = 0; i < list.length; i++) {
            if (i != 0) {
                option[i-1] = list[i];
            }
        }

        if (nbcmd == "!명령어추가") {
            replier.reply("명령어 추가하는 방법\n!추가 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !추가 !지원이는? 지원이는 귀엽다.");
        }

        if (nbcmd == "!명령어제거") {
            replier.reply("명령어 제거하는 방법\n!제거 명령어 \n\n예) !제거 !햇쨜이강퇴");
        }

        var userlist = ReadList(replier, room, "userlist", alloweduserpath);
        var mynamelist = ReadList(replier, "서지원", "userlist", mynamelistpath);
        
        Reply(replier, room, nbcmd, cmdpath);
        Reply(replier, room, nbcmd, instapath);

        /*
          Allowd USER List
        */

        if (mynamelist.indexOf(nbsender) != -1) {
            if (cmd == "!관리자추가") {
                AddUser(replier, room, option[0], alloweduserpath);
            }

            if (cmd == "!관리자제거") {
                RemoveUser(replier, room, option[0], alloweduserpath);
            }

            if (nbcmd == "!관리자목록") {
                ShowUser(replier, room, alloweduserpath);
            }
        } else {
            if (["!관리자추가", "!관리자제거"].indexOf(cmd) != -1 || nbcmd == "!관리자목록") {
                replier.reply("지원이만 할 수 있습니다.");
            }
        }

        /*
          My name List
        */

        if (room == "서지원") {
            if (cmd == "!내이름추가") {
                AddUser(replier, room, option[0], mynamelistpath);
            }

            if (cmd == "!내이름제거") {
                RemoveUser(replier, room, option[0], mynamelistpath);
            }

            if (nbcmd == "!내이름목록") {
                ShowUser(replier, room, mynamelistpath);
            }
        }

        /*
          CMD List
        */

        // Only allowd user can access
        if (userlist.indexOf(nbsender) != -1 || alluser_allowed_room.indexOf(room) != -1) {
            if (cmd == "!추가") {
                AddList(replier, room, msg, cmdpath);
            }

            if (["!제거", "!삭제"].indexOf(cmd) != -1) {
                RemoveList(replier, room, msg, cmdpath);
            }

        } else {
            if (["!추가", "!제거", "!삭제"].indexOf(cmd) != -1) {
                replier.reply("Access Denied. Authorized Personnel Only");
            }
        }

        // Anyone can access
        if (["!명령어보기", "!명령어목록", "!명령어목록보기"].indexOf(nbcmd) != -1) {
            ShowList(replier, room, cmdpath);
        }

        // INSTAGRAM CMD
        if (instaroomblacklist.indexOf(room) == -1) { // if instagram not blacked
            if (nbcmd == "!인스타추가") {
                replier.reply("인스타 추가하는 방법\n!추가 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !인스타추가 !지원이인스타 @ziwo.ni_zi");
            }

            if (userlist.indexOf(nbsender) != -1 || alluser_allowed_room.indexOf(room) != -1) {
                if (cmd == "!인스타추가") {
                    msg = msg.replace("!인스타추가", "!추가");
                    AddList(replier, room, msg, instapath);
                }

                if (["!인스타제거", "!인스타삭제"].indexOf(cmd) != -1) {
                    msg = msg.replace("!인스타제거", "!제거").replace("!인스타삭제", "!삭제");
                    RemoveList(replier, room, msg, instapath);
                }
            } else {
                if (["!인스타추가", "!인스타제거"].indexOf(cmd) != -1) {
                    replier.reply("Access Denied. Authorized Personnel Only");
                }
            }

            //모두 다 할 수 있음    
            if (["!인스타보기", "!인스타목록", "!인스타목록보기"].indexOf(nbcmd) != -1) {
                ShowList(replier, room, instapath);
            }
        }
    } catch (e) {
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