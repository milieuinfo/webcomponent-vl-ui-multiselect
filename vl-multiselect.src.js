import {define, VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-select/vl-select.js';

/**

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
    return ['data-vl-select-search-empty-text', 'error', 'success', 'disabled'];
  }

  static get _observedDelegatedEvents() {
    return ['change'];
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
              class="vl-multiselect vl-select"
              data-vl-multiselect>
              </select>
              <slot></slot>
            </div>
        </div>
    `);
  }

  connectedCallback() {
    this.__dress();
    VlMultiSelect._observedDelegatedEvents.forEach((eventName) => {
      this._selectElement.addEventListener(eventName, (e) => {
        this.dispatchEvent(new CustomEvent(eventName, e.payload));
      })
    });
  }

  disconnectedCallback() {
    VlMultiSelect._observedDelegatedEvents.forEach((eventName) => {
      this._selectElement.removeEventListener(eventName);
    });
    super.disconnectedCallback();
  }

  /**
   * Initialiseer de multiselect.
   */
  __dress() {
    this._shadow.querySelector('slot').assignedElements()
    .forEach((element) => {
      this._selectElement.append(element);
    });

    if (!this._selectDressed) {
      vl.select.dress(this._selectElement);
    }
  }

  get _selectElement() {
    return this._element.querySelector("#multiselect")
  }

  get _selectDressed() {
    return !!this._selectElement.getAttribute('data-vl-select-dressed');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    VlMultiSelect._observedDelegateAttributes
    .filter(attribute => attribute === attr)
    .forEach(attribute => {
      this.__delegateAttributeChangedCallback(newValue, attribute);
    });

    super.attributeChangedCallback(attr, oldValue, newValue);
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