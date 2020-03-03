
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMultiSelectPage = require('./pages/vl-multi-select.page');

describe('vl-multi-select', async () => {
    const vlMultiSelectPage = new VlMultiSelectPage(driver);

    before(async () => {
        return vlMultiSelectPage.load();
    });

    it('ik kan de values van de multiselect opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getVoorgeselecteerdeMultiselect();
        await assert.eventually.include(multiselect.values(), 'Brussels', 'Ghent');
    });

    it('ik kan options die voorgedefinieerd zijn, opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getVoorgeselecteerdeMultiselect();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Bruges');
    });

    it('ik kan een optie selecteren en deze zal dan in de combobox getoond worden', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'Germany');
        await multiselect.selectByValue('Germany');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Germany');
    });

    // rekening houden met state
    it('ik kan een gekozen optie verwijderen', async () => {
        const multiselect = await vlMultiSelectPage.getGegroepeerdeMultiselect();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Bruges');
        await multiselect.verwijder('Bruges');
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'Bruges');
    });

});
