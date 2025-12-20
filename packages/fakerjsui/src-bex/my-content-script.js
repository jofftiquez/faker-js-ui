// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';
import { fakerMethods } from 'src/constants/faker';

export default bexContent((bridge) => {
  function findMethod (str) {
    return fakerMethods.find((method) => {
      return method.regex.some((r) => r.test(str));
    });
  }

  function findFormFields () {
    const inputTypes = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
    ];

    const inputs = document.querySelectorAll(`input[type="${inputTypes.join('"], input[type="')}"]`);

    const fields = [];

    // Step 4: Iterate over each form control
    for (let j = 0; j < inputs.length; j++) {
      const field = inputs[j];

      // Step 4: Extract relevant information
      const fieldName = field.name;
      const fieldType = field.type;
      const fieldValue = field.value;

      fields.push({
        field,
        name: fieldName,
        type: fieldType,
        value: fieldValue,
      });

      const fakerMethod = findMethod(field.name) ||
        findMethod(field.id) ||
        findMethod(field.placeholder) ||
        findMethod(field.type) ||
        findMethod('word');

      if (!fakerMethod) continue;

      fakerMethod.fakerFn()
        .then((value) => {
          field.value = value;
        });
    }
  }

  bridge.on('fakerjsui.fillout', (event) => {
    findFormFields();
  });
});
