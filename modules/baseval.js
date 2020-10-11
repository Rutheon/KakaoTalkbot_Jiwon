const FPATH = "/storage/emulated/0/KakaobotData";

module.exports = (function() {
    function ex() {}

    ex.prototype.FILE_PATH = FPATH;
    ex.prototype.MASTER_ROOM = "서지원";    // Master Room
    ex.prototype.COMPRESS = "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";    //자세히 보기 만들기 투명문자 1000개;

    ex.prototype.ReadFile = function(room, filename) {
        let file = new java.io.File(FPATH + "/" + room + "/" + filename);

        if (!file.exists()) {
            let newfile = file.createNewFile();
            
            return "";
        }
    
        let fis = new java.io.FileInputStream(file);
        let isr = new java.io.InputStreamReader(fis);
        let br = new java.io.BufferedReader(isr);
        let line = "";
        let str = "";
    
        for (let i = 0; (line = br.readLine()) != null; i++) {
            if (i != 0)
                str += "\n";
    
            str += line;
        }
    
        fis.close();
        isr.close();
        br.close();
    
        return str;
    };

    ex.prototype.WriteFile = function(data, room, filename) {
        let file = new java.io.File(FPATH + "/" + room + "/" + filename);

        if (!file.exists())
            return;
    
        let fos = new java.io.FileOutputStream(file);
        let content = new java.lang.String(data);
    
        fos.write(content.getBytes());
        fos.close();
    };

    ex.prototype.ReadList = function(room, filename) {
        let file = new java.io.File(FPATH + "/" + room + "/" + filename);
    
        if (!file.exists()) {
            let newfile = file.createNewFile();
            l = [];
            
            return l;
        }
    
        let fis = new java.io.FileInputStream(file);
        let isr = new java.io.InputStreamReader(fis);
        let br = new java.io.BufferedReader(isr);
        let line = "";
        let list = [];
        
        for (let i = 0; (line = br.readLine()) != null; i++) {
            list[i] = line;
        }    
    
        fis.close();
        isr.close();
        br.close();
    
        return list;
    }

    ex.prototype.WriteList = function(data, room, filename) {
        let file = new java.io.File(FPATH + "/" + room + "/" + filename);
    
        if (!file.exists())
            return;
    
        let str = "";
    
        for (let i = 0; i < data.length; i++) {
            if (i != 0)
                str += "\n";
    
            str += data[i];
        }
    
        let fos = new java.io.FileOutputStream(file);
        let content = new java.lang.String(str);
    
        fos.write(content.getBytes());
        fos.close();
    }
    
    return ex;
})();