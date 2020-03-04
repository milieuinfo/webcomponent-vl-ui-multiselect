const { VlSelect } = require('vl-ui-select').Test;
const { Pill } = require('./pill');
const { By } = require('selenium-webdriver');

class VlMultiSelect extends VlSelect {

    async _getRoot() {
        return this.findElement(By.xpath('../..'));
    }

    async _getSelectList() {
        const root = await this._getRoot();
        return root.findElement(By.css('.vl-select__list > div'));
    }

    async _getSelectListItems() {
        const selectList = await this._getSelectList();
        return selectList.findElements(By.css('.vl-select__item'));
    }

    async _getPills() {
        const root = await this._getRoot();
        const pills = await root.findElements(By.css('.vl-pill'));
        return Promise.all(pills.map(o => new Pill(this.driver, o)));
    }

    async _getPillByValue(value) {
        const pills = await this._getPills();
        const elements = await Promise.all(pills.map(async (pill) => {
            const value = await pill.getValue();
            return { webElement: pill, value: value };
        }));
        return elements.filter(e => e.value == value)[0].webElement;
    }

    async _getSelectedOptions() {
        return this.findElements(By.css('option'));
    }

    async _getInput() {
        const root = await this._getRoot();
        return root.findElement(By.css(this.selector + ' ~ input'));
    }

    async _enterSearchText(searchText) {
        const input = await this._getInput();
        return input.sendKeys(searchText);
    }
    
    async getSelectedOptionsByValue() {
        const selectedOptions = await this._getSelectedOptions();
        return Promise.all(selectedOptions.map(o => o.getAttribute('value')));
    }
    
    async delete(value) {
        const pill = await this._getPillByValue(value);
        return pill.close();
    }
    
    async value(element) {
        return element.getAttribute('data-value');
    }
    
    async values() {
        const listItem = await this._getSelectListItems();
        return Promise.all(listItem.map(option => this.value(option)));
    }

    async hasValue(value) {
        const values = await this.values();
        return values.includes(value);
    }

    async hasPartialValue(value) {
        const values = await this.values();
        return values.find(v => v.indexOf(value) > -1);
    }

    async searchByText(text) {
        if ((await this.hasValue(text)) === false) {
            return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
        }
        return this._enterSearchText(text);
    }

    async searchByPartialText(text) {
        if ((await this.hasPartialValue(text)) === false) {
            return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
        }
        return this._enterSearchText(text);
    }

    async getNumberOfSearchResults() {
        const selectList = await this._getSelectList();
        const searchResults = await selectList.findElements(By.css('div'));
        return searchResults.length;
    }

    async isError() {
        return this.hasAttribute('error');
    }

    async isSuccess() {
        return this.hasAttribute('success');
    }

    async isDisabled() {
        return this.hasAttribute('disabled');
    }

}

module.exports = VlMultiSelect;
