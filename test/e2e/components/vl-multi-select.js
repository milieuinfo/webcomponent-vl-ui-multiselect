const { VlSelect } = require('vl-ui-select').Test;
const { By, Key } = require('selenium-webdriver');
const { Pill } = require('./pill');
const { MultiselectItem } = require('./multiselect-item');
const { Item } = require('./item');

class VlMultiSelect extends VlSelect {
    async _getRoot() {
        return this.findElement(By.xpath('../..'));
    }

    async _getInput() {
        const root = await this.findElement(By.xpath('..'));
        return root.findElement(By.css('input.vl-input-field'));
    }

    async _getItemList() {
        const root = await this._getRoot();
        return root.findElement(By.css('.vl-select__list > div'));
    }

    async _toItem(pillOrMultiselectItem) {
        const value = await pillOrMultiselectItem.value();
        const text = await pillOrMultiselectItem.text();
        const isSelected = await pillOrMultiselectItem.isSelected();
        return new Item(value, text, isSelected, pillOrMultiselectItem);
    }

    async getUnselectedItems() {
        const selectList = await this._getItemList();
        const items = await selectList.findElements(By.css('.vl-select__item'));
        return Promise.all(items.map(async (item) => {
            const multiSelectItem = await new MultiselectItem(item);
            return this._toItem(multiSelectItem);
        }));
    }

    async _getUnselectedItems() {
        const selectList = await this._getItemList();
        const items = await selectList.findElements(By.css('.vl-select__item'));
        return Promise.all(items.map(async (item) => {
            return new MultiselectItem(item);
        }));
    }

    async _getSelectedItems() {
        const root = await this._getRoot();
        const selectedItems = await root.findElements(By.css('.vl-pill'));
        return Promise.all(selectedItems.map(async (item) => {
            return new Pill(item);
        }));
    }

    async _enterSearchText(searchText) {
        const input = await this._getInput();
        return input.sendKeys(searchText);
    }

    async _values() {
        const listItem = await this.getAllItems();
        return Promise.all(listItem.map(item => item.value));
    }

    async _hasPartialValue(value) {
        const values = await this._values();
        return !!values.find(v => v.indexOf(value) > -1);
    }

    async getSelectedItems() {
        const root = await this._getRoot();
        const selectedItems = await root.findElements(By.css('.vl-pill'));
        return Promise.all(selectedItems.map(async (item) => {
            const pill = await new Pill(item);
            return this._toItem(pill);
        }));
    }

    async getAllItems() {
        const unselectedItems = await this.getUnselectedItems();
        const selectedItems = await this.getSelectedItems();
        return unselectedItems.concat(selectedItems);
    }

    async select(text) {
        const multiselect = await new VlSelect(this.driver, this);
        return multiselect.selectByText(text);
    }

    async unselect(text) {
        const selectedItems = await this._getSelectedItems();
        const pills = await Promise.all(selectedItems.map(async (pill) => {
            const text = await pill.text();
            return { text: text, pill: pill }
        }));
        const pill = pills.filter(pill => pill.text === text)[0].pill;
        if (pill) {
            return pill.remove();
        }
        throw new Error('Geen item gevonden met tekst: ' + text);
    }

    async searchByPartialText(text) {
        const hasPartialValue = await this._hasPartialValue(text);
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
