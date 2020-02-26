
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMultiSelectPage = require('./pages/vl-multi-select.page');

describe('vl-multi-select', async () => {
    const vlMultiSelectPage = new VlMultiSelectPage(driver);

    before(async () => {
        return vlMultiSelectPage.load();
    });


    it("Dummy test om browsers te sluiten", () => {
    	assert.isTrue(true);
    });
});
