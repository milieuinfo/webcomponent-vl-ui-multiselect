const { By } = require('selenium-webdriver');
class Pill {
    constructor(webElement) {
        this.webElement = webElement;
    }

    async value() {
        return this.webElement.getAttribute('data-value');
    }

    async isSelected() {
        return !!this.webElement.getAttribute('aria-selected');
    }

    async text() {
        const span = await this.webElement.findElement(By.css('span'));
        return span.getAttribute('innerText');
    }

    async remove() {
        const closeButton = await this.webElement.findElements(By.css('.vl-pill__close'));
        if(closeButton.length < 1) {
            throw new Error('Dit item kan niet verwijderd worden!');
        }
        return closeButton[0].click();
    }
}

module.exports = { Pill }
