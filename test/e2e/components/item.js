const { By } = require('selenium-webdriver');

class Item {
    constructor(value, text, isSelected, webElement) {
        this.value = value;
        this.text = text;
        this.isSelected = isSelected;
        this.webElement = webElement;
    }
    
}

module.exports = { Item };
