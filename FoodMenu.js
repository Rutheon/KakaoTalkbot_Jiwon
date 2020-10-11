/*
  지원이의 지원봇
  음식 메뉴 추천
*/

const baseModule = require("baseval.js");
const bv = new baseModule();

const THIS_FILENAME = "FoodMenu";
const ROOM_NAME = "MenuRoom";

const menu = {};

menu.FOOD_PATH = "foodmenu.txt";
menu.NIGHT_PATH = "nightmenu.txt";
menu.SNACK_PATH = "snackmenu.txt";
menu.DRINK_PATH = "drink.txt";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
        var nbmsg = msg.replace(/\s/g, "");
        var cmd = msg.split(" ")[0];
        //var option = msg.split(/ (.+)/)[1].split(" ");

        if (nbmsg == "!점심추천" || nbmsg == "!저녁추천") {
            FoodMenu(menu.FOOD_PATH, replier);
        }

        if (nbmsg == "!야식추천") {
            FoodMenu(menu.NIGHT_PATH, replier);
        }

        if (nbmsg == "!간식추천") {
            FoodMenu(menu.SNACK_PATH, replier);
        }

        if (nbmsg == "!음료추천") {
            FoodMenu(menu.DRINK_PATH, replier);
        }

        if (nbmsg == "!아침추천") {
            Math.floor(Math.random() * 2) ? replier.reply("아침은 그냥 콩나물 국밥이나 드십쇼 형님") : replier.reply("아침은 그냥 오리고기나 드십쇼 형님");
        }

        if (nbmsg == "!디저트추천") {
            replier.reply("디저트는 버블티나 드십쇼");
        }

        if (["!점심추가", "!저녁추가", "!메뉴추가", "!점심메뉴추가", "!저녁메뉴추가"].indexOf(cmd) != -1) {
            AddMenu(msg, menu.FOOD_PATH, replier);
        }

        if (["!야식추가", "!야식메뉴추가"].indexOf(cmd) != -1) {
            AddMenu(msg, menu.NIGHT_PATH, replier);
        }

        if (["!간식추가", "!간식메뉴추가"].indexOf(cmd) != -1) {
            AddMenu(msg, menu.SNACK_PATH, replier);
        }

        if (["!음료추가", "!음료메뉴추가"].indexOf(cmd) != -1) {
            AddMenu(msg, menu.DRINK_PATH, replier);
        }

        if (["!메뉴보기", "!메뉴판보기"].indexOf(cmd) != -1) {
            ShowMenu(replier);
        }
    } catch (e) {
        Log.debug(e + ", line: " + e.lineNumber + " from " + room);
    }
}

function FoodMenu(type, replier) {
    var menulist = bv.ReadList(ROOM_NAME, type);

    if (menulist.length == 0) {
        replier.reply("음...");
        replier.reply("딱히 추천해드릴만한게 없네요... 힝");
    } else {
        let result = Math.floor(Math.random() * menulist.length);
        replier.reply(menulist[result]);
    }
}

function AddMenu(msg, type, replier) {
    let menutoadd = msg.split(/ (.+)/)[1];

    if (menutoadd != "" && menutoadd != null) {
        var menulist = bv.ReadList(ROOM_NAME, type);

        if (menulist.indexOf(menutoadd) == -1) {
            menulist.push(menutoadd);
            bv.WriteList(menulist, ROOM_NAME, type);
            replier.reply(menutoadd + "이(가) 메뉴 목록에 성공적으로 추가되었습니다!");
        } else {
            replier.reply(menutoadd + "은(는) 이미 메뉴 목록에 있습니다.");
        }
    } else {
        replier.reply("명령어 뒤에 음식 이름하고 같이 입력해주세용");
    }
}

function ShowMenu(replier) {
    var str = "🍽 지원봇이 추천하는 모든 음식 메뉴판입니당 🍽" + bv.COMPRESS;

    for (var index in menu) {
        str += "\n\n" + bv.ReadFile(ROOM_NAME, menu[index]);
    }

    replier.reply(str);
}