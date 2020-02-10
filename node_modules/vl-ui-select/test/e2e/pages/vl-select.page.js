const VlSelect = require('../components/vl-select');
const { Page, Config } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlSelectPage extends Page {
    async _getSelect(selector) {
        return new VlSelect(this.driver, selector);
    }

    async getDefaultSelect() {
        return this._getSelect('#select-default');
    }

    async getSuccessSelect() {
        return this._getSelect('#select-success');
    }

    async getErrorSelect() {
        return this._getSelect('#select-error');
    }

    async getSearchSelect() {
        return this._getSelect('#select-search');
    }

    async getDisabledSelect() {
        return this._getSelect('#select-disabled');
    }

    async getDeletableSelect() {
        return this._getSelect('#select-deletable');
    }

    async getDynamischeSelect() {
        return this._getSelect('#vl-select-dynamisch');
    }

    async getDresUndressSelect() {
        return this._getSelect('#vl-select-dress-undress-methode');
    }

    async getEnableDisableSelect() {
        return this._getSelect('#vl-select-enable-disable-methode');
    }

    async getSetMethodeSelect() {
        return this._getSelect('#vl-select-set-get-methode');
    }

    async activeerDynamischeData() {
        return (await this.driver.findElement(By.css('#activeer-data'))).click();
    }

    async dress() {
        return (await this.driver.findElement(By.css('#dress-button'))).click();
    }

    async undress() {
        return (await this.driver.findElement(By.css('#undress-button'))).click();
    }

    async enable() {
        return (await this.driver.findElement(By.css('#enable-button'))).click();
    }

    async disable() {
        return (await this.driver.findElement(By.css('#disable-button'))).click();
    }

    async kies() {
        return (await this.driver.findElement(By.css('#kies-button'))).click();
    }

    async verwijder() {
        return (await this.driver.findElement(By.css('#verwijder-button'))).click();
    }

    async load() {
        return super.load(Config.baseUrl + '/demo/vl-select.html');
    }
}

module.exports = VlSelectPage;
