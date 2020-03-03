const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class Pill extends VlElement {
    
    async getValue() {
        return this.getAttribute('data-value');
    }

    async close() {
        const closeButton = await this.findElement(By.css('.vl-pill__close'));
        return closeButton.click();
    }
}

module.exports = { Pill };
