/*
  지원이의 지원봇
  Main Command
*/

const THIS_FILENAME = "All";
const filepath = "/storage/emulated/0/Documents/KakaoBot/";
const roulpath = "roulette.txt";
const blacklist = ["유학생들모여라"];
const gangroom = ["서지원", "차에탄깡따구"];
const RUSSIANROULETTE_COUNT = 6;

// Main
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        const date = new Date();
        const datestr = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
        const fulldatestr = datestr + date.getHours() + "시 " + date.getMinutes() + "분";

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
        
        if (!(blacklist.indexOf(room) != -1)) {

            //Introduce
            if (["!누구세요", "!명령어"].indexOf(nbcmd) != -1) {
                replier.reply("안녕하세요. 저는 지원이가 만든 지원봇입니다.\n필요한게 있으면 저를 불러보세요. 저는 특히 식사 메뉴 추천에 특화되어 있습니다.\n\n!아침추천 !점심추천 !저녁추천 !야식추천 !간식추천\n!날씨 -> 지역 이름을 넣으면 해당 지역의 날씨를 보여줍니다\n!코로나\n!실검\n!주사위\n!동전던지기\n!골라줘\n!윷놀이\n!러시안룰렛\n!가위바위보 (단, 인성이 터졌으니 주의)\n!나 오늘 생일이야\n\n또한 숨겨진 명령어도 많이 있으니 찾아보시기 바랍니다");

                if (gangroom.indexOf(room) != -1) {
                     replier.reply("그리고 깡따구들을 위한 !깡령어 도 마련되어있드아아앙~");
                }
            }

            //For All    
            if (cmd == "!가위바위보") {
                replier.reply("가위바위보 해요ㅎㅎ\n!가위 !바위 !보\n근데 가끔 제가 변덕이 심할 때가 있으니 양해 부탁드려용");
            }

            if (["!가위", "!바위", "!보"].indexOf(cmd) != -1) {
                let result = Math.floor(Math.random() * 10);

                if (result >= 0 && result <= 2) {
                    replier.reply("가위!");

                    if (cmd == "!가위") {
                        replier.reply("다행히도 당신은 봇과의 가위바위보에서 비기셨습니다");
                    } else if (cmd == "!바위") {
                        replier.reply("이기셨네요. 근데 고작 인공지능 따위한테 이겨서 기분이 좋나요?");
                    } else {
                        replier.reply("안타깝군요. 당신은 고작 인공지능과의 승부에서 처참히 발리셨습니다!");
                    }

                } else if (result >= 3 && result <= 5) {
                    replier.reply("바위!");

                    if (cmd == "!가위") {
                        replier.reply("안타깝군요. 당신은 고작 인공지능과의 승부에서 처참히 발리셨습니다!");
                    } else if (cmd == "!바위") {
                        replier.reply("다행히도 당신은 봇과의 가위바위보에서 비기셨습니다");
                    } else {
                        replier.reply("이기셨네요. 근데 고작 인공지능 따위한테 이겨서 기분이 좋나요?");
                    }

                } else if (result >= 6 && result <= 8) {
                    replier.reply("보!");

                    if (cmd == "!가위") {
                        replier.reply("이기셨네요. 근데 고작 인공지능 따위한테 이겨서 기분이 좋나요?");
                    } else if (cmd == "!바위") {
                        replier.reply("안타깝군요. 당신은 고작 인공지능과의 승부에서 처참히 발리셨습니다!");
                    } else {
                        replier.reply("다행히도 당신은 봇과의 가위바위보에서 비기셨습니다");
                    }

                } else {
                    replier.reply("엥 너따위의 것과는 게임하기 싫어요 ㅋㅅㅋ");
                }
            }

            if (nbcmd == "!주사위") {
                replier.reply("데구르르르르르..... (저 멀리 굴러간다)... 툭");
                let result = Math.floor(Math.random() * 6) + 1;
                java.lang.Thread.sleep(500);
                replier.reply((Math.floor(Math.random() * 2) ? "어? " : "오호.. ") + result + (([1, 3, 6].indexOf(result) != -1) ? "이" : "가") +" 나왔네요");
            }

            if (nbcmd == "!동전던지기") {
                replier.reply("핑! 휘리리리리리리리릭 챱!");
                java.lang.Thread.sleep(500);
                
                if ((Math.floor(Math.random() * 12)) == 7) {
                    replier.reply((Math.floor(Math.random() * 2) ? "엥" : "헐") + " 동전이 옆면으로 세워졌어요!ㄷㄷ");
                } else {
                    replier.reply((Math.floor(Math.random() * 2) ? "어? " : "오호.. ") + ((Math.floor(Math.random() * 2)) ? "앞면" : "뒷면") + "이 나왔네요");
                }
            }

            if (nbcmd == "!윷놀이") {
                replier.reply("휘릭~ 덜그럭");
                replier.reply("빽도!");
                replier.reply("저런! 뒤에 절벽이 있네요. 나가 떨어지십쇼!");
            }

            if (nbcmd == "!섯다") {
                replier.reply("지원봇은 사행성 게임을 지양합니다.");
            }

            if (nbcmd == "!눈물") {
                replier.reply(Math.floor(Math.random() * 2) ? "ㄱㅏ끔은 눈물을 참을 수 없는 ㄴㅐ가 별루ㄷㅏ…\n맘이 ㅇㅏㅍㅏ서….\n소ㄹㅣ치며… 울 수 있ㄷㅏ는건….\n좋은ㄱㅓㅇㅑ…..\nㅁㅓ… 꼭 슬ㅍㅓㅇㅑ만 우는 건 ㅇㅏ니잖ㅇㅏ…^^\n난…눈물ㅇㅣ…. 좋 다….\nㅇㅏ니…\nㅁㅓ리가ㅇㅏ닌….\n맘으로…..우는 ㄴㅐㄱㅏ좋ㄷㅏ….." : "난 우울할 때..빗속에서 『깡』을 춰...\nヽ｀ヽ｀、ヽヽ｀ヽ、ヽ\nヽ｀ヽ｀ヽ、ヽ｀ヽ｀、ヽ\n、ヽ｀、ヽヽ ዽ ヽ｀｀");
            }

            if (nbcmd == "!공부가뭐야") {
                replier.reply("먹는거야?");
            }

            if (nbcmd == "!포항") {
                replier.reply("포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포핳핳항🛳🌊🚢🌊⚓️⛴포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋㅋㅋ🛳🌊포항항항🚢🌊포항항ꉂꉂ(ᵔᗜᵔ*)⛴🛳🌊⚓️🚢🌊⛴포항항항항⛴🌊 포항항ꉂꉂ(ᵔᗜᵔ*)ㅋㅋ");
            }

            if (nbcmd == "!뭐야..") {
                replier.reply("웅성👥👤👥뭐야..👤👥👥👤👥👥👤👥 👤👥👥👥👤👥👤👥👤 뭐야..👥👤👥👤👥👥👤👥👤👥👤👥👤👥👤👥👤👥👥 뭐야..👤👥👤 👤👥👤👥👤👤👥👥👤👥👤👥👤👥👥👤👥웅성웅성..👤👥 👤👥👤👥👤👥👤👥👥👤👥 👤👥👤👥👥👤👥👤👥👤👥 👥👤👥👤뭐야..👥👥👤👥👥👤👥 👤👥👥👥👤👥👤👥👤 👥👤웅성..👥👤👥👥👤👥👤👥👤 👥👤👥👤👥👤👥👥 뭐야..👤👥👤 👤👥👤👥👤👤👥👥 👤");
            }

            if (["!사달러환율", "!사달라", "!4달라", "!사달러", "!4달러", "!사딸라"].indexOf(nbcmd) != -1) {
                let str1 = Utils.getWebText("https://m.search.naver.com/search.naver?query=4달러환율");
                let str2 = str1.split("<span class=\"nb_txt _sub_price\">");
                let str3 = str2[2].split("</span>");

                replier.reply(datestr + " 기준\n" + str3[0].replace(",", "천 ").replace(" 원", "원"));
            }

            //Hidden Command
            if (nbcmd == "!지원이") {
                if (room == "오버액션사랑방") {
                    replier.reply("지원이 아직 스무한짤 술애기에염 뀨><");
                } else {
                    replier.reply("지원이 아직 스무한짤 애기에염 뀨><");
                }
            }

            if (nbcmd == "!엑시트" || msg == "!꺼져") {
                replier.reply("니가 꺼져");
            }

            if (nbcmd == "!바보") {
                replier.reply("힝...");
            }

            if (nbcmd == "!야") {
                replier.reply("외수영장");
            }
        }
        
        // All rooms can access
        if (["!인스타", "!인스타그램", "!지원이인스타"].indexOf(nbcmd) != -1) {
            replier.reply("지원이 인스타 @ziwo.ni_zi");
        }
        
        if (nbcmd == "!나오늘생일이야") {
            replier.reply(sender + "님 생일 축하드립니다!!!!!");
        }

        if (cmd == "!골라줘") {
            let st = Number(option[0]);
            let nd = Number(option[1]);

            if (option[0] == "" || option[0] == null) {
                replier.reply("!골라줘 뒤에 숫자를 두개 입력하면 그 두 숫자 사이 중에 하나를 골라드립니다. 하나만 입력하시면 1부터 그 숫자까지 중에 하나를 골라줘용!");
            } else if (String(st) == "NaN"){
                replier.reply("숫자 두개나 하나를 띄어쓰기 지켜서 입력해주세용");
            } else {
                let count;

                if (String(nd) == "NaN") {
                    count = st;
                    st = 1;

                    if (count <= 1) {
                        replier.reply("1보다 큰 숫자를 입력해주세용");
                        return;
                    }

                } else {
                    count = nd - st + 1;

                    if (count <= 1) {
                        replier.reply("앞에보다 뒤에 더 큰 숫자를 입력해주세용");
                        return;
                    }
                }

                replier.reply("흠... " + sender + "님 저는 " + (st + Math.floor(Math.random() * count)) + "이(가) 좋은거 같아용!");
            }
        }
        
        if (nbcmd.split("!러시안룰렛")[0] == "") {
            let addcmd = nbcmd.replace("!러시안룰렛", "");
            let data = ReadFile(replier, room, roulpath).split(" ");
            let roulcount = Number(data[0]);
            let randpick = Number(data[1]);
            let playedtime = Number(data[2]);
            let nowtime = date.getTime();
            
            let delaytime = 30000 // 30 sec
            
            if (String(roulcount) != "NaN" && String(randpick) != "NaN" && String(playedtime) != "NaN") {
                    if (nbcmd == "!러시안룰렛") {
                        if (nowtime - playedtime > delaytime) { // if the time passed 30 sec since last played
                            if (roulcount > RUSSIANROULETTE_COUNT && roulcount < 1) {
                                roulcount == RUSSIANROULETTE_COUNT;
                            }

                            if (roulcount == RUSSIANROULETTE_COUNT) {
                                randpick = Math.floor(Math.random() * RUSSIANROULETTE_COUNT) + 1;
                            }

                            if (roulcount == randpick) {
                                //당첨
                                replier.reply("🔫 철컥... 탕!");
                                if (room == "차에탄깡따구") { 
                                    replier.reply("털썩... 꿱! 안타깝게도 " + sender + "님은 러시안룰렛에 당첨되셨습니다.");
                                    replier.reply("🔫 러시안룰렛은 다시 처음으로 초기화되었습니다. 다음은 누가 당첨될까요?");
                                } else {
                                    replier.reply("털썩... 꿱! 안타깝게도 " + sender + "님은 러시안룰렛에 당첨되셨습니다. 뒤지십쇼!");
                                    replier.reply("(싸늘한 " + sender + "의 시체에 내리쬐는 ✨화려한 조명✨)");
                                    replier.reply("🔫 러시안룰렛은 다시 처음으로 초기화되었습니다. 다음은 누가 뒤질까요?");
                                }

                                roulcount = RUSSIANROULETTE_COUNT;
                            } else {
                                //꽝
                                replier.reply("🔫 철컥... 탕!");
                                replier.reply("...");

                                roulcount--;
                                replier.reply("다행히도 이번엔 총알이 없었습니다, " + sender + "님!");// (남은 탄창 수: " + roulcount + ")");
                            }
                            
                            let save = roulcount + " " + randpick + " " + nowtime;

                            WriteFile(replier, save, room, roulpath);
                        } else {
                            replier.reply("🔫 러시안룰렛은 " + (delaytime/1000) + "초에 한번씩만 시도할 수 있습니다. 잠시 후에 시도해주시길 바랍니다." + ((delaytime - (nowtime-playedtime))/1000).toFixed() + "초 남음");
                        }
                    } else if (["남은개수", "개수", "남은횟수", "횟수"].indexOf(addcmd) != -1) {
                        replier.reply("🔫 남은 탄창 수: " + roulcount);
                    }
            } else {
                replier.reply("무언가 오류가 있어 러시안룰렛을 실행시키지 못했습니다. 이거 봇만든사람 부르십쇼.");
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