// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';

export default bexContent((bridge) => {
  const forms = document.forms;

  const fields = [];

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
    }
  }

  bridge.send('dom.fields', fields);

  console.warn('fields form my-content', fields);

  bridge.on('test', (data) => {
    console.warn('test from my-content', data);
  });
});
