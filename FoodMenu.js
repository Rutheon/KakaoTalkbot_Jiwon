/*
  지원이의 지원봇
  음식 메뉴 추천
*/

const THIS_FILENAME = "FoodMenu";
const filepath = "/storage/emulated/0/Documents/KakaoBot/";
const foldername = "FoodMenu";

function FoodMenu(type, replier) {
    var file = new java.io.File(filepath + type);

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
        
        if (["!점심추가", "!저녁추가", "!메뉴추가"].indexOf(cmd) != -1) {
            let foodlist = ReadFile(replier, foldername, "foodmenu.txt");
        }
    } catch (e) {
        let str = ReadFile(replier, "log", "errorlog.txt");
        str +=  "\n" + room + ", " + THIS_FILENAME + ", "+ e + ", " + e.lineNumber;
        WriteFile(replier, str, "log", "errorlog.txt");
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