// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';
import { fakerMethods } from 'src/constants/faker';

export default bexContent((bridge) => {
  const supportedFieldTypes = [
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
    'color',
  ];
  function findMethod (str) {
    return fakerMethods.find((method) => {
      return method.regex.some((r) => r.test(str));
    });
  }
  function findFormFields () {
    const forms = document.forms;

    const fields = []; // for later use

    // Step 3: Iterate over each form
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];

      // Step 4: Iterate over each form control
      for (let j = 0; j < form.elements.length; j++) {
        const field = form.elements[j];

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

        if (!supportedFieldTypes.includes(field.type)) return;

        const fakerMethod = findMethod(field.name) || findMethod(field.type) || findMethod('word');

        if (!fakerMethod) continue;

        fakerMethod.fakerFn()
          .then((value) => {
            field.value = value;
          });
      }
    }
  }

  bridge.on('fakerjsui.fillout', (event) => {
    console.warn('data', fakerMethods);
    findFormFields();
  });
});
