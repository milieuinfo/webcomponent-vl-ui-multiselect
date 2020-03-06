const { By } = require('selenium-webdriver');

class Item {
    constructor(value, text, isSelected, webElement) {
        this.value = value;
        this.text = text;
        this.isSelected = isSelected;
        this.webElement = webElement;
    }

    async remove() {
        const closeButton = await this.webElement.findElements(By.css('.vl-pill__close'));
        if(closeButton.length < 1) {
            throw new Error('Dit item kan niet gesloten worden!');
        }
        return closeButton.click();
    }
    
}

module.exports = { Item };
