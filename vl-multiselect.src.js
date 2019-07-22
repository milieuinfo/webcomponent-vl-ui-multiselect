import {define, VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-select/vl-select.js';

/**
 * VlMultiSelect
 * @class
 * @classdesc Gebruik een multiselect om een gebruiker toe te laten om in een lijst van vooropgestelde keuzes te zoeken, en enkele of alle passende keuzes te selecteren. <a href="demo/vl-multiselect.html">Demo</a>.
 *
 * @extends VlElement
 *
 * @property {boolean} error - Attribuut wordt gebruikt om aan te duiden dat het select element verplicht is of ongeldige tekst bevat.
 * @property {boolean} success - Attribuut wordt gebruikt om aan te duiden dat het select element correct werd ingevuld.
 * @property {boolean} disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker iets kan kiezen uit het select element.
 */
export class VlMultiSelect extends VlElement(HTMLElement) {

  static get _observedAttributes() {
    return VlMultiSelect._observedDelegateAttributes;
  }

  /**
   * Attributen wanneer deze op de vl-mutliselect gezet worden, ook gezet moeten worden op de vl-select.
   * @return {string[]} de lijst van attributen die gedelegeerd moeten worden.
   * @private
   */
  static get _observedDelegateAttributes() {
    return ['error', 'success', 'disabled'];
  }

  get _selectedOptions() {
    return Array.from(this._selectElement.selectedOptions);
  }

  get _selectElement() {
    return this._element.querySelector("#multiselect")
  }

  constructor() {
    super(`
        <style>
            @import '../style.css';
        </style>
        <div class="vl-form__input">
          <div class="js-vl-multiselect">
            <select 
              id="multiselect" 
              multiple 
              is="vl-select"
              name="multiselect" 
              data-vl-multiselect>
              </select>
              <slot></slot>
            </div>
        </div>
    `);
  }

  connectedCallback() {
    this.__init();

    this._selectElement.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('change', {
        'detail': {
          'value': this._selectedOptions.map(s => s.value)
        }
      }));
    })

  }

  /**
   * Initialiseer de multiselect.
   */
  __init() {
    this._shadow.querySelector('slot').assignedElements()
    .forEach((element) => {
      this._selectElement.append(element);
    });

    if (this.__shouldDress()) {
      this.dress();
    }
  }

  /**
   * @return {boolean} true if the 'vl-multiselect' should be dressed.
   * @private
   */
  __shouldDress() {
    return this.hasAttribute('data-vl-multiselect');
  }

  /**
   * Initialiseer de wrapped 'vl-select'
   *
   * @see https://www.npmjs.com/package/choices.js
   * @param params object with callbackFn: function(select) with return value the items for `setChoices`
   */
  dress(params) {
    this._selectElement.dress(params);
  }

  /**
   * Vernietigt de wrapped 'vl-select'
   *
   * @see https://www.npmjs.com/package/choices.js
   */
  undress() {
    this._selectElement.undress();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    let attributesToDelegate = VlMultiSelect._observedDelegateAttributes
    .filter(attribute => attribute === attr);

    attributesToDelegate
    .forEach(attribute => {
      this.__delegateAttributeChangedCallback(newValue, attribute);
    });

    if (attributesToDelegate.length === 0) {
      super.attributeChangedCallback(attr, oldValue, newValue);
    }
  }

  __delegateAttributeChangedCallback(newValue, attribute) {
    if (newValue != null) {
      this._selectElement.setAttribute(attribute, newValue);
    } else {
      this._selectElement.removeAttribute(attribute);
    }
  }
}

(() => {
  loadScript('util.js', '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
    loadScript('core.js', '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js', () => {
      loadScript('multiselect.js', '../dist/multiselect.js', () => {
        window.customElements.whenDefined('vl-select')
        .then(() => {
          define('vl-multiselect', VlMultiSelect);
        });
      });
    });
  });

  function loadScript(id, src, onload) {
    if (!document.head.querySelector('#' + id)) {
      let script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('src', src);
      script.onload = onload;
      document.head.appendChild(script);
    }
  }
})();