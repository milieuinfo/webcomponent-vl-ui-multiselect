import { define } from 'vl-ui-core';
import { VlSelect } from 'vl-ui-select';
import '@govflanders/vl-ui-util/dist/js/util.min.js';
import '@govflanders/vl-ui-core/dist/js/core.min.js';
import '@govflanders/vl-ui-multiselect/dist/js/multiselect.js';

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
 *
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-multiselect/releases/latest|Release notes}
 * @see {@link http://www.github.com/milieuinfo/webcomponent-vl-ui-multiselect/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-multiselect.html|Demo}
 */
export class VlMultiSelect extends VlSelect {
  static get readyEvent() {
    return 'VlMultiSelectReady';
  }

  constructor() {
    super();
    this.setAttribute('data-vl-multiselect', '');
  }

  connectedCallback() {
    this.classList.add('vl-multiselect');
    this.setAttribute('name', 'multiselect');
    super.connectedCallback();
  }

  /**
   * Geeft de ready event naam.
   * 
   * @returns {string}
   */
  get readyEvent() {
    return VlMultiSelect.readyEvent;
  }

  /**
   * Zet het geselecteerd option element op basis van de option value.
   *
   * @param {string} values - De option value van het option element dat gekozen moet worden.
   * @returns {void}
   */
  set values(values) {
    values.forEach((value) => {
      super.value = value;
    });
  }

  /**
   * Geeft de waarde van de geselecteerde option elementen.
   *
   * @returns {string[]}
   */
  get values() {
    return [... this.selectedOptions].map((option) => {
      return option.value || '';
    });
  }

  get _dataVlSelectAttribute() {
    return this.getAttribute('data-vl-multiselect');
  }
}

window.customElements.whenDefined('vl-select').then(() => define('vl-multiselect', VlMultiSelect, { extends: 'select' }));
