const fs = require('fs');
const path = require('path');
const generate = require('generate-unique-id');

class Dababase {
    path: string;
    idusage: boolean;

    constructor(path: string, idusage: boolean) {
        this.path = path;
        this.idusage = idusage;
    };

    setup() {
        var source = `${process.cwd()}/${this.path}`;
        var parent = path.dirname(source);

        fs.readdir(parent, 'utf-8', (err, files) => {
            if (err) throw err;

            if (files.includes(this.path)) {} else {
                fs.writeFile(source, '[]', (err) => {
                    if (err) throw err;
                });
            }
        });
    };

    insert(entries: object) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);

            if (this.idusage) {
                entries["_id"] = generate({ length: 8, useNumbers: false });
            }
            obj.push(entries);

            obj = JSON.stringify(obj);

            fs.writeFile(this.path, obj, (err) => {
                if (err) throw err;
            });
        });
    };

    get(entry: object, callback: (err: Error, query: object)) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).find((object) => object.hasOwnProperty(keys) && object[keys] === values);
            console.log(typeof lol);
            callback(err, Array.from(obj).find((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    };

    getAll(entry: object, callback: (err: Error, query: object[])) {
        var source = `${process.cwd()}/${this.path}`;
        fs.readFile(source, (err, data) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];
            var lol = Array.from(obj).filter((object) => object.hasOwnProperty(keys) && object[keys] === values);
            console.log(typeof lol);
            callback(err, Array.from(obj).filter((object) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    };

    remove(entries: object) {}
}

module.exports = Dababase;