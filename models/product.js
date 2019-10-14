const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const readProducts = cb => {
    fs.readFile(p, (err, fileContent) => {
        let products = [];
        if (!err) {
            products = JSON.parse(fileContent);

        }
        cb(products);
    });
};

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        readProducts((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);

            });
        });
    }

    static fetchAll(cb) {
        readProducts(cb);
    }
};