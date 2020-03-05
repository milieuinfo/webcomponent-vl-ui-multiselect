class MultiselectItem {
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
        const innerText = await this.webElement.getAttribute('innerText');
        return innerText.replace(/[^a-zA-Zë]/gm, '');
    }

}

module.exports = { MultiselectItem }
