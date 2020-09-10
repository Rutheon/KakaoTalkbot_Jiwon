/*
  지원이의 지원봇
  Main Command
*/

const THIS_FILENAME = "All";
const filepath = "/storage/emulated/0/KakaobotData";
const hellocountpath = "hellocount.txt";
const hellocount_allowed_room =["유학생들모여라", "서지원"];

const MASTER_ROOM = "서지원"; // master room
const blacklist = ["키보드팬들모여라"]; 
const gangroom = ["서지원", "차에탄깡따구"];

var ison = false;

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
        var nbsender = sender.replace(/\s/g, "");

        // options after cmd divided by space
        for (let i = 0; i < list.length; i++) {
            if (i != 0) {
                option[i-1] = list[i];
            }
        }

        /*
          CMD starts
        */
        
        // No Access for blacklisted rooms
        if (!(blacklist.indexOf(room) != -1)) {
            if (["!누구세요", "!명령어"].indexOf(nbcmd) != -1) {
                replier.reply("안녕하세요. 저는 지원이가 만든 지원봇입니다.\n필요한게 있으면 저를 불러보세요.\n\n!아침추천 !점심추천 !저녁추천 !야식추천 !간식추천\n!날씨 -> 지역 이름을 넣으면 해당 지역의 날씨를 보여줍니다\n!코로나 !실검\n!주사위 !동전던지기 !골라줘\n!윷놀이 !러시안룰렛\n!가위 !바위 !보 -> 가위바위보 하기\n!나 오늘 생일이야");

                if (gangroom.indexOf(room) != -1) {
                     replier.reply("그리고 깡따구들을 위한 !깡령어 도 마련되어있드아아앙~");
                }
            }
    
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
        
        if (nbcmd == "!점심추천" || nbcmd == "!저녁추천") {
            FoodMenu("foodmenu.txt", replier);
        }

        if (nbcmd == "!야식추천") {
            FoodMenu("nightmenu.txt", replier);
        }

        if (nbcmd == "!간식추천") {
            FoodMenu("snackmenu.txt", replier);
        }

        if (nbcmd == "!음료추천") {
            FoodMenu("drink.txt", replier);
        }

        if (nbcmd == "!아침추천") {
            replier.reply("아침은 그냥 콩나물 국밥이나 드십쇼 형님");
        }

        if (nbcmd == "!디저트추천") {
            replier.reply("디저트는 버블티나 드십쇼");
        }

        if (nbcmd == "!아침추천이유") {
            replier.reply("지원이가 고1때 미국 오기 전에 한국에서 마지막으로 먹었던 아침식사가 콩나물 국밥이었기 때문입니당");
        }
        
       // if (["!점심추가", "!저녁추가", "!메뉴추가"].indexOf(cmd) != -1) {
      //      let foodlist = ReadFile(replier, foldername, "foodmenu.txt");
      //  }
        
        //MasterRoom Only
        if (room == MASTER_ROOM) {
            if (ison)
              replier.reply(msg.replace(/\n/g, "\\n"));
              
            if (msg == "/on")
            ison = true;
            else if (msg == "/off")
            ison = false;
        }
    } catch (e) {
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

function FoodMenu(type, replier) {
    var file = new java.io.File(filepath + "/" + type);

    if (!file.exists()) {
        replier.reply("음...");
        replier.reply("딱히 추천해드릴만한게 없네요 힝");

        return;
    }

    var fis = new java.io.FileInputStream(file);
    var isr = new java.io.InputStreamReader(fis);
    var br = new java.io.BufferedReader(isr);
    var line = "";
    var menulist = [];

    for (let i = 0; (line = br.readLine()) != null; i++) {
        menulist[i] = line;
    }

    if (menulist.length != 0) {
        let result = Math.floor(Math.random() * menulist.length);
        replier.reply(menulist[result]);
    } else {
        replier.reply("음...");
        replier.reply("딱히 추천해드릴만한게 없네요 힝");
    }

    fis.close();
    isr.close();
    br.close();    
}