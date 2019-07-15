import {define, VlElement} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-select/vl-select.js';

(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
        loadScript('core.js',
            '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js', () => {
              loadScript('multiselect.js', '../dist/multiselect.js');
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

/**

 */
export class VlMultiSelect extends VlElement(HTMLElement) {

  constructor() {
    super(`
        <style>
            @import '../style.css';
        </style>
        <div class="vl-form__input">
          <div class="js-vl-multiselect">
            <select 
              id="multiselect" 
              is="vl-select"
              multiple 
              name="multiselect" 
              class="vl-multiselect"
              data-vl-multiselect>
              </select>
              <slot></slot>
            </div>
        </div>
    `);
  }

  connectedCallback() {
    this.dress();
  }

  /**
   * Initialiseer de multiselect.
   */
  dress() {
    (async () => {
      while (!window.vl || !window.vl.select) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this._shadow.querySelector('slot').assignedElements().forEach((element) => {
        this._selectElement.append(element);
      });

      if (!this._selectDressed) {
        vl.select.dress(this._selectElement);
      }
    })();
  }

  get _selectElement() {
    return this._element.querySelector("#multiselect")
  }

  get _selectDressed() {
    return !!this._selectElement.getAttribute('data-vl-select-dressed');
  }
}

define('vl-multiselect', VlMultiSelect);