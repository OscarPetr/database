const fs = require('fs');
const path = require('path');

function generate(length: number): string {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    var generation = '';
    for(var i = 0; i < length; i++) {
        generation += chars[Math.floor(Math.random() * chars.length)];
    }
    return generation;
}

class Dababase {
    path: string;
    idUsage: boolean;
    source: string;

    constructor(path: string, idUsage: boolean) {
        this.path = path;
        this.idUsage = idUsage;
        this.source = `${process.cwd()}/${this.path}`;
    }

    // SETUP METHOD
    setup() {
        fs.readdir(path.dirname(this.source), 'utf-8', (err: Error, files: string[]) => {
            if (err) throw err;

            if (files.includes(this.path)) {} else {
                fs.writeFile(this.source, '[]', (err: Error) => {
                    if (err) throw err;
                });
            }
        });
    }

    // INSERT METHOD
    insert(entries: object) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);

            if (this.idUsage) entries = {...entries, _id: generate(8) };
            obj.push(entries);

            obj = JSON.stringify(obj);
            fs.writeFile(this.path, obj, (err: Error) => {
                if (err) throw err;
            });
        });
    }

    // QUERY METHOD
    query(entry: object, callback: (err: Error, query: any) => Error & any[]) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];

            callback(err, Array.from(obj).find((object: any) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    }

    // QUERYALL METHOD
    queryAll(entry: object, callback: (err: Error, query: any[]) => Error & any[]) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];

            callback(err, Array.from(obj).filter((object: any) => object.hasOwnProperty(keys) && object[keys] === values))
        });
    }

    // REMOVE METHOD
    remove(entry: object) {
        fs.readFile(this.source, (err: Error, data: any) => {
            var obj = JSON.parse(data);
            var keys = Object.keys(entry)[0];
            var values = Object.values(entry)[0];

            var index = Array.from(obj).findIndex((object: any) => object.hasOwnProperty(keys) && object[keys] === values);
            obj.splice(index, index)

            obj = JSON.stringify(obj);

            fs.writeFile(this.source, obj, (err: Error) => {

            });
        });
    }

    // REMOVEALL METHOD
    removeAll(entries: object) {
        fs.readFile(this.source, (err: Error, data: any) => {
            if (err) throw err;

            var obj = JSON.parse(data);
            var keys = Object.keys(entries)[0];
            var values = Object.values(entries)[0];

            var indecies: number[] = [];
            obj.forEach((object: any, index: number) => object.hasOwnProperty(keys) && object[keys] === values ? indecies.push(index) : null);

            for (var i = 0; i < indecies.length; i++) {
                obj.splice(indecies[i] - i, indecies[i] - i);
            }
            obj = JSON.stringify(obj);

            fs.writeFile(this.source, obj, (err: Error) => {
                if (err) throw err;
            });
        });
    }
}

module.exports = Dababase;
