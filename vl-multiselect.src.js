import { define, awaitScript } from '/node_modules/vl-ui-core/vl-core.js';
import { VlSelect } from '/node_modules/vl-ui-select/vl-select.js';

Promise.all([
  awaitScript('util', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js'),
  awaitScript('core', '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js'),
  awaitScript('multiselect', '/node_modules/@govflanders/vl-ui-multiselect/dist/js/multiselect.js')]
).then(() => {
  window.customElements.whenDefined('vl-select').then(() => define('vl-multiselect', VlMultiSelect, { extends: 'select' }))
});

/**
 * VlMultiSelect
 * @class
 * @classdesc Gebruik een multiselect om een gebruiker toe te laten om in een lijst van vooropgestelde keuzes te zoeken, en enkele of alle passende keuzes te selecteren.
 *
 * @extends VlSelect
 * 
 * @property {boolean} block - Attribuut wordt gebruikt om ervoor te zorgen dat de textarea getoond wordt als een block element en bijgevolg de breedte van de parent zal aannemen.
 * @property {boolean} error - Attribuut wordt gebruikt om aan te duiden dat het select element verplicht is of ongeldige tekst bevat.
 * @property {boolean} success - Attribuut wordt gebruikt om aan te duiden dat het select element correct werd ingevuld.
 * @property {boolean} disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker iets kan kiezen uit het select element.
 * @property {boolean} data-vl-select - Attribuut zorgt ervoor dat de zoek functionaliteit geïnitialiseerd wordt.
 * @property {boolean} data-vl-select-search-empty-text - Attribuut bepaalt de tekst die getoond wordt wanneer er geen resultaten gevonden zijn.
 * @property {boolean} data-vl-select-search - Attribuut om de zoek functionaliteit te activeren of deactiveren.
 * @property {boolean} data-vl-select-deletable - Attribuut om te activeren of deactiveren dat het geselecteerde kan verwijderd worden.
 *
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-multiselect/releases/latest|Release notes}
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-multiselect/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-multiselect.html|Demo}
 */
export class VlMultiSelect extends VlSelect {
  connectedCallback() {
    this.classList.add('vl-multiselect');
    this.setAttribute('name', 'multiselect');
    this.setAttribute('data-vl-multiselect', '');
    super.connectedCallback();
  }

  get _stylePath() {
    return '../style.css';
  }

  get _dataVlSelectAttribute() {
    return this.getAttribute('data-vl-multiselect');
  }
}