import { faker } from '@faker-js/faker';
import { copyToClipboard, Notify } from 'quasar';

async function postActions (result) {
  await copyToClipboard(result);
  Notify.create({
    color: 'positive',
    message: `Copied ${result} to clipboard`,
  });
}

export const commonActions = [
  {
    icon: 'email',
    name: 'Email Address',
    fakerFn: async (options) => {
      const result = faker.internet.email(options);
      await postActions(result);
      return result;
    },
  },
  {
    icon: 'person',
    name: 'Full Name',
    fakerFn: async (options) => {
      const result = faker.person.fullName(options);
      await postActions(result);
      return result;
    },
  },
  {
    icon: 'person',
    name: 'First Name',
    fakerFn: async (options) => {
      const result = faker.person.firstName(options);
      await postActions(result);
      return result;
    },
  },
  {
    icon: 'person',
    name: 'Last Name',
    fakerFn: async (options) => {
      const result = faker.person.lastName(options);
      await postActions(result);
      return result;
    },
  },
];
