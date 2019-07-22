import {
  html,
  LitElement
} from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import {define} from '/node_modules/vl-ui-core/vl-core.js';
import '../vl-multiselect.src.js';

export class LitElementDemo extends LitElement {

  constructor() {
    super();
  }

  firstUpdated() {
    customElements.whenDefined('vl-multiselect').then(() => {
      let multiselect = this.shadowRoot.getElementById('vl-multiselect');
      console.dir(multiselect);
      multiselect.dress({
        callbackFn: (select) => {
          return [
            {value: 'One', label: 'Label One', disabled: true},
            {value: 'Two', label: 'Label Two', selected: true},
            {value: 'Three', label: 'Label Three'},
          ];
        }
      });
    });
  }

  render() {
    return html`<vl-multiselect id="vl-multiselect"></vl-multiselect>`;
  }
}

define('lit-element-demo', LitElementDemo);