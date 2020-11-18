import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';
import { Controller } from 'stimulus';

const swatches = [
  'rgb(244, 67, 54)',
  'rgb(233, 30, 99)',
  'rgb(156, 39, 176)',
  'rgb(103, 58, 183)',
  'rgb(63, 81, 181)',
  'rgb(33, 150, 243)',
  'rgb(3, 169, 244)',
  'rgb(0, 188, 212)',
  'rgb(0, 150, 136)',
];

function hex(color) {
  return color.toHEXA().toString();
}
export default class extends Controller {
  static targets = ['picker', 'input', 'style'];

  connect() {
    this.initializePicker();
    this.bindEvents();
  }

  disconnect() {
    this.unbindEvents();
  }

  initializePicker() {
    this.picker = Pickr.create({
      el: this.pickerTarget,
      theme: 'nano',
      swatches,
      default: this.inputTarget.value,
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          save: true
        }
      }
    });
  }

  bindEvents() {
    this.picker
      .on('save', (color) => {
        this.inputTarget.value = hex(color);
        this.picker.hide();
      })
      .on('change', (color) => this.updatePreview(hex(color)))
      .on('hide', () => this.updatePreview(this.inputTarget.value));
  }

  unbindEvents() {
    this.picker.off('save').off('change');
  }

  updatePreview(val) {
    this.styleTarget.innerText = `.bg-success { background-color: ${val} !important; }`;
  }
}
