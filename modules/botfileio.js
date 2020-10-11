const FILE_PATH = "/storage/emulated/0/KakaobotData";

module.exports = (function() {
    function ex() {}

    ex.prototype.ReadFile = function(room, filename) {
        var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

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
    };

    ex.prototype.WriteFile = function(data, room, filename) {
        var file = new java.io.File(FILE_PATH + "/" + room + "/" + filename);

        if (!file.exists())
            return;
    
        var fos = new java.io.FileOutputStream(file);
        var content = new java.lang.String(data);
    
        fos.write(content.getBytes());
        fos.close();
    };

    return ex;
})();