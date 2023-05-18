import { faker } from '@faker-js/faker';
import { copyToClipboard, Notify } from 'quasar';
import { startCase } from 'lodash';

async function postActions (name, result) {
  if (typeof result === 'object') {
    result = JSON.stringify(result, null, 2);
  }
  await copyToClipboard(result);
  Notify.create({
    color: 'positive',
    message: `${name} copied to clipboard`,
  });
}

function generateMethods (api, methods) {
  return methods.map((method) => {
    return {
      generatedMethoName: method,
      generatedFn: faker[api][method],
    };
  });
}

const fakerAPIs = [
  {
    emoji: '🛫',
    api: 'airline',
    methods: [
      'aircraftType',
      'airline',
      'airplane',
      'airport',
      'flightNumber',
      'recordLocator',
      'seat',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🦆',
    api: 'animal',
    methods: [
      'bear',
      'bird',
      'cat',
      'cetacean',
      'cow',
      'crocodilia',
      'dog',
      'fish',
      'horse',
      'insect',
      'lion',
      'rabbit',
      'rodent',
      'snake',
      'type',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎨',
    api: 'color',
    methods: [
      'cmyk',
      'colorByCSSColorSpace',
      'cssSupportedFunction',
      'cssSupportedSpace',
      'hsl',
      'human',
      'hwb',
      'lab',
      'lch',
      'rgb',
      'space',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏪',
    api: 'commerce',
    methods: [
      'department',
      'price',
      'product',
      'productAdjective',
      'productDescription',
      'productMaterial',
      'productName',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏢',
    api: 'company',
    methods: [
      'bs',
      'bsAdjective',
      'bsBuzz',
      'bsNoun',
      'buzzAdjective',
      'buzzNoun',
      'buzzPhrase',
      'buzzVerb',
      'catchPhrase',
      'catchPhraseAdjective',
      'catchPhraseDescriptor',
      'catchPhraseNoun',
      'companySuffix',
      'name',
      'suffixes',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💽',
    api: 'database',
    methods: [
      'collation',
      'column',
      'engine',
      'mongodbObjectId',
      'type',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💾',
    api: 'datatype',
    methods: [
      'array',
      'bigint',
      'boolean',
      'datetime',
      'float',
      'hexadecimal',
      'json',
      'number',
      'string',
      'uuid',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '📆',
    api: 'date',
    methods: [
      'anytime',
      'between',
      'betweens',
      'birthdate',
      'future',
      'month',
      'past',
      'recent',
      'soon',
      'weekday',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏦',
    api: 'finance',
    methods: [
      'account',
      'accountName',
      'accountNumber',
      'amount',
      'bic',
      'bitcoinAddress',
      'creditCardCVV',
      'creditCardIssuer',
      'creditCardNumber',
      'currency',
      'currencyCode',
      'currencyName',
      'currencySymbol',
      'ethereumAddress',
      'iban',
      'mask',
      'maskNumber',
      'pin',
      'routingNumber',
      'transactionDescription',
      'transactionType',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🐙',
    api: 'git',
    methods: [
      'branch',
      'commitDate',
      'commitEntry',
      'commitMessage',
      'commitSha',
      'shortSha',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '👨‍💻',
    api: 'hacker',
    methods: [
      'abbreviation',
      'adjective',
      'ingverb',
      'noun',
      'phrase',
      'verb',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  // TODO: Handle error: "Argument is requried"
  // {
  //   emoji: '🆘',
  //   api: 'helpers',
  //   methods: [
  //     'arrayElement',
  //     'arrayElements',
  //     'enumValue',
  //     'fake',
  //     'fromRegExp',
  //     'maybe',
  //     'multiple',
  //     'mustache',
  //     'objectEntry',
  //     'objectKey',
  //     'objectValue',
  //     'rangeToNumber',
  //     'regexpStyleStringParse',
  //     'replaceCreditCardSymbols',
  //     'replaceSymbolWithNumber',
  //     'replaceSymbols',
  //     'shuffle',
  //     'slugify',
  //     'unique',
  //     'uniqueArray',
  //     'weightedArrayElement',
  //   ],
  //   generateMethods: function () {
  //     return generateMethods(this.api, this.methods);
  //   },
  // },
  {
    emoji: '🌇',
    api: 'image',
    methods: [
      // 'abastact',
      'animals',
      'avatar',
      'avatarGitHub',
      'avatarLegacy',
      'business',
      'cats',
      'city',
      'dataUri',
      'fashion',
      'food',
      'image',
      'imageUrl',
      'nature',
      'nightlife',
      'people',
      'sports',
      'technics',
      'transport',
      'url',
      'urlLoremFlickr',
      'urlPicsumPhotos',
      'urlPlaceholder',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🌐',
    api: 'internet',
    methods: [
      'avatar',
      'color',
      'displayName',
      'domainName',
      'domainSuffix',
      'domainWord',
      'email',
      'emoji',
      'exampleEmail',
      'httpMethod',
      'httpStatusCode',
      'ip',
      'ipv4',
      'ipv6',
      'mac',
      'password',
      'port',
      'protocol',
      'url',
      'userAgent',
      'userName',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '📍',
    api: 'location',
    methods: [
      'buildingNumber',
      'cardinalDirection',
      'city',
      'cityName',
      'country',
      'countryCode',
      'county',
      'direction',
      'latitude',
      'longitude',
      'nearbyGPSCoordinate',
      'ordinalDirection',
      'secondaryAddress',
      'state',
      'stateAbbr',
      'street',
      'streetAddress',
      'streetName',
      'timeZone',
      'zipCode',
      'zipCodeByState',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎲',
    api: 'lorem',
    methods: [
      'lines',
      'paragraph',
      'paragraphs',
      'sentence',
      'sentences',
      'slug',
      'text',
      'word',
      'words',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎶',
    api: 'music',
    methods: [
      'genre',
      'songName',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🔢',
    api: 'number',
    methods: [
      'bigInt',
      'binary',
      'float',
      'hex',
      'int',
      'octal',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🧑',
    api: 'person',
    methods: [
      'bio',
      'firstName',
      'fullName',
      'gender',
      'jobArea',
      'jobDescriptor',
      'jobTitle',
      'jobType',
      'lastName',
      'middleName',
      'prefix',
      'sex',
      'suffix',
      'zodiacSign',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '☎️',
    api: 'phone',
    methods: [
      'imei',
      'number',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎲',
    api: 'random',
    methods: [
      'alpha',
      'alphaNumeric',
      'numeric',
      'word',
      'words',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '⚛️',
    api: 'science',
    methods: [
      'chemicalElement',
      'unit',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🧶',
    api: 'string',
    methods: [
      'alpha',
      'alphanumeric',
      'binary',
      'fromCharacters',
      'hexadecimal',
      'nanoid',
      'numeric',
      'octal',
      'sample',
      'symbol',
      'uuid',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🖥️',
    api: 'system',
    methods: [
      'commonFileExt',
      'commonFileName',
      'commonFileType',
      'cron',
      'directoryPath',
      'fileExt',
      'fileName',
      'filePath',
      'fileType',
      'mimeType',
      'networkInterface',
      'semver',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🛞',
    api: 'vehicle',
    methods: [
      'bicycle',
      'color',
      'fuel',
      'manufacturer',
      'model',
      'type',
      'vehicle',
      'vin',
      'vrm',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💬',
    api: 'word',
    methods: [
      'adjective',
      'adverb',
      'conjunction',
      'interjection',
      'noun',
      'preposition',
      'sample',
      'verb',
      'words',
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
];

export const fakerMethods = fakerAPIs.flatMap((fakerApi) => {
  const api = fakerApi.api;
  const emoji = fakerApi.emoji;
  const methods = fakerApi.generateMethods();
  return methods.map((method) => {
    const { generatedMethoName, generatedFn } = method;
    const name = startCase(generatedMethoName);
    const apiName = `${emoji || ''} ${startCase(api)}`;
    return {
      apiName,
      name,
      emoji,
      fakerFn: async (options) => {
        const result = generatedFn(options);
        await postActions(name, result);
        return result;
      },
    };
  });
});
