'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _console = require('console');

var _console2 = _interopRequireDefault(_console);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privates = new WeakMap();

var Log = function () {
    function Log(type, level) {
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        _classCallCheck(this, Log);

        type = type.toLowerCase().trim();
        level = level.toLowerCase().trim();
        path = returnCorrectPath(path);
        privates.set(this, { type: type, level: level, path: path });
    }

    _createClass(Log, [{
        key: 'setType',
        value: function setType(type) {
            privates.get(this)['type'] = type.toString().trim();
        }
    }, {
        key: 'setLevel',
        value: function setLevel(level) {
            privates.get(this)['level'] = level.toString().trim();
        }
    }, {
        key: 'setPath',
        value: function setPath(path) {
            privates.get(this)['path'] = returnCorrectPath(path.toString());
        }
    }, {
        key: 'getType',
        value: function getType() {
            return privates.get(this)['type'];
        }
    }, {
        key: 'getLevel',
        value: function getLevel() {
            return privates.get(this)['level'];
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            return privates.get(this)['path'];
        }
    }, {
        key: 'input',
        value: function input(message) {
            if (getType(privates.get(this)['type']) == 1) {
                if (dirExistsOrCreate(privates.get(this)['path'])) {
                    printFile(privates.get(this)['level'], message, privates.get(this)['path']);
                }
            } else {
                printConsole(privates.get(this)['level'], message);
            }
        }
    }]);

    return Log;
}();

function getType(type) {
    switch (type) {
        case 'console':
            return 0;
        case 'file':
            return 1;
        default:
            return 0;
    }
}

function printConsole(level, message) {
    switch (level) {
        case 'log':
            _console2.default.log(message);break;
        case 'info':
            _console2.default.info(message);break;
        case 'warn':
            _console2.default.warn(message);break;
        case 'error':
            _console2.default.error(message);break;
        default:
            _console2.default.log(message);break;
    }
}

function printFile(level, message, path) {
    var resultSwitch = function resultSwitch(level) {
        switch (level) {
            case 'log':
                return '{LOG}';
            case 'info':
                return '[INFO]';
            case 'warn':
                return '*WARN*';
            case 'error':
                return '**ERROR**';
            default:
                return '{LOG}';
        }
    };
    var template = resultSwitch(level);
    message = message + '\n';
    var head = (0, _moment2.default)().format().toString() + ' - ' + '<=' + template + '\n';
    var footer = '-----------------------------------------------' + '=>' + template + '\n';
    var file = path + (0, _moment2.default)().format('dMMYYYY') + '.log';
    writeFile(file, head + message + footer);
}

function dirExistsOrCreate(path) {
    if (path != '') {
        try {
            if (!_fs2.default.existsSync(path)) {
                _fs2.default.mkdirSync(path);
            }
            return true;
        } catch (e) {
            _console2.default.error(e);
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

function writeFile(file, data) {
    try {
        _fs2.default.open(file, 'a', function (err, fd) {
            if (err) throw err;
            _fs2.default.appendFile(fd, data, 'utf8', function (err) {
                _fs2.default.close(fd, function (err) {
                    if (err) throw err;
                });
                if (err) throw err;
            });
        });
    } catch (err) {
        _console2.default.error(err);
    }
}

exports.default = Log;
