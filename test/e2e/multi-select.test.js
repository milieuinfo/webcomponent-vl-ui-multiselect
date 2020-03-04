
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlMultiSelectPage = require('./pages/vl-multi-select.page');
const { ElementNotInteractableError } = require('selenium-webdriver').error

describe('vl-multi-select', async () => {
    const vlMultiSelectPage = new VlMultiSelectPage(driver);

    before(async () => {
        return vlMultiSelectPage.load();
    });

    it('Als gebruiker kan ik de values van de multiselect opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getVoorgeselecteerdeMultiselect();
        await assert.eventually.include(multiselect.values(), 'Brussels', 'Ghent');
    });

    it('Als gebruiker kan ik options die voorgedefinieerd zijn, opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getVoorgeselecteerdeMultiselect();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Bruges');
    });

    it('Als gebruiker kan ik een optie selecteren en deze zal dan in de combobox getoond worden', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'Germany');
        await multiselect.selectByValue('Germany');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Germany');
    });

    it('De default multiselect heeft geen error of success attribuut', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.isFalse(multiselect.isError());
        await assert.eventually.isFalse(multiselect.isSuccess());
    });

    it('Als gebruiker kan ik een waarde uit de multiselect selecteren via text', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetOnbeperkteResultaten();
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'aalmoezenierstraat');
        await multiselect.selectByText('Aalmoezenierstraat');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'aalmoezenierstraat');
    });

    it('Als gebruiker kan ik een gekozen optie verwijderen', async () => {
        const multiselect = await vlMultiSelectPage.getGegroepeerdeMultiselect();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Bruges');
        await multiselect.delete('Bruges');
        await assert.eventually.notInclude(multiselect.getSelectedOptionsByValue(), 'Bruges');
    });

    it('Als gebruiker kan ik een multiselect definieren als error multiselect', async () => {
        const multiselect = await vlMultiSelectPage.getErrorMultiselect();
        await assert.eventually.isTrue(multiselect.isError());
    });

    it('Als gebruiker kan ik een multiselect definieren als success multiselect', async () => {
        const multiselect = await vlMultiSelectPage.getSuccessMultiselect();
        await assert.eventually.isTrue(multiselect.isSuccess());
    });

    it('Als gebruiker kan ik een multiselect definieren als disabled', async () => {
        const multiselect = await vlMultiSelectPage.getDisabledMultiselect();
        await assert.eventually.isTrue(multiselect.isDisabled());
    });

    it('Het aantal resultaten van een zoekopdracht kan beperkt worden', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetSpecifiekAantalResultaten();
        await multiselect.searchByPartialText('straat');
        await assert.eventually.equal(multiselect.getNumberOfSearchResults(), 5);
    });

    it('Het aantal resultaten van een zoekopdracht is standaard niet beperkt', async () => {
        const multiselect = await vlMultiSelectPage.getMultiselectMetOnbeperkteResultaten();
        await multiselect.searchByPartialText('straat');
        await assert.eventually.isAbove(multiselect.getNumberOfSearchResults(), 5);
    });

    it('Als gebruiker kan ik de values van een select opvragen', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.include(multiselect.values(), 'Belgium', 'France', 'Germany');
    });

    it('Als gebruiker kan ik controleren of een bepaalde value in de select beschikbaar is', async () => {
        const multiselect = await vlMultiSelectPage.getStandardMultiselect();
        await assert.eventually.isTrue(multiselect.hasValue('France'));
    });

    it('Als gebruiker kan ik luisteren naar een change event en onChange zal er een extra attribuut gezet worden', async () => {
        const multiselect = await vlMultiSelectPage.getChangeEventMultiselect();
        await assert.eventually.isFalse(multiselect.hasAttribute('changed'));
        await multiselect.selectByValue('Germany');
        await assert.eventually.isTrue(multiselect.hasAttribute('changed'));
    });

    it('Als gebruiker kan ik de multiselect via enable/disable-methode in/uit-schakelen', async () => {
        const multiselect = await vlMultiSelectPage.getEnableDisableMethodeMultiselect();
        await assert.eventually.isFalse(multiselect.isDisabled());
        await vlMultiSelectPage.disable();
        await assert.eventually.isTrue(multiselect.isDisabled());
        await vlMultiSelectPage.enable();
        await assert.eventually.isFalse(multiselect.isDisabled());
    });

    it('Als gebruiker kan ik programmatorisch (een) waarde(s) toevoegen/verwijderen in de multiselect', async () => {
        const multiselect = await vlMultiSelectPage.getSetGetMethodeMultiselect();
        await assert.eventually.isEmpty(multiselect.getSelectedOptionsByValue());
        await vlMultiSelectPage.kiesDuitsland();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Germany');
        await vlMultiSelectPage.verwijderSelectie();
        await assert.eventually.isEmpty(multiselect.getSelectedOptionsByValue());
        await vlMultiSelectPage.kiesBelgieEnNederland();
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Belgium', 'Netherlands');
    });

    it('Als een multiselect boven een datepicker gerenderd wordt, kunnen zowel de multiselect als de datepicker correct gebruikt worden', async () => {
        const multiselect = await vlMultiSelectPage.getDatepickerMultiselect();
        const datepicker = await vlMultiSelectPage.getDatepicker();

        const date = new Date();
        const today = String(date.getDate()).padStart(1);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        await datepicker.selectDay(today);
        await assert.eventually.equal(datepicker.getInputValue(), `${dd}.${mm}.${yyyy}`);

        await multiselect.selectByValue('Germany');
        await assert.eventually.include(multiselect.getSelectedOptionsByValue(), 'Germany');
    });

    it('Als gebruiker kan ik opties groeperen', async () => {
        const multiselect = await vlMultiSelectPage.getGegroepeerdeMultiselect();
        await assert.eventually.isTrue(multiselect.isGrouped());
        await assert.eventually.isTrue(multiselect.hasHeadings());
    });

    it('De datepicker kan niet geopend worden wanneer de multiselect geopend is', async () => {
        const multiselect = await vlMultiSelectPage.getDatepickerMultiselect();
        const datepicker = await vlMultiSelectPage.getDatepicker();
        await multiselect.openDropdown()
        assert.isRejected(datepicker.selectDay(4));
    })
});
