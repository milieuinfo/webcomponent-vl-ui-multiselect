const { VlSelect } = require('vl-ui-select').Test;
const { By } = require('selenium-webdriver');
const { Pill } = require('./pill');
const { MultiselectItem } = require('./multiselect-item');

class VlMultiSelect extends VlSelect {
    async _getRoot() {
        return this.findElement(By.xpath('../..'));
    }

    async _getItemList() {
        const root = await this._getRoot();
        return root.findElement(By.css('.vl-select__list > div'));
    }

    async getUnselectedItems() {
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
        const selectedItems = await this.getSelectedItems();
        const items = await Promise.all(selectedItems.map(async (pill) => {
            const text = await pill.text();
            return {text: text, pill: pill};
        }));
        const pill = items.filter(i => i.text == text)[0].pill;
        return pill.remove();
    }

    // async _enterSearchText(searchText) {
    //     const input = await this._getInput();
    //     return input.sendKeys(searchText);
    // }

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
    
    // async values() {
    //     const listItem = await this.getAllItems();
    //     return Promise.all(listItem.map(item => item.value));
    // }

    // async hasValue(value) {
    //     const values = await this.values();
    //     return values.includes(value);
    // }

    // async hasPartialValue(value) {
    //     const values = await this.values();
    //     return !!values.find(v => v.indexOf(value) > -1);
    // }

    // async searchByText(text) {
    //     const hasValue = await this.hasValue(text);
    //     if (!hasValue) {
    //         return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
    //     }
    //     return this._enterSearchText(text);
    // }

    // async searchByPartialText(text) {
    //     const hasPartialValue = await this.hasPartialValue(text);
    //     if (!hasPartialValue) {
    //         return Promise.reject('Waarde ' + text + ' niet gevonden in de dropdown!');
    //     }
    //     return this._enterSearchText(text);
    // }

    // async getNumberOfSearchResults() {
    //     const selectList = await this._getItemList();
    //     const searchResults = await selectList.findElements(By.css('div'));
    //     return searchResults.length;
    // }

    // async isError() {
    //     return this.hasAttribute('error');
    // }

    // async isSuccess() {
    //     return this.hasAttribute('success');
    // }

    // async isDisabled() {
    //     return this.hasAttribute('disabled');
    // }

    // async isGrouped() {
    //     const itemList = await this._getItemList();
    //     const selectGroups = await itemList.findElements(By.css('.vl-select__group'));
    //     return selectGroups.length > 0;
    // }
    
    // async hasHeadings() {
    //     const itemList = await this._getItemList();
    //     const headings = await itemList.findElements(By.css('.vl-select__heading'));
    //     return headings.length > 0;
    // }

}

module.exports = VlMultiSelect;
