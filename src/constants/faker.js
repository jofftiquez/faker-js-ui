import { faker } from '@faker-js/faker';
import { startCase } from 'lodash';

function generateMethods (api, methods) {
  return methods.map((method) => {
    return {
      generatedFieldTypes: method.fieldTypes,
      generatedMethodName: method.name,
      generatedMethod: faker[api][method.name],
      generatedParams: method.params,
    };
  });
}

function generateRegexVariants (inputString) {
  const variants = [
    inputString.toLowerCase(),
    inputString.toUpperCase(),
    inputString.replace(/\b\w/g, (match) => match.toUpperCase()),
    inputString.replace(/\s+(.)(\w+)/g, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase()),
    inputString.replace(/\s/g, '-'),
    inputString.replace(/\s/g, '_'),
    inputString.replace(/\s/g, ''),
    inputString.split(' ').map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(''),
    inputString.split(' ').map((word) => word.toLowerCase()).join('_'),
    inputString.split(' ').map((word) => word.toLowerCase()).join('-'),
  ];

  const regexVariants = variants.map((variant) => new RegExp(`^${variant}$`));

  return regexVariants;
}

const fakerAPIs = [
  {
    emoji: '🛫',
    api: 'airline',
    methods: [
      {
        name: 'aircraftType',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'airline',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'airplane',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'airport',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'flightNumber',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'recordLocator',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'seat',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🦆',
    api: 'animal',
    methods: [
      {
        name: 'bear',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bird',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cat',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cetacean',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cow',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'crocodilia',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'dog',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fish',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'horse',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'insect',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'lion',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'rabbit',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'rodent',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'snake',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'type',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎨',
    api: 'color',
    methods: [
      {
        name: 'cmyk',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'colorByCSSColorSpace',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cssSupportedFunction',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cssSupportedSpace',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'hsl',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'human',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'hwb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'lab',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'lch',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'rgb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'space',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏪',
    api: 'commerce',
    methods: [
      {
        name: 'department',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'price',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'product',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'productAdjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'productDescription',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'productMaterial',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'productName',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏢',
    api: 'company',
    methods: [
      {
        name: 'bs',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bsAdjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bsBuzz',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bsNoun',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'buzzAdjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'buzzNoun',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'buzzPhrase',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'buzzVerb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'catchPhrase',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseAdjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseDescriptor',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseNoun',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'companySuffix',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'name',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'suffixes',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💽',
    api: 'database',
    methods: [
      {
        name: 'collation',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'column',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'engine',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'mongodbObjectId',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'type',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💾',
    api: 'datatype',
    methods: [
      {
        name: 'array',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bigint',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'boolean',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'datetime',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'float',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'hexadecimal',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'json',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'number',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'string',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'uuid',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '📆',
    api: 'date',
    methods: [
      {
        name: 'anytime',
        fieldTypes: ['text', 'time', 'date'],
        params: [],
      },
      {
        name: 'between',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'betweens',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'birthdate',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'future',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'month',
        fieldTypes: ['text', 'date', 'month'],
        params: [],
      },
      {
        name: 'past',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'recent',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'soon',
        fieldTypes: ['text', 'date'],
        params: [],
      },
      {
        name: 'weekday',
        fieldTypes: ['text', 'date'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🏦',
    api: 'finance',
    methods: [
      {
        name: 'account',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'accountName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'accountNumber',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'amount',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bic',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'bitcoinAddress',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'creditCardCVV',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'creditCardIssuer',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'creditCardNumber',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'currency',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'currencyCode',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'currencyName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'currencySymbol',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'ethereumAddress',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'iban',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'mask',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'maskNumber',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'pin',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'routingNumber',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'transactionDescription',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'transactionType',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🐙',
    api: 'git',
    methods: [
      {
        name: 'branch',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commitDate',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commitEntry',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commitMessage',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commitSha',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'shortSha',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '👨‍💻',
    api: 'hacker',
    methods: [
      {
        name: 'abbreviation',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'adjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'ingverb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'noun',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'phrase',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'verb',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  // // TODO: Handle error: "Argument is requried"
  // // {
  // //   emoji: '🆘',
  // //   api: 'helpers',
  // //   methods: [
  // //     'arrayElement',
  // //     'arrayElements',
  // //     'enumValue',
  // //     'fake',
  // //     'fromRegExp',
  // //     'maybe',
  // //     'multiple',
  // //     'mustache',
  // //     'objectEntry',
  // //     'objectKey',
  // //     'objectValue',
  // //     'rangeToNumber',
  // //     'regexpStyleStringParse',
  // //     'replaceCreditCardSymbols',
  // //     'replaceSymbolWithNumber',
  // //     'replaceSymbols',
  // //     'shuffle',
  // //     'slugify',
  // //     'unique',
  // //     'uniqueArray',
  // //     'weightedArrayElement',
  // //   ],
  // //   generateMethods: function () {
  // //     return generateMethods(this.api, this.methods);
  // //   },
  // // },
  {
    emoji: '🌇',
    api: 'image',
    methods: [
      // 'abastact',
      {
        name: 'animals',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'avatar',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'avatarGitHub',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'avatarLegacy',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'business',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cats',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'city',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'dataUri',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fashion',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'food',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'image',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'imageUrl',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'nature',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'nightlife',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'people',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sports',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'technics',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'transport',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'url',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'urlLoremFlickr',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'urlPicsumPhotos',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'urlPlaceholder',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🌐',
    api: 'internet',
    methods: [
      {
        name: 'avatar',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'color',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'displayName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'domainName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'domainSuffix',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'domainWord',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'email',
        fieldTypes: ['text', 'email'],
        params: [],
      },
      {
        name: 'emoji',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'exampleEmail',
        fieldTypes: ['text', 'email'],
        params: [],
      },
      {
        name: 'httpMethod',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'httpStatusCode',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'ip',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'ipv4',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'ipv6',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'mac',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'password',
        fieldTypes: ['text', 'password'],
        params: [],
      },
      {
        name: 'port',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'protocol',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'url',
        fieldTypes: ['text', 'url'],
        params: [],
      },
      {
        name: 'userAgent',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'userName',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '📍',
    api: 'location',
    methods: [
      {
        name: 'buildingNumber',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'cardinalDirection',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'city',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'cityName',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'country',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'countryCode',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'county',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'direction',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'latitude',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'longitude',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'nearbyGPSCoordinate',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'ordinalDirection',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'secondaryAddress',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'state',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'stateAbbr',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'street',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'streetAddress',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'streetName',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'timeZone',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'zipCode',
        params: [],
        fieldTypes: ['text'],
      },
      {
        name: 'zipCodeByState',
        params: [],
        fieldTypes: ['text'],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎲',
    api: 'lorem',
    methods: [
      {
        name: 'lines',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'paragraph',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'paragraphs',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sentence',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sentences',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'slug',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'text',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'word',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'words',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎶',
    api: 'music',
    methods: [
      {
        name: 'genre',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'songName',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🔢',
    api: 'number',
    methods: [
      {
        name: 'bigInt',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'binary',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'float',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'hex',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'int',
        fieldTypes: ['text', 'number'],
        params: [],
      },
      {
        name: 'octal',
        fieldTypes: ['text', 'number'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🧑',
    api: 'person',
    methods: [
      {
        name: 'bio',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'firstName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fullName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'gender',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'jobArea',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'jobDescriptor',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'jobTitle',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'jobType',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'lastName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'middleName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'prefix',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sex',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'suffix',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'zodiacSign',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '☎️',
    api: 'phone',
    methods: [
      {
        name: 'imei',
        fieldTypes: ['text', 'tel'],
        params: [],
      },
      {
        name: 'number',
        fieldTypes: ['text', 'tel'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🎲',
    api: 'random',
    methods: [
      {
        name: 'alpha',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'alphaNumeric',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'numeric',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'word',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'words',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '⚛️',
    api: 'science',
    methods: [
      {
        name: 'chemicalElement',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'unit',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🧶',
    api: 'string',
    methods: [
      {
        name: 'alpha',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'alphanumeric',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'binary',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fromCharacters',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'hexadecimal',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'nanoid',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'numeric',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'octal',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sample',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'symbol',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'uuid',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🖥️',
    api: 'system',
    methods: [
      {
        name: 'commonFileExt',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commonFileName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'commonFileType',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'cron',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'directoryPath',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fileExt',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fileName',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'filePath',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fileType',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'mimeType',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'networkInterface',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'semver',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '🛞',
    api: 'vehicle',
    methods: [
      {
        name: 'bicycle',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'color',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'fuel',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'manufacturer',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'model',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'type',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'vehicle',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'vin',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'vrm',
        fieldTypes: ['text'],
        params: [],
      },
    ],
    generateMethods: function () {
      return generateMethods(this.api, this.methods);
    },
  },
  {
    emoji: '💬',
    api: 'word',
    methods: [
      {
        name: 'adjective',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'adverb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'conjunction',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'interjection',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'noun',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'preposition',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'sample',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'verb',
        fieldTypes: ['text'],
        params: [],
      },
      {
        name: 'words',
        fieldTypes: ['text'],
        params: [],
      },
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
    const { generatedMethodName, generatedMethod, generatedParams } = method;
    const name = startCase(generatedMethodName);
    const apiName = `${emoji || ''} ${startCase(api)}`;
    const searchNeedle = `${startCase(api)} - ${name}`;
    const regex = [...generateRegexVariants(api), ...generateRegexVariants(name), ...method.generatedFieldTypes.flatMap(generateRegexVariants)];
    return {
      apiName,
      emoji,
      name,
      fieldTypes: method.generatedFieldTypes,
      params: generatedParams,
      searchNeedle,
      regex,
      fakerFn: async ({ options } = {}) => {
        const result = generatedMethod(options);
        if (!isNaN(Number(result))) return Number(result);
        return result;
      },
    };
  });
});
