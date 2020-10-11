/*
  Custom CMD
*/

const THIS_FILENAME = "CustomCMD";
const FILE_PATH = "/storage/emulated/0/KakaobotData";
const cmdpath = "cmdlist.txt";
const instapath = "instagramlist.txt";
const birthdaypath = "birthdaypath.txt";
const alloweduserpath = "alloweduserlist.txt";
const mynamelistpath = "mynamelist.txt";

const roomblacklist = [];
const MASTER_ROOM = "서지원";
const instaroom_blacklist = ["뽀로로와친구들", "차에탄깡따구", "오버액션사랑방", "키보드팬들모여라"];
const birthday_blacklist = ["차에탄깡따구"];
const alluser_allowed_room =["뽀로로와친구들"];

const COMPRESS = "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​"; //자세히 보기 만들기 투명문자 1000개
const hello_delay = 7000;  // 7 sec
const hello_time = {};

function CmdData(c, r) {
    this.c = c;
    this.r = r;
}

function Reply(replier, sender, room, msg, filename) {
    var cmdlist = ReadList(replier, room, "cmdlist", filename);
    
    for (let i = 0; i < cmdlist.length; i++) {
        if (msg == cmdlist[i].c) {
            if (["!인사"].indexOf(msg) != -1) {   //!인사 연속으로 반복 도배 방지
                if (hello_time[room] == null || hello_time[room] == undefined)
                    hello_time[room] = 0;

                if (Number(gDate("getTime")) - hello_time[room] > hello_delay) {
                    replier.reply(cmdlist[i].r.replace(/\\n/g, "\n").replace(/\\z/g, COMPRESS).replace(/\\u/g, sender)); // \n는 enter, \z는 자세히보기, \u는 입력한 사람 이름
                    hello_time[room] = gDate("getTime");
                } else {
                    replier.reply("skipped");
                }
            } else {
                replier.reply(cmdlist[i].r.replace(/\\n/g, "\n").replace(/\\z/g, COMPRESS).replace(/\\u/g, sender));
            }
            
        }
    }
}

// Read File and Return Data
function ReadList(replier, room, type, filename) {
    var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

    if (!file.exists()) {
        let newfile = file.createNewFile();
        l = [];
        
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
    var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

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
    const backupfilename = (gDate("fulldate") + "_" + room + "backup.txt").replace(/\s/g, "_");
    let backup = ReadFile(replier, "Backup", backupfilename);

    if (backup != "")
        backup += "\n\n";

    backup += gDate("fulldatetime") + "\n" + str;

    WriteFile(replier, backup, "Backup", backupfilename);
    
    return true;
}

function AddList(replier, room, msg, filename) {
    var list = msg.split(" ");

    if (list.length > 2 && list[2] != "") {
        let li = msg.split(/ (.+)/)[1].split(/ (.+)/);

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
                if (filename == birthdaypath) {
                    let f = re.split("월")[0];
                    let sli = re.split("월")[1].split("일");

                    if (!sli[0].startsWith(" ")) {
                        replier.reply("띄어쓰기 지켜서 \"X월 X일\"의 형식으로 입력해주세요");
                        return;
                    } else if (toString(Number(f)) == "NaN" || toString(Number(sli[0])) == "NaN" || sli[1] != "" || sli.length != 2) {
                        replier.reply("띄어쓰기 지켜서 \"X월 X일\"의 형식으로 입력해주세요");
                        return;
                    } else if (!(Number(f) >= 1) || !(Number(f) <= 12) || !(Number(sli[0]) >= 1) || !(Number(sli[0]) <= 31)) {
                        replier.reply("띄어쓰기 지켜서 \"X월 X일\"의 형식으로 입력해주세요");
                        return;
                    }
                }

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
        if (msg.startsWith("!인스타추가"))
            replier.reply("인스타 추가하는 방법\n!인스타추가 !명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !인스타추가 !지원이인스타 @ziwo.ni_zi");
        else if (msg.startsWith("!생일추가"))
            replier.reply("생일 추가하는 방법\n!생일추가 !명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n또한 무조건 \"X월 X일\"의 형태로 입력해야함 안하면 에러나니깐 꼭 지키셈 validation 코드 짜기 개귀찮아 에러나면 책임안짐 ㅅㄱ\n예) !생일추가 !지원이생일 2월 9일");
        else
            replier.reply("명령어 추가하는 방법\n!추가 !명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !추가 !지원이는? 지원이는 귀엽다.");
    }
}

function RemoveList(replier, room, msg, filename) {
    var list = msg.split(" ");

    if (list.length > 1 && list[1] != "") {
        var cmd = msg.split(/ (.+)/)[1];
        
        if (cmd.charAt(0) != "!")
            cmd = "!" + cmd;

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
        if (msg.startsWith("!인스타제거") || msg.startsWith("!인스타삭제"))
            replier.reply("인스타 제거하는 방법\n!인스타제거 !명령어 \n\n예) !인스타제거 !햇쨜이인스타");
        else if (msg.startsWith("!인스타제거") || msg.startsWith("!인스타삭제"))
            replier.reply("생일 제거하는 방법\n!생일제거 !명령어 \n\n예) !생일제거 !햇쨜이생일");
        else
            replier.reply("명령어 제거하는 방법\n!제거 !명령어 \n\n예) !제거 !햇쨜이강퇴");
    }
}

function ChangeList(replier, room, msg, filename) {
    var list = msg.split(" ");

    if (list.length > 2 && list[2] != "") {
        var li = msg.split(/ (.+)/)[1].split(/ (.+)/);
        var cm = li[0];
        var re = li[1];

        if (cm.charAt(0) == "!") {
            let cmdlist = ReadList(replier, room, "cmdlist", filename);
            let isfound = false;
            let numfound;

            for (let i = 0; i < cmdlist.length; i++) {
                if (cmdlist[i].c == cm) {
                    isfound = true;
                    numfound = i;
                }
            }

            if (filename == birthdaypath) {
                let f = re.split("월")[0];
                let sli = re.split("월")[1].split("일");

                if (toString(Number(f)) == "NaN" || toString(Number(sli[0])) == "NaN" || sli[1] != "") {
                    replier.reply("띄어쓰기 지켜서 \"X월 X일\"의 형식으로 입력해주세요");
                    return;
                } else if (!sli[0].startsWith(" ")) {
                    replier.reply("띄어쓰기 지켜서 \"X월 X일\"의 형식으로 입력해주세요");
                    return;
                }
            }

            if (isfound) {
                cmdlist[numfound].r = re;
                if (!(WriteList(replier, room, "cmdlist", cmdlist, filename)))
                    return;

                replier.reply("명령어를 성공적으로 변경하였습니다!!\n명령어: " + cm + "\n대답: " + re);
            } else {
                let curobj = new CmdData(cm, re);

                cmdlist.push(curobj);
                if (!(WriteList(replier, room, "cmdlist", cmdlist, filename)))
                    return;
                
                replier.reply("해당 명령어가 존재하지 않아 새로 추가하였습니다.\n명령어: " + cm + "\n대답: " + re);
            }
        } else {
            replier.reply("명령어는 !으로 시작해야합니다.");
        }
    } else {
        if (msg.startsWith("!인스타변경"))
            replier.reply("인스타 변경하는 방법\n!인스타변경 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !인스타변경 !지원이인스타 @ziwo.ni_zi");
        else if (msg.startsWith("!생일변경"))
            replier.reply("생일 변경하는 방법\n!생일변경 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n또한 무조건 \"X월 X일\"의 형태로 입력해야함 안하면 에러나니깐 꼭 지키셈 validation 코드 짜기 개귀찮아 에러나면 책임안짐 ㅅㄱ\n예) !생일변경 !지원이생일 2월 9일");
        else
            replier.reply("명령어 변경하는 방법\n!변경 명령어 대답\n\n단, 명령어 부분은 절대 띄어쓰기하면 안됨 어차피 나중에 명령어 띄어쓰기 해서 입력해도 인식함\n예) !변경 !지원이는? 지원이는 귀엽다.");
    }
}

function ShowList(replier, room, filename) {
    var cmdlist = ReadList(replier, room, "cmdlist", filename);
    var str = "";

    if (filename == birthdaypath) {
        cmdlist.sort(function(a, b) {
            let ali = a.r.replace("월", "").replace("일", "").split(" ");
            let bli = b.r.replace("월", "").replace("일", "").split(" ");

            if (ali[0] == bli[0]) {
                return Number(ali[1]) - Number(bli[1]);
            } else {
                return Number(ali[0]) - Number(bli[0]); 
            }
        });
    }

    for (let i = 0; i < cmdlist.length; i++) {
        if (i != 0)
            str += "\n\n";

        if (["!공지", "!인사"].indexOf(cmdlist[i].c) != -1 || cmdlist[i].r.length > 99)
            str += ("📌명령어: " + cmdlist[i].c + " 📌너무 기니깐 직접 명령어를 입력해서 확인하세요");
        else
            str += ("📌명령어: " + cmdlist[i].c + " 📌대답: " + cmdlist[i].r);
    }

    if (filename == instapath)
        replier.reply("🐋🌊 인스타그램 아이디 모음 🌊🐋" + COMPRESS + "\n\n" + str);
    else if (filename == birthdaypath)
        replier.reply("🎉🥳 생일 모음 🥳🎉" + COMPRESS + "\n\n" + str);
    else 
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
        msg = msg.replace(/\n/g, "\\n");
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
        var mynamelist = ReadList(replier, MASTER_ROOM, "userlist", mynamelistpath);
        
        Reply(replier, sender, room, nbcmd, cmdpath);
        Reply(replier, sender, room, nbcmd, instapath);
        Reply(replier, sender, room, nbcmd, birthdaypath);

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

        if (room == MASTER_ROOM) {
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

        // Only allowed user can access
        if (userlist.indexOf(nbsender) != -1 || alluser_allowed_room.indexOf(room) != -1) {
            if (cmd == "!추가") {
                AddList(replier, room, msg, cmdpath);
            }

            if (["!제거", "!삭제"].indexOf(cmd) != -1) {
                RemoveList(replier, room, msg, cmdpath);
            }

            if (cmd == "!변경") {
                ChangeList(replier, room, msg, cmdpath);
            }

        } else {
            if (["!추가", "!제거", "!삭제", "!변경"].indexOf(cmd) != -1) {
                replier.reply("Access Denied. Authorized Personnel Only");
            }
        }

        // Anyone can access
        if (["!명령어보기", "!명령어목록", "!명령어목록보기", "!명령어모음"].indexOf(nbcmd) != -1) {
            ShowList(replier, room, cmdpath);
        }

        // Instagram CMD
        if (instaroom_blacklist.indexOf(room) == -1) { // if instagram not blacked
            if (userlist.indexOf(nbsender) != -1 || alluser_allowed_room.indexOf(room) != -1) {
                if (cmd == "!인스타추가") {
                    AddList(replier, room, msg, instapath);
                }

                if (["!인스타제거", "!인스타삭제"].indexOf(cmd) != -1) {
                    RemoveList(replier, room, msg, instapath);
                }

                if (cmd == "!인스타변경") {
                    ChangeList(replier, room, msg, instapath);
                }
            } else {
                if (["!인스타추가", "!인스타제거", "!인스타삭제", "!인스타변경"].indexOf(cmd) != -1) {
                    replier.reply("Access Denied. Authorized Personnel Only");
                }
            }

            //Anyone can access  
            if (["!인스타보기", "!인스타목록", "!인스타목록보기", "!인스타모음"].indexOf(nbcmd) != -1) {
                ShowList(replier, room, instapath);
            }
        }
        
        // Birthday CMD
        if (birthday_blacklist.indexOf(room) == -1) { // if instagram not blacked
            if (userlist.indexOf(nbsender) != -1 || alluser_allowed_room.indexOf(room) != -1) {
                if (cmd == "!생일추가") {
                    AddList(replier, room, msg, birthdaypath);
                }

                if (["!생일제거", "!생일삭제"].indexOf(cmd) != -1) {
                    RemoveList(replier, room, msg, birthdaypath);
                }

                if (cmd == "!생일변경") {
                    ChangeList(replier, room, msg, birthdaypath);
                }
            } else {
                if (["!생일추가", "!생일제거", "!생일삭제", "!생일변경"].indexOf(cmd) != -1) {
                    replier.reply("Access Denied. Authorized Personnel Only");
                }
            }

            //Anyone can access  
            if (["!생일보기", "!생일목록", "!생일목록보기", "!생일모음"].indexOf(nbcmd) != -1) {
                ShowList(replier, room, birthdaypath);
            }
        }

    } catch (e) {
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

function ReadFile(replier, room, filename) {
    var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

    if (!file.exists()){
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

function WriteFile(replier, data, room, filename) {
    var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

    if (!file.exists())
        return;

    var fos = new java.io.FileOutputStream(file);
    var content = new java.lang.String(data);

    fos.write(content.getBytes());
    fos.close();
}