import { faker } from '@faker-js/faker';
import { startCase } from 'lodash';

function generateMethods (api, methods) {
  return methods.map((method) => {
    return {
      generatedMethodName: method.name,
      generatedMethod: faker[api][method.name],
      generatedParams: method.params,
    };
  });
}

const fakerAPIs = [
  {
    emoji: '🛫',
    api: 'airline',
    methods: [
      {
        name: 'aircraftType',
        params: [],
      },
      {
        name: 'airline',
        params: [],
      },
      {
        name: 'airplane',
        params: [],
      },
      {
        name: 'airport',
        params: [],
      },
      {
        name: 'flightNumber',
        params: [],
      },
      {
        name: 'recordLocator',
        params: [],
      },
      {
        name: 'seat',
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
        params: [],
      },
      {
        name: 'bird',
        params: [],
      },
      {
        name: 'cat',
        params: [],
      },
      {
        name: 'cetacean',
        params: [],
      },
      {
        name: 'cow',
        params: [],
      },
      {
        name: 'crocodilia',
        params: [],
      },
      {
        name: 'dog',
        params: [],
      },
      {
        name: 'fish',
        params: [],
      },
      {
        name: 'horse',
        params: [],
      },
      {
        name: 'insect',
        params: [],
      },
      {
        name: 'lion',
        params: [],
      },
      {
        name: 'rabbit',
        params: [],
      },
      {
        name: 'rodent',
        params: [],
      },
      {
        name: 'snake',
        params: [],
      },
      {
        name: 'type',
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
        params: [],
      },
      {
        name: 'colorByCSSColorSpace',
        params: [],
      },
      {
        name: 'cssSupportedFunction',
        params: [],
      },
      {
        name: 'cssSupportedSpace',
        params: [],
      },
      {
        name: 'hsl',
        params: [],
      },
      {
        name: 'human',
        params: [],
      },
      {
        name: 'hwb',
        params: [],
      },
      {
        name: 'lab',
        params: [],
      },
      {
        name: 'lch',
        params: [],
      },
      {
        name: 'rgb',
        params: [],
      },
      {
        name: 'space',
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
        params: [],
      },
      {
        name: 'price',
        params: [],
      },
      {
        name: 'product',
        params: [],
      },
      {
        name: 'productAdjective',
        params: [],
      },
      {
        name: 'productDescription',
        params: [],
      },
      {
        name: 'productMaterial',
        params: [],
      },
      {
        name: 'productName',
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
        params: [],
      },
      {
        name: 'bsAdjective',
        params: [],
      },
      {
        name: 'bsBuzz',
        params: [],
      },
      {
        name: 'bsNoun',
        params: [],
      },
      {
        name: 'buzzAdjective',
        params: [],
      },
      {
        name: 'buzzNoun',
        params: [],
      },
      {
        name: 'buzzPhrase',
        params: [],
      },
      {
        name: 'buzzVerb',
        params: [],
      },
      {
        name: 'catchPhrase',
        params: [],
      },
      {
        name: 'catchPhraseAdjective',
        params: [],
      },
      {
        name: 'catchPhraseDescriptor',
        params: [],
      },
      {
        name: 'catchPhraseNoun',
        params: [],
      },
      {
        name: 'companySuffix',
        params: [],
      },
      {
        name: 'name',
        params: [],
      },
      {
        name: 'suffixes',
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
        params: [],
      },
      {
        name: 'column',
        params: [],
      },
      {
        name: 'engine',
        params: [],
      },
      {
        name: 'mongodbObjectId',
        params: [],
      },
      {
        name: 'type',
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
        params: [],
      },
      {
        name: 'bigint',
        params: [],
      },
      {
        name: 'boolean',
        params: [],
      },
      {
        name: 'datetime',
        params: [],
      },
      {
        name: 'float',
        params: [],
      },
      {
        name: 'hexadecimal',
        params: [],
      },
      {
        name: 'json',
        params: [],
      },
      {
        name: 'number',
        params: [],
      },
      {
        name: 'string',
        params: [],
      },
      {
        name: 'uuid',
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
        params: [],
      },
      {
        name: 'between',
        params: [],
      },
      {
        name: 'betweens',
        params: [],
      },
      {
        name: 'birthdate',
        params: [],
      },
      {
        name: 'future',
        params: [],
      },
      {
        name: 'month',
        params: [],
      },
      {
        name: 'past',
        params: [],
      },
      {
        name: 'recent',
        params: [],
      },
      {
        name: 'soon',
        params: [],
      },
      {
        name: 'weekday',
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
        params: [],
      },
      {
        name: 'accountName',
        params: [],
      },
      {
        name: 'accountNumber',
        params: [],
      },
      {
        name: 'amount',
        params: [],
      },
      {
        name: 'bic',
        params: [],
      },
      {
        name: 'bitcoinAddress',
        params: [],
      },
      {
        name: 'creditCardCVV',
        params: [],
      },
      {
        name: 'creditCardIssuer',
        params: [],
      },
      {
        name: 'creditCardNumber',
        params: [],
      },
      {
        name: 'currency',
        params: [],
      },
      {
        name: 'currencyCode',
        params: [],
      },
      {
        name: 'currencyName',
        params: [],
      },
      {
        name: 'currencySymbol',
        params: [],
      },
      {
        name: 'ethereumAddress',
        params: [],
      },
      {
        name: 'iban',
        params: [],
      },
      {
        name: 'mask',
        params: [],
      },
      {
        name: 'maskNumber',
        params: [],
      },
      {
        name: 'pin',
        params: [],
      },
      {
        name: 'routingNumber',
        params: [],
      },
      {
        name: 'transactionDescription',
        params: [],
      },
      {
        name: 'transactionType',
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
        params: [],
      },
      {
        name: 'commitDate',
        params: [],
      },
      {
        name: 'commitEntry',
        params: [],
      },
      {
        name: 'commitMessage',
        params: [],
      },
      {
        name: 'commitSha',
        params: [],
      },
      {
        name: 'shortSha',
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
        params: [],
      },
      {
        name: 'adjective',
        params: [],
      },
      {
        name: 'ingverb',
        params: [],
      },
      {
        name: 'noun',
        params: [],
      },
      {
        name: 'phrase',
        params: [],
      },
      {
        name: 'verb',
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
        params: [],
      },
      {
        name: 'avatar',
        params: [],
      },
      {
        name: 'avatarGitHub',
        params: [],
      },
      {
        name: 'avatarLegacy',
        params: [],
      },
      {
        name: 'business',
        params: [],
      },
      {
        name: 'cats',
        params: [],
      },
      {
        name: 'city',
        params: [],
      },
      {
        name: 'dataUri',
        params: [],
      },
      {
        name: 'fashion',
        params: [],
      },
      {
        name: 'food',
        params: [],
      },
      {
        name: 'image',
        params: [],
      },
      {
        name: 'imageUrl',
        params: [],
      },
      {
        name: 'nature',
        params: [],
      },
      {
        name: 'nightlife',
        params: [],
      },
      {
        name: 'people',
        params: [],
      },
      {
        name: 'sports',
        params: [],
      },
      {
        name: 'technics',
        params: [],
      },
      {
        name: 'transport',
        params: [],
      },
      {
        name: 'url',
        params: [],
      },
      {
        name: 'urlLoremFlickr',
        params: [],
      },
      {
        name: 'urlPicsumPhotos',
        params: [],
      },
      {
        name: 'urlPlaceholder',
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
        params: [],
      },
      {
        name: 'color',
        params: [],
      },
      {
        name: 'displayName',
        params: [],
      },
      {
        name: 'domainName',
        params: [],
      },
      {
        name: 'domainSuffix',
        params: [],
      },
      {
        name: 'domainWord',
        params: [],
      },
      {
        name: 'email',
        params: [],
      },
      {
        name: 'emoji',
        params: [],
      },
      {
        name: 'exampleEmail',
        params: [],
      },
      {
        name: 'httpMethod',
        params: [],
      },
      {
        name: 'httpStatusCode',
        params: [],
      },
      {
        name: 'ip',
        params: [],
      },
      {
        name: 'ipv4',
        params: [],
      },
      {
        name: 'ipv6',
        params: [],
      },
      {
        name: 'mac',
        params: [],
      },
      {
        name: 'password',
        params: [],
      },
      {
        name: 'port',
        params: [],
      },
      {
        name: 'protocol',
        params: [],
      },
      {
        name: 'url',
        params: [],
      },
      {
        name: 'userAgent',
        params: [],
      },
      {
        name: 'userName',
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
      },
      {
        name: 'cardinalDirection',
        params: [],
      },
      {
        name: 'city',
        params: [],
      },
      {
        name: 'cityName',
        params: [],
      },
      {
        name: 'country',
        params: [],
      },
      {
        name: 'countryCode',
        params: [],
      },
      {
        name: 'county',
        params: [],
      },
      {
        name: 'direction',
        params: [],
      },
      {
        name: 'latitude',
        params: [],
      },
      {
        name: 'longitude',
        params: [],
      },
      {
        name: 'nearbyGPSCoordinate',
        params: [],
      },
      {
        name: 'ordinalDirection',
        params: [],
      },
      {
        name: 'secondaryAddress',
        params: [],
      },
      {
        name: 'state',
        params: [],
      },
      {
        name: 'stateAbbr',
        params: [],
      },
      {
        name: 'street',
        params: [],
      },
      {
        name: 'streetAddress',
        params: [],
      },
      {
        name: 'streetName',
        params: [],
      },
      {
        name: 'timeZone',
        params: [],
      },
      {
        name: 'zipCode',
        params: [],
      },
      {
        name: 'zipCodeByState',
        params: [],
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
        params: [],
      },
      {
        name: 'paragraph',
        params: [],
      },
      {
        name: 'paragraphs',
        params: [],
      },
      {
        name: 'sentence',
        params: [],
      },
      {
        name: 'sentences',
        params: [],
      },
      {
        name: 'slug',
        params: [],
      },
      {
        name: 'text',
        params: [],
      },
      {
        name: 'word',
        params: [],
      },
      {
        name: 'words',
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
        params: [],
      },
      {
        name: 'songName',
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
        params: [],
      },
      {
        name: 'binary',
        params: [],
      },
      {
        name: 'float',
        params: [],
      },
      {
        name: 'hex',
        params: [],
      },
      {
        name: 'int',
        params: [],
      },
      {
        name: 'octal',
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
        params: [],
      },
      {
        name: 'firstName',
        params: [],
      },
      {
        name: 'fullName',
        params: [],
      },
      {
        name: 'gender',
        params: [],
      },
      {
        name: 'jobArea',
        params: [],
      },
      {
        name: 'jobDescriptor',
        params: [],
      },
      {
        name: 'jobTitle',
        params: [],
      },
      {
        name: 'jobType',
        params: [],
      },
      {
        name: 'lastName',
        params: [],
      },
      {
        name: 'middleName',
        params: [],
      },
      {
        name: 'prefix',
        params: [],
      },
      {
        name: 'sex',
        params: [],
      },
      {
        name: 'suffix',
        params: [],
      },
      {
        name: 'zodiacSign',
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
        params: [],
      },
      {
        name: 'number',
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
        params: [],
      },
      {
        name: 'alphaNumeric',
        params: [],
      },
      {
        name: 'numeric',
        params: [],
      },
      {
        name: 'word',
        params: [],
      },
      {
        name: 'words',
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
        params: [],
      },
      {
        name: 'unit',
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
        params: [],
      },
      {
        name: 'alphanumeric',
        params: [],
      },
      {
        name: 'binary',
        params: [],
      },
      {
        name: 'fromCharacters',
        params: [],
      },
      {
        name: 'hexadecimal',
        params: [],
      },
      {
        name: 'nanoid',
        params: [],
      },
      {
        name: 'numeric',
        params: [],
      },
      {
        name: 'octal',
        params: [],
      },
      {
        name: 'sample',
        params: [],
      },
      {
        name: 'symbol',
        params: [],
      },
      {
        name: 'uuid',
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
        params: [],
      },
      {
        name: 'commonFileName',
        params: [],
      },
      {
        name: 'commonFileType',
        params: [],
      },
      {
        name: 'cron',
        params: [],
      },
      {
        name: 'directoryPath',
        params: [],
      },
      {
        name: 'fileExt',
        params: [],
      },
      {
        name: 'fileName',
        params: [],
      },
      {
        name: 'filePath',
        params: [],
      },
      {
        name: 'fileType',
        params: [],
      },
      {
        name: 'mimeType',
        params: [],
      },
      {
        name: 'networkInterface',
        params: [],
      },
      {
        name: 'semver',
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
        params: [],
      },
      {
        name: 'color',
        params: [],
      },
      {
        name: 'fuel',
        params: [],
      },
      {
        name: 'manufacturer',
        params: [],
      },
      {
        name: 'model',
        params: [],
      },
      {
        name: 'type',
        params: [],
      },
      {
        name: 'vehicle',
        params: [],
      },
      {
        name: 'vin',
        params: [],
      },
      {
        name: 'vrm',
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
        params: [],
      },
      {
        name: 'adverb',
        params: [],
      },
      {
        name: 'conjunction',
        params: [],
      },
      {
        name: 'interjection',
        params: [],
      },
      {
        name: 'noun',
        params: [],
      },
      {
        name: 'preposition',
        params: [],
      },
      {
        name: 'sample',
        params: [],
      },
      {
        name: 'verb',
        params: [],
      },
      {
        name: 'words',
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
    return {
      apiName,
      emoji,
      name,
      params: generatedParams,
      searchNeedle,
      fakerFn: async ({ options } = {}) => {
        const result = generatedMethod(options);
        if (!isNaN(Number(result))) return Number(result);
        return result;
      },
    };
  });
});
