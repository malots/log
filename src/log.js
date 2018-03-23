import fs from 'fs';
import console from 'console';
import moment from 'moment';

const privates = new WeakMap();

class Log {
    constructor(type,level,path='') {
        type = type.toLowerCase().trim();
        level = level.toLowerCase().trim();
        path = returnCorrectPath(path);
        privates.set(this,{type,level,path});
    }

    setType(type) {
        privates.get(this)['type'] = type.toString().trim();
    }

    setLevel(level) {
        privates.get(this)['level'] = level.toString().trim();
    }

    setPath(path) {
        privates.get(this)['path'] = returnCorrectPath(path.toString());
    }

    getType() {
        return privates.get(this)['type'];
    }

    getLevel() {
        return privates.get(this)['level'];
    }

    getPath() {
        return privates.get(this)['path'];
    }

    input(message) {
        if (getType(privates.get(this)['type']) == 1) {
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
    const resultSwitch = function(level) {
        switch(level) {
        case 'log': return '{LOG}';
        case 'info': return '[INFO]'; 
        case 'warn': return '*WARN*'; 
        case 'error': return '**ERROR**'; 
        default: return '{LOG}'; 
        }
    };
    let template = resultSwitch(level);
    message = message + '\n';
    let head = moment().format().toString() + ' - ' + '<=' + template+'\n';
    let footer = '-----------------------------------------------' + '=>' + template+'\n';
    let file = path+moment().format('DMMYYYY')+'.log';
    writeFile(file,head+message+footer);
}

function dirExistsOrCreate(path) {
    if (path != '') {
        try{
            if (!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
    }
    return false;  
}

function returnCorrectPath(path) {
    if (path != '') {
        if (!path.endsWith('/')) {
            path += '/';
        }
    }
    return path.trim();
}

function writeFile(file,data) {
    try {
        fs.open(file, 'a', (err, fd) => {
            if (err) throw err;
            fs.appendFile(fd, data, 'utf8', (err) => {
                fs.close(fd, (err) => {
                    if (err) throw err;
                });
                if (err) throw err;
            });
        });
    } catch (err) {
        console.error(err);
    }
}

export default Log;