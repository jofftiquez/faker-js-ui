import { faker } from '@faker-js/faker';
import { startCase } from 'lodash';

function generateMethods (api, methods) {
  return methods.map((method) => {
    return {
      generatedTags: method.tags,
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'airline',
        tags: ['text'],
        params: [],
      },
      {
        name: 'airplane',
        tags: ['text'],
        params: [],
      },
      {
        name: 'airport',
        tags: ['text'],
        params: [],
      },
      {
        name: 'flightNumber',
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'recordLocator',
        tags: ['text'],
        params: [],
      },
      {
        name: 'seat',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'bird',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cat',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cetacean',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cow',
        tags: ['text'],
        params: [],
      },
      {
        name: 'crocodilia',
        tags: ['text'],
        params: [],
      },
      {
        name: 'dog',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fish',
        tags: ['text'],
        params: [],
      },
      {
        name: 'horse',
        tags: ['text'],
        params: [],
      },
      {
        name: 'insect',
        tags: ['text'],
        params: [],
      },
      {
        name: 'lion',
        tags: ['text'],
        params: [],
      },
      {
        name: 'rabbit',
        tags: ['text'],
        params: [],
      },
      {
        name: 'rodent',
        tags: ['text'],
        params: [],
      },
      {
        name: 'snake',
        tags: ['text'],
        params: [],
      },
      {
        name: 'type',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'colorByCSSColorSpace',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cssSupportedFunction',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cssSupportedSpace',
        tags: ['text'],
        params: [],
      },
      {
        name: 'hsl',
        tags: ['text'],
        params: [],
      },
      {
        name: 'human',
        tags: ['text'],
        params: [],
      },
      {
        name: 'hwb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'lab',
        tags: ['text'],
        params: [],
      },
      {
        name: 'lch',
        tags: ['text'],
        params: [],
      },
      {
        name: 'rgb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'space',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'price',
        tags: ['text'],
        params: [],
      },
      {
        name: 'product',
        tags: ['text'],
        params: [],
      },
      {
        name: 'productAdjective',
        tags: ['text'],
        params: [],
      },
      {
        name: 'productDescription',
        tags: ['text'],
        params: [],
      },
      {
        name: 'productMaterial',
        tags: ['text'],
        params: [],
      },
      {
        name: 'productName',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'bsAdjective',
        tags: ['text'],
        params: [],
      },
      {
        name: 'bsBuzz',
        tags: ['text'],
        params: [],
      },
      {
        name: 'bsNoun',
        tags: ['text'],
        params: [],
      },
      {
        name: 'buzzAdjective',
        tags: ['text'],
        params: [],
      },
      {
        name: 'buzzNoun',
        tags: ['text'],
        params: [],
      },
      {
        name: 'buzzPhrase',
        tags: ['text'],
        params: [],
      },
      {
        name: 'buzzVerb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'catchPhrase',
        tags: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseAdjective',
        tags: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseDescriptor',
        tags: ['text'],
        params: [],
      },
      {
        name: 'catchPhraseNoun',
        tags: ['text'],
        params: [],
      },
      {
        name: 'companySuffix',
        tags: ['text'],
        params: [],
      },
      {
        name: 'name',
        tags: ['text'],
        params: [],
      },
      {
        name: 'suffixes',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'column',
        tags: ['text'],
        params: [],
      },
      {
        name: 'engine',
        tags: ['text'],
        params: [],
      },
      {
        name: 'mongodbObjectId',
        tags: ['text'],
        params: [],
      },
      {
        name: 'type',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'bigint',
        tags: ['text'],
        params: [],
      },
      {
        name: 'boolean',
        tags: ['text'],
        params: [],
      },
      {
        name: 'datetime',
        tags: ['text'],
        params: [],
      },
      {
        name: 'float',
        tags: ['text'],
        params: [],
      },
      {
        name: 'hexadecimal',
        tags: ['text'],
        params: [],
      },
      {
        name: 'json',
        tags: ['text'],
        params: [],
      },
      {
        name: 'number',
        tags: ['text', 'age', 'number', 'no'],
        params: [],
      },
      {
        name: 'string',
        tags: ['text'],
        params: [],
      },
      {
        name: 'uuid',
        tags: ['text'],
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
        tags: ['text', 'time', 'date'],
        params: [],
      },
      {
        name: 'between',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'betweens',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'birthdate',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'future',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'month',
        tags: ['text', 'date', 'month'],
        params: [],
      },
      {
        name: 'past',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'recent',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'soon',
        tags: ['text', 'date'],
        params: [],
      },
      {
        name: 'weekday',
        tags: ['text', 'date'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'accountName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'accountNumber',
        tags: ['text'],
        params: [],
      },
      {
        name: 'amount',
        tags: ['text'],
        params: [],
      },
      {
        name: 'bic',
        tags: ['text'],
        params: [],
      },
      {
        name: 'bitcoinAddress',
        tags: ['text'],
        params: [],
      },
      {
        name: 'creditCardCVV',
        tags: ['text'],
        params: [],
      },
      {
        name: 'creditCardIssuer',
        tags: ['text'],
        params: [],
      },
      {
        name: 'creditCardNumber',
        tags: ['text'],
        params: [],
      },
      {
        name: 'currency',
        tags: ['text'],
        params: [],
      },
      {
        name: 'currencyCode',
        tags: ['text'],
        params: [],
      },
      {
        name: 'currencyName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'currencySymbol',
        tags: ['text'],
        params: [],
      },
      {
        name: 'ethereumAddress',
        tags: ['text'],
        params: [],
      },
      {
        name: 'iban',
        tags: ['text'],
        params: [],
      },
      {
        name: 'mask',
        tags: ['text'],
        params: [],
      },
      {
        name: 'maskNumber',
        tags: ['text'],
        params: [],
      },
      {
        name: 'pin',
        tags: ['text'],
        params: [],
      },
      {
        name: 'routingNumber',
        tags: ['text'],
        params: [],
      },
      {
        name: 'transactionDescription',
        tags: ['text'],
        params: [],
      },
      {
        name: 'transactionType',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'commitDate',
        tags: ['text'],
        params: [],
      },
      {
        name: 'commitEntry',
        tags: ['text'],
        params: [],
      },
      {
        name: 'commitMessage',
        tags: ['text'],
        params: [],
      },
      {
        name: 'commitSha',
        tags: ['text'],
        params: [],
      },
      {
        name: 'shortSha',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'adjective',
        tags: ['text'],
        params: [],
      },
      {
        name: 'ingverb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'noun',
        tags: ['text'],
        params: [],
      },
      {
        name: 'phrase',
        tags: ['text'],
        params: [],
      },
      {
        name: 'verb',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'avatar',
        tags: ['text'],
        params: [],
      },
      {
        name: 'avatarGitHub',
        tags: ['text'],
        params: [],
      },
      {
        name: 'avatarLegacy',
        tags: ['text'],
        params: [],
      },
      {
        name: 'business',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cats',
        tags: ['text'],
        params: [],
      },
      {
        name: 'city',
        tags: ['text'],
        params: [],
      },
      {
        name: 'dataUri',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fashion',
        tags: ['text'],
        params: [],
      },
      {
        name: 'food',
        tags: ['text'],
        params: [],
      },
      {
        name: 'image',
        tags: ['text'],
        params: [],
      },
      {
        name: 'imageUrl',
        tags: ['text'],
        params: [],
      },
      {
        name: 'nature',
        tags: ['text'],
        params: [],
      },
      {
        name: 'nightlife',
        tags: ['text'],
        params: [],
      },
      {
        name: 'people',
        tags: ['text'],
        params: [],
      },
      {
        name: 'sports',
        tags: ['text'],
        params: [],
      },
      {
        name: 'technics',
        tags: ['text'],
        params: [],
      },
      {
        name: 'transport',
        tags: ['text'],
        params: [],
      },
      {
        name: 'url',
        tags: ['text'],
        params: [],
      },
      {
        name: 'urlLoremFlickr',
        tags: ['text'],
        params: [],
      },
      {
        name: 'urlPicsumPhotos',
        tags: ['text'],
        params: [],
      },
      {
        name: 'urlPlaceholder',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'color',
        tags: ['text'],
        params: [],
      },
      {
        name: 'displayName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'domainName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'domainSuffix',
        tags: ['text'],
        params: [],
      },
      {
        name: 'domainWord',
        tags: ['text'],
        params: [],
      },
      {
        name: 'email',
        tags: ['text', 'email'],
        params: [],
      },
      {
        name: 'emoji',
        tags: ['text'],
        params: [],
      },
      {
        name: 'exampleEmail',
        tags: ['text', 'email'],
        params: [],
      },
      {
        name: 'httpMethod',
        tags: ['text'],
        params: [],
      },
      {
        name: 'httpStatusCode',
        tags: ['text'],
        params: [],
      },
      {
        name: 'ip',
        tags: ['text'],
        params: [],
      },
      {
        name: 'ipv4',
        tags: ['text'],
        params: [],
      },
      {
        name: 'ipv6',
        tags: ['text'],
        params: [],
      },
      {
        name: 'mac',
        tags: ['text'],
        params: [],
      },
      {
        name: 'password',
        tags: ['text', 'password'],
        params: [],
      },
      {
        name: 'port',
        tags: ['text'],
        params: [],
      },
      {
        name: 'protocol',
        tags: ['text'],
        params: [],
      },
      {
        name: 'url',
        tags: ['text', 'url'],
        params: [],
      },
      {
        name: 'userAgent',
        tags: ['text'],
        params: [],
      },
      {
        name: 'userName',
        tags: ['text'],
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
        tags: ['text'],
      },
      {
        name: 'cardinalDirection',
        params: [],
        tags: ['text'],
      },
      {
        name: 'city',
        params: [],
        tags: ['text'],
      },
      {
        name: 'cityName',
        params: [],
        tags: ['text'],
      },
      {
        name: 'country',
        params: [],
        tags: ['text'],
      },
      {
        name: 'countryCode',
        params: [],
        tags: ['text'],
      },
      {
        name: 'county',
        params: [],
        tags: ['text'],
      },
      {
        name: 'direction',
        params: [],
        tags: ['text'],
      },
      {
        name: 'latitude',
        params: [],
        tags: ['text'],
      },
      {
        name: 'longitude',
        params: [],
        tags: ['text'],
      },
      {
        name: 'nearbyGPSCoordinate',
        params: [],
        tags: ['text'],
      },
      {
        name: 'ordinalDirection',
        params: [],
        tags: ['text'],
      },
      {
        name: 'secondaryAddress',
        params: [],
        tags: ['text'],
      },
      {
        name: 'state',
        params: [],
        tags: ['text'],
      },
      {
        name: 'stateAbbr',
        params: [],
        tags: ['text'],
      },
      {
        name: 'street',
        params: [],
        tags: ['text'],
      },
      {
        name: 'streetAddress',
        params: [],
        tags: ['text'],
      },
      {
        name: 'streetName',
        params: [],
        tags: ['text'],
      },
      {
        name: 'timeZone',
        params: [],
        tags: ['text'],
      },
      {
        name: 'zipCode',
        params: [],
        tags: ['text'],
      },
      {
        name: 'zipCodeByState',
        params: [],
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'paragraph',
        tags: ['text'],
        params: [],
      },
      {
        name: 'paragraphs',
        tags: ['text'],
        params: [],
      },
      {
        name: 'sentence',
        tags: ['text'],
        params: [],
      },
      {
        name: 'sentences',
        tags: ['text'],
        params: [],
      },
      {
        name: 'slug',
        tags: ['text'],
        params: [],
      },
      {
        name: 'text',
        tags: ['text'],
        params: [],
      },
      {
        name: 'word',
        tags: ['text'],
        params: [],
      },
      {
        name: 'words',
        tags: ['text'],
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
        tags: ['text', 'music'],
        params: [],
      },
      {
        name: 'songName',
        tags: ['text', 'song', 'song title', 'music', 'title'],
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
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'binary',
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'float',
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'hex',
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'int',
        tags: ['text', 'number'],
        params: [],
      },
      {
        name: 'octal',
        tags: ['text', 'number'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'firstName',
        tags: ['text', 'firstName', 'fname', 'first name'],
        params: [],
      },
      {
        name: 'fullName',
        tags: ['text', 'fullName', 'fullname', 'full name'],
        params: [],
      },
      {
        name: 'gender',
        tags: ['text'],
        params: [],
      },
      {
        name: 'jobArea',
        tags: ['text'],
        params: [],
      },
      {
        name: 'jobDescriptor',
        tags: ['text'],
        params: [],
      },
      {
        name: 'jobTitle',
        tags: ['text'],
        params: [],
      },
      {
        name: 'jobType',
        tags: ['text'],
        params: [],
      },
      {
        name: 'lastName',
        tags: ['text', 'lastName', 'lname', 'last name', 'surname'],
        params: [],
      },
      {
        name: 'middleName',
        tags: ['text', 'middleName', 'mname', 'middle name'],
        params: [],
      },
      {
        name: 'prefix',
        tags: ['text', 'mr.', 'mrs.', 'ms.', 'miss', 'dr.', 'engineer', 'professor', 'sir', 'lady', 'lord', 'mr', 'mrs', 'ms', 'dr', 'prof', 'sir', 'lady', 'lord'],
        params: [],
      },
      {
        name: 'sex',
        tags: ['text', 'sx', 'sex'],
        params: [],
      },
      {
        name: 'suffix',
        tags: ['text', 'phd', 'jr', 'sr', 'ii', 'iii', 'iv', 'v', '1st', '2nd', '3rd', '4th', '5th', 'thd', 'md', 'dds'],
        params: [],
      },
      {
        name: 'zodiacSign',
        tags: ['text', 'zodiac', 'sign', 'zodiac sign'],
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
        tags: ['text', 'tel'],
        params: [],
      },
      {
        name: 'number',
        tags: ['text', 'tel'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'alphaNumeric',
        tags: ['text'],
        params: [],
      },
      {
        name: 'numeric',
        tags: ['text'],
        params: [],
      },
      {
        name: 'word',
        tags: ['text'],
        params: [],
      },
      {
        name: 'words',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'unit',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'alphanumeric',
        tags: ['text'],
        params: [],
      },
      {
        name: 'binary',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fromCharacters',
        tags: ['text'],
        params: [],
      },
      {
        name: 'hexadecimal',
        tags: ['text'],
        params: [],
      },
      {
        name: 'nanoid',
        tags: ['text'],
        params: [],
      },
      {
        name: 'numeric',
        tags: ['text'],
        params: [],
      },
      {
        name: 'octal',
        tags: ['text'],
        params: [],
      },
      {
        name: 'sample',
        tags: ['text'],
        params: [],
      },
      {
        name: 'symbol',
        tags: ['text'],
        params: [],
      },
      {
        name: 'uuid',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'commonFileName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'commonFileType',
        tags: ['text'],
        params: [],
      },
      {
        name: 'cron',
        tags: ['text'],
        params: [],
      },
      {
        name: 'directoryPath',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fileExt',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fileName',
        tags: ['text'],
        params: [],
      },
      {
        name: 'filePath',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fileType',
        tags: ['text'],
        params: [],
      },
      {
        name: 'mimeType',
        tags: ['text'],
        params: [],
      },
      {
        name: 'networkInterface',
        tags: ['text'],
        params: [],
      },
      {
        name: 'semver',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'color',
        tags: ['text'],
        params: [],
      },
      {
        name: 'fuel',
        tags: ['text'],
        params: [],
      },
      {
        name: 'manufacturer',
        tags: ['text'],
        params: [],
      },
      {
        name: 'model',
        tags: ['text'],
        params: [],
      },
      {
        name: 'type',
        tags: ['text'],
        params: [],
      },
      {
        name: 'vehicle',
        tags: ['text'],
        params: [],
      },
      {
        name: 'vin',
        tags: ['text'],
        params: [],
      },
      {
        name: 'vrm',
        tags: ['text'],
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
        tags: ['text'],
        params: [],
      },
      {
        name: 'adverb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'conjunction',
        tags: ['text'],
        params: [],
      },
      {
        name: 'interjection',
        tags: ['text'],
        params: [],
      },
      {
        name: 'noun',
        tags: ['text'],
        params: [],
      },
      {
        name: 'preposition',
        tags: ['text'],
        params: [],
      },
      {
        name: 'sample',
        tags: ['text'],
        params: [],
      },
      {
        name: 'verb',
        tags: ['text'],
        params: [],
      },
      {
        name: 'words',
        tags: ['text'],
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
    const regex = [...generateRegexVariants(api), ...generateRegexVariants(name), ...method.generatedTags.flatMap(generateRegexVariants)];
    return {
      apiName,
      emoji,
      name,
      tags: method.generatedTags,
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
