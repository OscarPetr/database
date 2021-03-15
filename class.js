var fs = require('fs');
var path = require('path');
var generate = require('generate-unique-id');
var Dababase = /** @class */ (function() {
    function Dababase(path, idusage) {
        this.path = path;
        this.idusage = idusage;
    };
    Dababase.prototype.setup = function() {
        var _this = this;
        var source = process.cwd() + "/" + this.path;
        var parent = path.dirname(source);
        fs.readdir(parent, 'utf-8', function(err, files) {
            if (err)
                throw err;
            if (files.includes(_this.path)) {} else {
                fs.writeFile(source, '[]', function(err) {
                    if (err)
                        throw err;
                });
            }
        });
    };;
    Dababase.prototype.insert = function(entries) {
        var _this = this;
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function(err, data) {
            var obj = JSON.parse(data);
            if (_this.idusage) {
                entries["_id"] = generate({ length: 8, useNumbers: false });
            }
            obj.push(entries);
            obj = JSON.stringify(obj);
            fs.writeFile(_this.path, obj, function(err) {
                if (err)
                    throw err;
            });
        });
    };;
    Dababase.prototype.get = function(entry, callback) {
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function(err, data) {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).find(function(object) { return object.hasOwnProperty(keys) && object[keys] === values; });
            console.log(typeof lol);
            callback(err, Array.from(obj).find(function(object) { return object.hasOwnProperty(keys) && object[keys] === values; }));
        });
    };;
    Dababase.prototype.getAll = function(entry, callback) {
        var source = process.cwd() + "/" + this.path;
        fs.readFile(source, function(err, data) {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).filter(function(object) { return object.hasOwnProperty(keys) && object[keys] === values; });
            console.log(typeof lol);
            callback(err, Array.from(obj).filter(function(object) { return object.hasOwnProperty(keys) && object[keys] === values; }));
        });
    };;
    Dababase.prototype.remove = function(entries) {};
    return Dababase;
}());
module.exports = Dababase;