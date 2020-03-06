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
}

module.exports = { Pill }
