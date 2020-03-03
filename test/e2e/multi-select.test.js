
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

    it('ik kan een waarde uit de multiselect selecteren via value', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetOnbeperkteResultaten();
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'aakstraat');
        await multiselect.selectByValue('aakstraat');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'aakstraat');
    });

    it('ik kan een waarde uit de multiselect selecteren via text', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetOnbeperkteResultaten();
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'aalmoezenierstraat');
        await multiselect.selectByText('Aalmoezenierstraat');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'aalmoezenierstraat');
    });

    it('ik kan een gekozen optie verwijderen', async () => {
        const multiselect = await vlMultiSelectPage.getGegroepeerdeMultiselect();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Bruges');
        await multiselect.delete('Bruges');
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'Bruges');
    });

    it('ik kan een multiselect definieren als error multiselect', async () => {
        const multiselect = await vlMultiSelectPage.getErrorMultiselect();
        await assert.eventually.isTrue(multiselect.isError());
    });

    it('ik kan een multiselect definieren als success multiselect', async () => {
        const multiselect = await vlMultiSelectPage.getSuccessMultiselect();
        await assert.eventually.isTrue(multiselect.isSuccess());
    });

    it('ik kan een multiselect definieren als disabled', async () => {
        const multiselect = await vlMultiSelectPage.getDisabledMultiselect();
        await assert.eventually.isTrue(multiselect.isDisabled());
    });

    it('het aantal resultaten van een zoekopdracht kan beperkt worden', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetSpecifiekAantalResultaten();
        await multiselect.searchByPartialText('straat');
        await assert.eventually.equal(multiselect.getNumberOfSearchResults(), 5);
    });

    it('ik kan de values van een select opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.include(multiselect.values(), 'Belgium', 'France', 'Germany');
    });

    it('ik kan controleren of een bepaalde value in de select beschikbaar is', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.isTrue(multiselect.hasValue('France'));
    });

});
