
const { assert, driver } = require('vl-ui-core').Test;
const VlMultiSelectPage = require('./pages/vl-multi-select.page');

describe('vl-multi-select', async () => {
    const vlMultiSelectPage = new VlMultiSelectPage(driver);

    before((done) => {
        vlMultiSelectPage.load().then(() => {
            done()
        });
    });

   
    after((done) => {
        if(driver) {
            driver.quit();
            done();
        }
    })
});
