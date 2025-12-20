// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers';
import { fakerMethods } from 'src/constants/faker';

export default bexContent((bridge) => {
  /**
   * Field type to faker method mappings for intelligent auto-detection
   */
  const fieldTypeMappings = {
    email: ['internet', 'email'],
    password: ['internet', 'password'],
    tel: ['phone', 'number'],
    url: ['internet', 'url'],
    date: ['date', 'anytime'],
    'datetime-local': ['date', 'anytime'],
    month: ['date', 'month'],
    number: ['number', 'int'],
    search: ['lorem', 'word'],
  };

  /**
   * Common field name patterns and their faker method mappings
   */
  const fieldNamePatterns = [
    // Person fields
    { patterns: [/first.?name/i, /fname/i, /given.?name/i], method: ['person', 'firstName'] },
    { patterns: [/last.?name/i, /lname/i, /surname/i, /family.?name/i], method: ['person', 'lastName'] },
    { patterns: [/full.?name/i, /name/i, /your.?name/i], method: ['person', 'fullName'] },
    { patterns: [/middle.?name/i, /mname/i], method: ['person', 'middleName'] },
    { patterns: [/user.?name/i, /username/i, /login/i, /handle/i], method: ['internet', 'userName'] },
    { patterns: [/gender/i, /sex/i], method: ['person', 'sex'] },
    { patterns: [/job.?title/i, /position/i, /occupation/i], method: ['person', 'jobTitle'] },
    { patterns: [/bio/i, /about/i, /description/i], method: ['person', 'bio'] },

    // Contact fields
    { patterns: [/e.?mail/i, /email/i], method: ['internet', 'email'] },
    { patterns: [/phone/i, /mobile/i, /cell/i, /tel/i], method: ['phone', 'number'] },
    { patterns: [/website/i, /url/i, /site/i, /homepage/i], method: ['internet', 'url'] },

    // Address fields
    { patterns: [/street/i, /address.?1/i, /address.?line/i], method: ['location', 'streetAddress'] },
    { patterns: [/address.?2/i, /apt/i, /suite/i, /unit/i], method: ['location', 'secondaryAddress'] },
    { patterns: [/city/i, /town/i], method: ['location', 'city'] },
    { patterns: [/state/i, /province/i, /region/i], method: ['location', 'state'] },
    { patterns: [/zip/i, /postal/i, /postcode/i], method: ['location', 'zipCode'] },
    { patterns: [/country/i], method: ['location', 'country'] },

    // Company fields
    { patterns: [/company/i, /organization/i, /org/i, /employer/i], method: ['company', 'name'] },

    // Date fields
    { patterns: [/birth/i, /dob/i, /birthday/i], method: ['date', 'birthdate'] },
    { patterns: [/date/i], method: ['date', 'anytime'] },

    // Content fields
    { patterns: [/title/i, /subject/i, /headline/i], method: ['lorem', 'sentence'] },
    { patterns: [/message/i, /comment/i, /note/i, /feedback/i], method: ['lorem', 'paragraph'] },
    { patterns: [/content/i, /body/i, /text/i], method: ['lorem', 'paragraphs'] },

    // Finance fields
    { patterns: [/credit.?card/i, /card.?number/i, /cc/i], method: ['finance', 'creditCardNumber'] },
    { patterns: [/cvv/i, /cvc/i, /security.?code/i], method: ['finance', 'creditCardCVV'] },
    { patterns: [/price/i, /amount/i, /cost/i], method: ['commerce', 'price'] },

    // Misc
    { patterns: [/password/i, /pass/i, /pwd/i], method: ['internet', 'password'] },
    { patterns: [/avatar/i, /profile.?pic/i, /photo/i], method: ['image', 'avatar'] },
    { patterns: [/color/i, /colour/i], method: ['color', 'human'] },
  ];

  /**
   * Find the associated label text for a field
   */
  function getFieldLabel (field) {
    // Check for aria-label
    if (field.getAttribute('aria-label')) {
      return field.getAttribute('aria-label');
    }

    // Check for associated label via id
    if (field.id) {
      const label = document.querySelector(`label[for="${field.id}"]`);
      if (label) return label.textContent.trim();
    }

    // Check for wrapping label
    const parentLabel = field.closest('label');
    if (parentLabel) {
      return parentLabel.textContent.trim();
    }

    // Check for aria-labelledby
    const labelledBy = field.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelEl = document.getElementById(labelledBy);
      if (labelEl) return labelEl.textContent.trim();
    }

    return '';
  }

  /**
   * Find matching faker method based on field attributes
   */
  function findMatchingMethod (field) {
    const fieldType = field.type || 'text';
    const fieldName = field.name || '';
    const fieldId = field.id || '';
    const fieldPlaceholder = field.placeholder || '';
    const fieldLabel = getFieldLabel(field);
    const fieldAutocomplete = field.getAttribute('autocomplete') || '';

    // All searchable text combined
    const searchTexts = [fieldName, fieldId, fieldPlaceholder, fieldLabel, fieldAutocomplete].filter(Boolean);

    // 1. Check field type mappings first
    if (fieldTypeMappings[fieldType]) {
      const [api, methodName] = fieldTypeMappings[fieldType];
      const method = fakerMethods.find(m =>
        m.name.toLowerCase() === methodName.toLowerCase() &&
        m.apiName.toLowerCase().includes(api.toLowerCase()),
      );
      if (method) return method;
    }

    // 2. Check field name patterns
    for (const { patterns, method: [api, methodName] } of fieldNamePatterns) {
      for (const text of searchTexts) {
        if (patterns.some(pattern => pattern.test(text))) {
          const method = fakerMethods.find(m =>
            m.name.toLowerCase() === methodName.toLowerCase() &&
            m.apiName.toLowerCase().includes(api.toLowerCase()),
          );
          if (method) return method;
        }
      }
    }

    // 3. Check against faker method regex patterns
    for (const text of searchTexts) {
      const method = fakerMethods.find(m =>
        m.regex.some(r => r.test(text)),
      );
      if (method) return method;
    }

    // 4. Fallback based on field type
    if (fieldType === 'textarea') {
      return fakerMethods.find(m => m.name === 'Paragraph');
    }

    // 5. Default fallback to word
    return fakerMethods.find(m => m.name === 'Word');
  }

  /**
   * Trigger input events to notify frameworks (React, Vue, Angular) of changes
   */
  function triggerInputEvents (field, value) {
    // Set value using native setter to bypass framework getters/setters
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      field.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype,
      'value',
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(field, value);
    } else {
      field.value = value;
    }

    // Dispatch events in the correct order
    field.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    field.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    field.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

    // React 16+ specific
    const tracker = field._valueTracker;
    if (tracker) {
      tracker.setValue('');
    }
  }

  /**
   * Handle select/dropdown fields
   */
  async function fillSelectField (field) {
    const options = Array.from(field.options).filter(opt => opt.value && !opt.disabled);
    if (options.length > 0) {
      // Pick a random non-empty option
      const randomIndex = Math.floor(Math.random() * options.length);
      field.selectedIndex = options[randomIndex].index;
      field.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }
    return false;
  }

  /**
   * Handle checkbox fields
   */
  function fillCheckboxField (field) {
    field.checked = Math.random() > 0.5;
    field.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  /**
   * Handle radio button groups
   */
  function fillRadioField (field) {
    const name = field.name;
    if (!name) return false;

    const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
    if (radios.length > 0) {
      const randomIndex = Math.floor(Math.random() * radios.length);
      radios[randomIndex].checked = true;
      radios[randomIndex].dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }
    return false;
  }

  /**
   * Format date value for date inputs
   */
  function formatDateValue (date, inputType) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    switch (inputType) {
      case 'date':
        return `${year}-${month}-${day}`;
      case 'datetime-local':
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      case 'month':
        return `${year}-${month}`;
      case 'time':
        return `${hours}:${minutes}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }

  /**
   * Visual feedback - briefly highlight filled fields
   */
  function highlightField (field) {
    const originalOutline = field.style.outline;
    const originalTransition = field.style.transition;

    field.style.transition = 'outline 0.3s ease';
    field.style.outline = '2px solid #4CAF50';

    setTimeout(() => {
      field.style.outline = originalOutline;
      setTimeout(() => {
        field.style.transition = originalTransition;
      }, 300);
    }, 500);
  }

  /**
   * Main function to find and fill all form fields
   */
  async function findAndFillFormFields () {
    // Input types to process
    const inputTypes = [
      'text', 'email', 'password', 'number', 'tel', 'url', 'search',
      'date', 'datetime-local', 'month', 'time',
    ];

    const inputSelector = inputTypes.map(t => `input[type="${t}"]`).join(', ');

    // Get all fillable fields
    const inputs = document.querySelectorAll(inputSelector);
    const textareas = document.querySelectorAll('textarea');
    const selects = document.querySelectorAll('select');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const radios = document.querySelectorAll('input[type="radio"]');

    const processedRadioGroups = new Set();
    let filledCount = 0;

    // Process text inputs
    for (const field of inputs) {
      // Skip hidden, disabled, or readonly fields
      if (field.disabled || field.readOnly || field.type === 'hidden') continue;
      if (field.offsetParent === null) continue; // Not visible

      const fakerMethod = findMatchingMethod(field);
      if (!fakerMethod) continue;

      try {
        let value = await fakerMethod.fakerFn();

        // Format dates appropriately
        if (['date', 'datetime-local', 'month', 'time'].includes(field.type)) {
          value = formatDateValue(value, field.type);
        }

        // Convert to string if needed
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }

        triggerInputEvents(field, String(value));
        highlightField(field);
        filledCount++;
      } catch (error) {
        console.warn('FakerUI: Error filling field', field, error);
      }
    }

    // Process textareas
    for (const field of textareas) {
      if (field.disabled || field.readOnly) continue;
      if (field.offsetParent === null) continue;

      const fakerMethod = findMatchingMethod(field);
      if (!fakerMethod) continue;

      try {
        const value = await fakerMethod.fakerFn();
        triggerInputEvents(field, String(value));
        highlightField(field);
        filledCount++;
      } catch (error) {
        console.warn('FakerUI: Error filling textarea', field, error);
      }
    }

    // Process select dropdowns
    for (const field of selects) {
      if (field.disabled) continue;
      if (field.offsetParent === null) continue;

      try {
        if (await fillSelectField(field)) {
          highlightField(field);
          filledCount++;
        }
      } catch (error) {
        console.warn('FakerUI: Error filling select', field, error);
      }
    }

    // Process checkboxes
    for (const field of checkboxes) {
      if (field.disabled) continue;
      if (field.offsetParent === null) continue;

      try {
        fillCheckboxField(field);
        highlightField(field);
        filledCount++;
      } catch (error) {
        console.warn('FakerUI: Error filling checkbox', field, error);
      }
    }

    // Process radio buttons (one per group)
    for (const field of radios) {
      if (field.disabled) continue;
      if (field.offsetParent === null) continue;
      if (!field.name || processedRadioGroups.has(field.name)) continue;

      try {
        if (fillRadioField(field)) {
          processedRadioGroups.add(field.name);
          filledCount++;
        }
      } catch (error) {
        console.warn('FakerUI: Error filling radio', field, error);
      }
    }

    console.info(`FakerUI: Filled ${filledCount} fields`);
    return filledCount;
  }

  bridge.on('fakerjsui.fillout', async (event) => {
    const count = await findAndFillFormFields();
    bridge.send('fakerjsui.fillout.complete', { count });
  });
});
