const VlMultiSelect = require('../components/vl-multi-select');
const { Page, Config } = require('vl-ui-core').Test;

class VlMultiSelectPage extends Page {
    async _getMultiSelect(selector) {
        return new VlMultiSelect(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-multi-select.html');
    }
}

module.exports = VlMultiSelectPage;
