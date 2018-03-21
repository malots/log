import fs from 'fs';
import console from 'console';

const privates = new WeakMap();

class Log {
    constructor(type,level,path='') {
        type = type.toLowerCase();
        level = level.toLowerCase();
        privates.set(this,{type,level,path});
    }

    setType(type) {
        privates.get(this)['type'] = type;
    }

    setLevel(level) {
        privates.get(this)['level'] = level;
    }

    getType() {
        return privates.get(this)['type'];
    }

    getLevel() {
        return privates.get(this)['level'];
    }

    input(message) {
        if (getType(privates.get(this)['type']) == 0) {
            if (dirExistsOrCreate(privates.get(this)['path'])) {
                printFile(privates.get(this)['level'],message,privates.get(this)['path']);
            }
        } else {
            printConsole(privates.get(this)['level'],message);
        }
    }
}

function getType(type) {
    switch(type) {
    case 'console': return 0;
    case 'file': return 1;
    default: return 0;
    }
}

function printConsole(level,message) {
    switch(level) {
    case 'log': console.log(message); break;
    case 'info': console.info(message); break;
    case 'warn': console.warn(message); break;
    case 'error': console.error(message); break;
    default: console.log(message); break;
    }
}

function printFile(level,message,path) {
    let template = '';
    switch(level,template) {
    case 'log': template = '{LOG}'; break;
    case 'info': template = '[INFO]'; break;
    case 'warn': template = '*WARN*'; break;
    case 'error': template = '**ERROR**'; break;
    default: template = '{LOG}'; break;
    }
    let head = Date.now().toString() + ' - ' + template;
    let footer = '-----------------------------------------------' + template;
    var logStream = fs.createWriteStream(path, {'flags': 'a'});
    logStream.write(head);
    logStream.write(message);
    logStream.end(footer);
    logStream.close();
}

function dirExistsOrCreate(path) {
    if (path != '') {
        try{
            if(fs.lstatSync(path).isDirectory()) {
                if (!fs.existsSync(path)){
                    fs.mkdirSync(path);
                } 
            }
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
    }
    return false;  
}

export default Log;