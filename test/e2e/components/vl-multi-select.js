const { VlSelect } = require('vl-ui-select').Test;
const { Pill } = require('./pill');
const { By } = require('selenium-webdriver');

class VlMultiSelect extends VlSelect {

    async _getRoot() {
        return this.findElement(By.xpath('../..'));
    }

    async _getItemList() {
        const root = await this._getRoot();
        return root.findElement(By.css('.vl-select__list > div'));
    }

    async _getItemsToSelect() {
        const selectList = await this._getItemList();
        return selectList.findElements(By.css('.vl-select__item'));
    }

    async _getPills() {
        const root = await this._getRoot();
        const pills = await root.findElements(By.css('.vl-pill'));
        return Promise.all(pills.map(pill => new Pill(this.driver, pill)));
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
        return pill.remove();
    }
    
    async value(element) {
        return element.getAttribute('data-value');
    }
    
    async values() {
        const listItem = await this._getItemsToSelect();
        return Promise.all(listItem.map(option => this.value(option)));
    }

    async hasValue(value) {
        const values = await this.values();
        return values.includes(value);
    }

    async hasPartialValue(value) {
        const values = await this.values();
        return values.find(v => v.indexOf(value) > -1).length > 0;
    }

    async searchByText(text) {
        if ((await this.hasValue(text)) === false) {
            return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
        }
        return this._enterSearchText(text);
    }

    async searchByPartialText(text) {
        const hasPartialValue = await this.hasPartialValue(text);
        if (!hasPartialValue) {
            return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
        }
        return this._enterSearchText(text);
    }

    async getNumberOfSearchResults() {
        const selectList = await this._getItemList();
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

    async isGrouped() {
        const itemList = await this._getItemList();
        const selectGroups = await itemList.findElements(By.css('.vl-select__group'));
        return selectGroups.length > 0;
    }
    
    async hasHeadings() {
        const itemList = await this._getItemList();
        const headings = await itemList.findElements(By.css('.vl-select__heading'));
        return headings.length > 0;
    }

}

module.exports = VlMultiSelect;
