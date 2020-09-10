/*
  Russian Roulette CMD
  아직 정상적으로 작동하는지는 테스트하지 않았습니다
*/

const THIS_FILENAME = "RUSSIAN_ROULETTE";
const filepath = "/storage/emulated/0/KakaobotData";
const mynamelistpath = "mynamelist.txt";

const RUSSIANROULETTE_COUNT = 6;
const DEFAULT_TIME = 30000; // 30sec default

// 새로 컴파일 하면 초기화되니 유의
const roulcount = {};
const randpick = {};
const playedtime = {};
const roul_delay = {}; 

const master_room = "서지원";
const blacklist = ["키보드팬들모여라"];

// Main
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        if (blacklist.indexOf(room) != -1)
            return;
            
        const date = new Date();

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
        
        var mynamelist = ReadList(replier, master_room, mynamelistpath);

        if (nbcmd.split("!러시안룰렛")[0] == "") {
            let addcmd = nbcmd.replace("!러시안룰렛", "");

            if (roulcount[room] == null || roulcount[room] == undefined)
                roulcount[room] = RUSSIANROULETTE_COUNT;

            if (playedtime[room] == null || playedtime[room] == undefined)
                playedtime[room] = 1;
            
            
            if (roul_delay[room] == null || roul_delay[room] == undefined) {
                roul_delay[room] = DEFAULT_TIME; 
            }
            
            if (nbcmd == "!러시안룰렛") {
                if (date.getTime() - playedtime[room] > roul_delay[room]) {
                    if (roulcount[room] > RUSSIANROULETTE_COUNT && roulcount[room] < 1) {
                        roulcount[room] == RUSSIANROULETTE_COUNT;
                    }

                    if (roulcount[room] == RUSSIANROULETTE_COUNT || randpick[room] == null || randpick[room] == undefined) {
                        randpick[room] = Math.floor(Math.random() * RUSSIANROULETTE_COUNT) + 1;
                        Api.replyRoom(master_room, room + " 러시안룰렛 당첨번호: " + randpick[room]);
                    }

                    if (roulcount[room] == randpick[room]) {
                        //당첨
                        replier.reply("🔫 철컥... 탕!");
                        if (room == "차에탄깡따구") { 
                            replier.reply("털썩... 꿱! 안타깝게도 " + sender + "님은 러시안룰렛에 당첨되셨습니다. 러시안룰렛은 다시 처음으로 초기화되었습니다. 다음은 누가 당첨될까요?");
                        } else {
                            replier.reply("털썩... 꿱! 안타깝게도 " + sender + "님은 러시안룰렛에 당첨되셨습니다. 뒤지십쇼! (싸늘한 " + sender + "의 시체에 내리쬐는 ✨화려한 조명) 러시안룰렛은 다시 처음으로 초기화되었습니다. 다음은 누가 뒤질까요?");
                        }

                        roulcount[room] = RUSSIANROULETTE_COUNT;
                    } else {
                        //꽝
                        replier.reply("🔫 철컥... 탕!");

                        roulcount[room]--;
                        replier.reply("다행히도 이번엔 총알이 없었습니다, " + sender + "님! (남은 탄창 수: " + roulcount[room] + ")");
                    }

                    playedtime[room] = date.getTime();
                } else {
                    replier.reply("🔫 러시안룰렛은 " + (roul_delay[room]/1000) + "초에 한번씩만 시도할 수 있습니다. 잠시 후에 시도해주시길 바랍니다. " + ((roul_delay[room] - (date.getTime()-playedtime[room]))/1000).toFixed() + "초 남음");
                }
            } else if (["남은개수", "개수", "남은횟수", "횟수"].indexOf(addcmd) != -1) {
                replier.reply("🔫 남은 탄창 수: " + roulcount[room]);
            } else if (["초기화", "리셋"].indexOf(addcmd) != -1) {
                roulcount[room] = RUSSIANROULETTE_COUNT;

                replier.reply("러시안룰렛이 초기화되었습니다. 혹시라도 러시안 룰렛 게임을 악의적으로 엎어버릴 용도로 사용할 시에는 산책이 주어집니다");
            } else if (cmd == "!러시안룰렛시간설정") {
                if (mynamelist.indexOf(nbsender) != -1) {
                    if (String(Number(option[0])) != "NaN") {
                        roul_delay[room] = Number(option[0]) * 1000;
                        replier.reply((roul_delay[room]/1000) + "초로 러시안룰렛 대기시간 설정 완료");
                    } else {
                        replier.reply("제대로 입력해주세요");
                    }
                } else {
                    replier.reply("지원이만 할 수 있습니다");
                }
            } else if (nbcmd == "!러시안룰렛대기시간") {
                replier.reply("러시안룰렛 대기시간: " + (roul_delay[room]/1000) + "초");
            }
        }
    } catch (e) {
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function ReadList(replier, room, filename) {
    var file = new java.io.File(filepath + "/" + room + "/" + filename);

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

    for (let i = 0; (line = br.readLine()) != null; i++) {
        list[i] = line;
    }

    fis.close();
    isr.close();
    br.close();

    return list;
}