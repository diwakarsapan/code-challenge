import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['emailInput', 'emailError', 'saveButton'];

  validateEmail() {
    const error = !this.emailInputTarget.value.endsWith('@getmainstreet.com');
    this.emailInputTarget.classList.toggle('is-invalid', error);
    this.emailErrorTarget.textContent = error ? 'should be @getmainstreet.com' : '';
    this.saveButtonTarget.disabled = error;
  }
}
