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
        const root = await this._getRoot();
        return root.findElement(By.css('.vl-input-field'));
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

    async getSelectedItems() {
        const root = await this._getRoot();
        const selectedItems = await root.findElements(By.css('.vl-pill'));
        return Promise.all(selectedItems.map(async (item) => {
            const pill = await new Pill(item);
            return this._toItem(pill);
        }));
    }

    async _getSelectedItems() {
        const root = await this._getRoot();
        const selectedItems = await root.findElements(By.css('.vl-pill'));
        return Promise.all(selectedItems.map(async (item) => {
            return new Pill(item);
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
            return {text: text, pill: pill}
        }));
        const pill = pills.filter(pill => pill.text === text)[0].pill;
        if(pill) {
            return pill.remove();
        }
        throw new Error('Geen item gevonden met tekst: ' + text);
    }

    async _enterSearchText(searchText) {
        const body = await this.driver.findElement(By.css('body'));
        await body.sendKeys(Key.ESCAPE);
        const input = await this._getInput();
        await this.click();
        return input.sendKeys(searchText);
    }

    // async isOpen() {
    //     const root = await this._getRoot();
    //     return root.hasClass('is-open');
    // }

    // async openDropdown() {
    //     const input = await this._getInput();
    //     return input.click();
    // }
    
    // async getSelectedValues() {
    //     const selectedOptions = await this._getSelectedOptions();
    //     return Promise.all(selectedOptions.map(option => option.getAttribute('value')));
    // }
    
    // async delete(value) {
    //     const pill = await this._getPillByValue(value);
    //     return pill.remove();
    // }
    
    // async value(item) {
    //     return item.webElement.getAttribute('data-value');
    // }
    
    async values() {
        const listItem = await this.getAllItems();
        return Promise.all(listItem.map(item => item.value));
    }

    // async hasValue(value) {
    //     const values = await this.values();
    //     return values.includes(value);
    // }

    async hasPartialValue(value) {
        const values = await this.values();
        return !!values.find(v => v.indexOf(value) > -1);
    }

    // async searchByText(text) {
    //     const hasValue = await this.hasValue(text);
    //     if (!hasValue) {
    //         return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
    //     }
    //     return this._enterSearchText(text);
    // }

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
