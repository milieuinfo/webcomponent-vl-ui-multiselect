const { VlSelect } = require('vl-ui-select').Test;
const { Pill } = require('./pill');
const { By } = require('selenium-webdriver');

class VlMultiSelect extends VlSelect {  

    async _getCombobox() {
        return this.findElement(By.xpath('../..'));
    }

    async _getSelectList() {
        const combobox = await this._getCombobox();
        return combobox.findElement(By.css('.vl-select__list > div'));
    }

    async _getPills() {
        const combobox = await this._getCombobox();
        const pills = await combobox.findElements(By.css('.vl-pill'));
        return Promise.all(pills.map(o => new Pill(this.driver, o)));
    }

    async _getPillByValue(value) {
        const pills = await this._getPills();
        const elements = await Promise.all(pills.map(async (pill) => {
            const value = await pill.getValue();
            return { webElement: pill, value: value};
        }));
        return elements.filter(e => e.value == value)[0].webElement;
    }

    async verwijder(innerText) {
        const pill = await this._getPillByValue(innerText);
        return pill.close();
    }

    async _getSelectedOptions() {
        return this.findElements(By.css('option'));
    }

    async getSelectedOptionsByValue() {
        const selectedOptions = await this.findElements(By.css('option'));
        return Promise.all(selectedOptions.map(o => o.getAttribute('value')));
    }
    
    async getOptions() {
        const selectList = await this._getSelectList();
        return selectList.findElements(By.css('.vl-select__item'));
    }

}

module.exports = VlMultiSelect;
