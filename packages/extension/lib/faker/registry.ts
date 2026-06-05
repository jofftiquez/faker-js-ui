import { faker } from '@faker-js/faker/locale/en';
import type { FakerApiDef, FakerMethod, MethodParam } from './types';

// Dynamic, string-keyed view of faker for the registry's by-name invocation.
const fakerAny = faker as unknown as Record<
  string,
  Record<string, (opts?: unknown) => unknown>
>;

/** Compact startCase (camelCase / acronyms / numbers) — replaces lodash. */
export function startCase (input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Case/separator variants → anchored regexes (ported from v1). */
export function generateRegexVariants (input: string): RegExp[] {
  const variants = [
    input.toLowerCase(),
    input.toUpperCase(),
    input.replace(/\b\w/g, (m) => m.toUpperCase()),
    input.replace(/\s+(.)(\w+)/g, (_m, p1: string, p2: string) => p1.toUpperCase() + p2.toLowerCase()),
    input.replace(/\s/g, '-'),
    input.replace(/\s/g, '_'),
    input.replace(/\s/g, ''),
    input.split(' ').map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join(''),
    input.split(' ').map((w) => w.toLowerCase()).join('_'),
    input.split(' ').map((w) => w.toLowerCase()).join('-'),
  ];
  return variants.map((v) => new RegExp(`^${v}$`));
}

// --- shared param presets ------------------------------------------------
const dateRange: MethodParam[] = [
  { name: 'from', label: 'From Date', type: 'date', default: '2020-01-01', hint: 'Start date (YYYY-MM-DD)' },
  { name: 'to', label: 'To Date', type: 'date', default: '2030-12-31', hint: 'End date (YYYY-MM-DD)' },
];
const casing: MethodParam = {
  name: 'casing',
  label: 'Casing',
  type: 'select',
  default: 'mixed',
  options: [
    { label: 'Mixed', value: 'mixed' },
    { label: 'Upper', value: 'upper' },
    { label: 'Lower', value: 'lower' },
  ],
  hint: 'Letter casing style',
};

// --- the registry (faker@10) ---------------------------------------------
// Removed vs v1 (see scripts/audit-faker.mjs): the `random` module, most of
// `datatype` (only `boolean` survives), legacy `image.*`, `company.bs*`/
// `suffixes`/`companySuffix`, `finance.account`/`mask`/`maskNumber`,
// `git.shortSha`, `internet.avatar`/`color`, `location.cityName`/`stateAbbr`/
// `streetName`/`zipCodeByState`, `image.urlPlaceholder`/`urlLoremFlickr`(deprecated),
// `string.fromCharacters`. `internet.userName` → `username`.
export const fakerApis: FakerApiDef[] = [
  {
    emoji: '🛫',
    api: 'airline',
    methods: [
      { name: 'aircraftType', tags: ['text'] },
      { name: 'airline', tags: ['text'] },
      { name: 'airplane', tags: ['text'] },
      { name: 'airport', tags: ['text'] },
      { name: 'flightNumber', tags: ['text', 'number'] },
      { name: 'recordLocator', tags: ['text'] },
      { name: 'seat', tags: ['text'] },
    ],
  },
  {
    emoji: '🦆',
    api: 'animal',
    methods: [
      { name: 'bear', tags: ['text'] },
      { name: 'bird', tags: ['text'] },
      { name: 'cat', tags: ['text'] },
      { name: 'cetacean', tags: ['text'] },
      { name: 'cow', tags: ['text'] },
      { name: 'crocodilia', tags: ['text'] },
      { name: 'dog', tags: ['text'] },
      { name: 'fish', tags: ['text'] },
      { name: 'horse', tags: ['text'] },
      { name: 'insect', tags: ['text'] },
      { name: 'lion', tags: ['text'] },
      { name: 'rabbit', tags: ['text'] },
      { name: 'rodent', tags: ['text'] },
      { name: 'snake', tags: ['text'] },
      { name: 'type', tags: ['text'] },
    ],
  },
  {
    emoji: '🎨',
    api: 'color',
    methods: [
      { name: 'cmyk', tags: ['text'] },
      { name: 'colorByCSSColorSpace', tags: ['text'] },
      { name: 'cssSupportedFunction', tags: ['text'] },
      { name: 'cssSupportedSpace', tags: ['text'] },
      { name: 'hsl', tags: ['text'] },
      { name: 'human', tags: ['text', 'color', 'colour'] },
      { name: 'hwb', tags: ['text'] },
      { name: 'lab', tags: ['text'] },
      { name: 'lch', tags: ['text'] },
      { name: 'rgb', tags: ['text'] },
      { name: 'space', tags: ['text'] },
    ],
  },
  {
    emoji: '🏪',
    api: 'commerce',
    methods: [
      { name: 'department', tags: ['text'] },
      { name: 'price', tags: ['text', 'price', 'amount', 'cost'] },
      { name: 'product', tags: ['text'] },
      { name: 'productAdjective', tags: ['text'] },
      { name: 'productDescription', tags: ['text'] },
      { name: 'productMaterial', tags: ['text'] },
      { name: 'productName', tags: ['text'] },
    ],
  },
  {
    emoji: '🏢',
    api: 'company',
    methods: [
      { name: 'buzzAdjective', tags: ['text'] },
      { name: 'buzzNoun', tags: ['text'] },
      { name: 'buzzPhrase', tags: ['text'] },
      { name: 'buzzVerb', tags: ['text'] },
      { name: 'catchPhrase', tags: ['text'] },
      { name: 'catchPhraseAdjective', tags: ['text'] },
      { name: 'catchPhraseDescriptor', tags: ['text'] },
      { name: 'catchPhraseNoun', tags: ['text'] },
      { name: 'name', tags: ['text', 'company', 'organization', 'employer'] },
    ],
  },
  {
    emoji: '💽',
    api: 'database',
    methods: [
      { name: 'collation', tags: ['text'] },
      { name: 'column', tags: ['text'] },
      { name: 'engine', tags: ['text'] },
      { name: 'mongodbObjectId', tags: ['text'] },
      { name: 'type', tags: ['text'] },
    ],
  },
  {
    emoji: '💾',
    api: 'datatype',
    methods: [
      { name: 'boolean', tags: ['text', 'boolean'] },
    ],
  },
  {
    emoji: '📆',
    api: 'date',
    methods: [
      { name: 'anytime', tags: ['text', 'time', 'date'] },
      { name: 'between', tags: ['text', 'date'], params: dateRange },
      { name: 'betweens', tags: ['text', 'date'], params: [...dateRange, { name: 'count', label: 'Count', type: 'number', default: 3, hint: 'Number of dates' }] },
      { name: 'birthdate', tags: ['text', 'date', 'birthday', 'dob'] },
      { name: 'future', tags: ['text', 'date'] },
      { name: 'month', tags: ['text', 'date', 'month'] },
      { name: 'past', tags: ['text', 'date'] },
      { name: 'recent', tags: ['text', 'date'] },
      { name: 'soon', tags: ['text', 'date'] },
      { name: 'weekday', tags: ['text', 'date'] },
    ],
  },
  {
    emoji: '🏦',
    api: 'finance',
    methods: [
      { name: 'accountName', tags: ['text'] },
      { name: 'accountNumber', tags: ['text'] },
      { name: 'amount', tags: ['text', 'amount'] },
      { name: 'bic', tags: ['text'] },
      { name: 'bitcoinAddress', tags: ['text'] },
      { name: 'creditCardCVV', tags: ['text', 'cvv', 'cvc'] },
      { name: 'creditCardIssuer', tags: ['text'] },
      { name: 'creditCardNumber', tags: ['text', 'credit card', 'card number'] },
      { name: 'currency', tags: ['text'] },
      { name: 'currencyCode', tags: ['text'] },
      { name: 'currencyName', tags: ['text'] },
      { name: 'currencySymbol', tags: ['text'] },
      { name: 'ethereumAddress', tags: ['text'] },
      { name: 'iban', tags: ['text'] },
      { name: 'pin', tags: ['text'] },
      { name: 'routingNumber', tags: ['text'] },
      { name: 'transactionDescription', tags: ['text'] },
      { name: 'transactionType', tags: ['text'] },
    ],
  },
  {
    emoji: '🐙',
    api: 'git',
    methods: [
      { name: 'branch', tags: ['text'] },
      { name: 'commitDate', tags: ['text'] },
      { name: 'commitEntry', tags: ['text'] },
      { name: 'commitMessage', tags: ['text'] },
      { name: 'commitSha', tags: ['text'] },
    ],
  },
  {
    emoji: '👨‍💻',
    api: 'hacker',
    methods: [
      { name: 'abbreviation', tags: ['text'] },
      { name: 'adjective', tags: ['text'] },
      { name: 'ingverb', tags: ['text'] },
      { name: 'noun', tags: ['text'] },
      { name: 'phrase', tags: ['text'] },
      { name: 'verb', tags: ['text'] },
    ],
  },
  {
    emoji: '🌇',
    api: 'image',
    methods: [
      { name: 'avatar', tags: ['text', 'avatar', 'photo'] },
      { name: 'avatarGitHub', tags: ['text'] },
      { name: 'dataUri', tags: ['text'] },
      { name: 'url', tags: ['text', 'image', 'url'] },
      { name: 'urlPicsumPhotos', tags: ['text'] },
    ],
  },
  {
    emoji: '🌐',
    api: 'internet',
    methods: [
      { name: 'displayName', tags: ['text'] },
      { name: 'domainName', tags: ['text'] },
      { name: 'domainSuffix', tags: ['text'] },
      { name: 'domainWord', tags: ['text'] },
      { name: 'email', tags: ['text', 'email'] },
      { name: 'emoji', tags: ['text'] },
      { name: 'exampleEmail', tags: ['text', 'email'] },
      { name: 'httpMethod', tags: ['text'] },
      { name: 'httpStatusCode', tags: ['text'] },
      { name: 'ip', tags: ['text'] },
      { name: 'ipv4', tags: ['text'] },
      { name: 'ipv6', tags: ['text'] },
      { name: 'mac', tags: ['text'] },
      {
        name: 'password',
        tags: ['text', 'password'],
        params: [
          { name: 'length', label: 'Length', type: 'number', default: 15, hint: 'Length of the password' },
          { name: 'memorable', label: 'Memorable', type: 'boolean', default: false, hint: 'Generate a memorable password' },
          { name: 'prefix', label: 'Prefix', type: 'text', default: '', hint: 'Prefix for the password' },
        ],
      },
      { name: 'port', tags: ['text'] },
      { name: 'protocol', tags: ['text'] },
      { name: 'url', tags: ['text', 'url', 'website', 'site'] },
      { name: 'userAgent', tags: ['text'] },
      { name: 'username', tags: ['text', 'username', 'login', 'handle'] },
    ],
  },
  {
    emoji: '📍',
    api: 'location',
    methods: [
      { name: 'buildingNumber', tags: ['text'] },
      { name: 'cardinalDirection', tags: ['text'] },
      { name: 'city', tags: ['text', 'city', 'town'] },
      { name: 'country', tags: ['text', 'country'] },
      { name: 'countryCode', tags: ['text'] },
      { name: 'county', tags: ['text'] },
      { name: 'direction', tags: ['text'] },
      { name: 'latitude', tags: ['text'] },
      { name: 'longitude', tags: ['text'] },
      { name: 'nearbyGPSCoordinate', tags: ['text'] },
      { name: 'ordinalDirection', tags: ['text'] },
      { name: 'secondaryAddress', tags: ['text', 'apt', 'suite', 'unit'] },
      { name: 'state', tags: ['text', 'state', 'province', 'region'] },
      { name: 'street', tags: ['text'] },
      { name: 'streetAddress', tags: ['text', 'street', 'address'] },
      { name: 'timeZone', tags: ['text'] },
      { name: 'zipCode', tags: ['text', 'zip', 'postal', 'postcode'] },
    ],
  },
  {
    emoji: '📝',
    api: 'lorem',
    methods: [
      { name: 'lines', tags: ['text'] },
      { name: 'paragraph', tags: ['text', 'message', 'comment', 'note'] },
      { name: 'paragraphs', tags: ['text'], params: [
        { name: 'min', label: 'Minimum Count', type: 'number', default: 3, hint: 'Minimum number of paragraphs' },
        { name: 'max', label: 'Maximum Count', type: 'number', default: 3, hint: 'Maximum number of paragraphs' },
      ] },
      { name: 'sentence', tags: ['text', 'title', 'subject', 'headline'] },
      { name: 'sentences', tags: ['text'], params: [
        { name: 'min', label: 'Minimum Count', type: 'number', default: 2, hint: 'Minimum number of sentences' },
        { name: 'max', label: 'Maximum Count', type: 'number', default: 6, hint: 'Maximum number of sentences' },
      ] },
      { name: 'slug', tags: ['text'] },
      { name: 'text', tags: ['text'] },
      { name: 'word', tags: ['text'] },
      { name: 'words', tags: ['text'], params: [
        { name: 'min', label: 'Minimum Count', type: 'number', default: 1, hint: 'Minimum number of words' },
        { name: 'max', label: 'Maximum Count', type: 'number', default: 3, hint: 'Maximum number of words' },
      ] },
    ],
  },
  {
    emoji: '🎶',
    api: 'music',
    methods: [
      { name: 'genre', tags: ['text', 'music'] },
      { name: 'songName', tags: ['text', 'song', 'song title', 'music', 'title'] },
    ],
  },
  {
    emoji: '🔢',
    api: 'number',
    methods: [
      { name: 'bigInt', tags: ['text', 'number'] },
      { name: 'binary', tags: ['text', 'number'] },
      { name: 'float', tags: ['text', 'number'], params: [
        { name: 'min', label: 'Minimum', type: 'number', default: 0, hint: 'Lower bound (inclusive)' },
        { name: 'max', label: 'Maximum', type: 'number', default: 1, hint: 'Upper bound (exclusive)' },
        { name: 'fractionDigits', label: 'Decimal Places', type: 'number', default: 2, hint: 'Number of decimal places' },
      ] },
      { name: 'hex', tags: ['text', 'number'] },
      { name: 'int', tags: ['text', 'number', 'age'], params: [
        { name: 'min', label: 'Minimum', type: 'number', default: 0, hint: 'Lower bound (inclusive)' },
        { name: 'max', label: 'Maximum', type: 'number', default: 100, hint: 'Upper bound (inclusive)' },
      ] },
      { name: 'octal', tags: ['text', 'number'] },
    ],
  },
  {
    emoji: '🧑',
    api: 'person',
    methods: [
      { name: 'bio', tags: ['text', 'bio', 'about', 'description'] },
      { name: 'firstName', tags: ['text', 'firstName', 'fname', 'first name', 'given name'] },
      { name: 'fullName', tags: ['text', 'fullName', 'fullname', 'full name', 'name'] },
      { name: 'gender', tags: ['text', 'gender'] },
      { name: 'jobArea', tags: ['text'] },
      { name: 'jobDescriptor', tags: ['text'] },
      { name: 'jobTitle', tags: ['text', 'job title', 'position', 'occupation'] },
      { name: 'jobType', tags: ['text'] },
      { name: 'lastName', tags: ['text', 'lastName', 'lname', 'last name', 'surname'] },
      { name: 'middleName', tags: ['text', 'middleName', 'mname', 'middle name'] },
      { name: 'prefix', tags: ['text', 'mr', 'mrs', 'ms', 'dr', 'prof'] },
      { name: 'sex', tags: ['text', 'sex'] },
      { name: 'suffix', tags: ['text', 'phd', 'jr', 'sr', 'md'] },
      { name: 'zodiacSign', tags: ['text', 'zodiac', 'sign', 'zodiac sign'] },
    ],
  },
  {
    emoji: '☎️',
    api: 'phone',
    methods: [
      { name: 'imei', tags: ['text', 'tel'] },
      { name: 'number', tags: ['text', 'tel', 'phone', 'mobile', 'cell'] },
    ],
  },
  {
    emoji: '⚛️',
    api: 'science',
    methods: [
      { name: 'chemicalElement', tags: ['text'] },
      { name: 'unit', tags: ['text'] },
    ],
  },
  {
    emoji: '🧶',
    api: 'string',
    methods: [
      { name: 'alpha', tags: ['text'], params: [
        { name: 'length', label: 'Length', type: 'number', default: 10, hint: 'Length of the string' },
        casing,
      ] },
      { name: 'alphanumeric', tags: ['text'], params: [
        { name: 'length', label: 'Length', type: 'number', default: 10, hint: 'Length of the string' },
        casing,
      ] },
      { name: 'binary', tags: ['text'] },
      { name: 'hexadecimal', tags: ['text'] },
      { name: 'nanoid', tags: ['text'] },
      { name: 'numeric', tags: ['text'] },
      { name: 'octal', tags: ['text'] },
      { name: 'sample', tags: ['text'] },
      { name: 'symbol', tags: ['text'] },
      { name: 'uuid', tags: ['text', 'uuid', 'guid'] },
    ],
  },
  {
    emoji: '🖥️',
    api: 'system',
    methods: [
      { name: 'commonFileExt', tags: ['text'] },
      { name: 'commonFileName', tags: ['text'] },
      { name: 'commonFileType', tags: ['text'] },
      { name: 'cron', tags: ['text'] },
      { name: 'directoryPath', tags: ['text'] },
      { name: 'fileExt', tags: ['text'] },
      { name: 'fileName', tags: ['text'] },
      { name: 'filePath', tags: ['text'] },
      { name: 'fileType', tags: ['text'] },
      { name: 'mimeType', tags: ['text'] },
      { name: 'networkInterface', tags: ['text'] },
      { name: 'semver', tags: ['text'] },
    ],
  },
  {
    emoji: '🛞',
    api: 'vehicle',
    methods: [
      { name: 'bicycle', tags: ['text'] },
      { name: 'color', tags: ['text'] },
      { name: 'fuel', tags: ['text'] },
      { name: 'manufacturer', tags: ['text'] },
      { name: 'model', tags: ['text'] },
      { name: 'type', tags: ['text'] },
      { name: 'vehicle', tags: ['text'] },
      { name: 'vin', tags: ['text'] },
      { name: 'vrm', tags: ['text'] },
    ],
  },
  {
    emoji: '💬',
    api: 'word',
    methods: [
      { name: 'adjective', tags: ['text'] },
      { name: 'adverb', tags: ['text'] },
      { name: 'conjunction', tags: ['text'] },
      { name: 'interjection', tags: ['text'] },
      { name: 'noun', tags: ['text'] },
      { name: 'preposition', tags: ['text'] },
      { name: 'sample', tags: ['text'] },
      { name: 'verb', tags: ['text'] },
      { name: 'words', tags: ['text'] },
    ],
  },
];

/** Flatten the registry into UI-ready, invocable methods. */
export const fakerMethods: FakerMethod[] = fakerApis.flatMap((apiDef) => {
  const { api, emoji } = apiDef;
  const apiTitle = startCase(api);
  const apiName = `${emoji} ${apiTitle}`;
  return apiDef.methods.map((def) => {
    const name = startCase(def.name);
    const tags = def.tags ?? ['text'];
    const params = def.params ?? [];
    const searchNeedle = `${apiTitle} - ${name}`;
    const regex = [
      ...generateRegexVariants(api),
      ...generateRegexVariants(name),
      ...tags.flatMap(generateRegexVariants),
    ];
    return {
      api,
      emoji,
      apiName,
      name,
      methodName: def.name,
      tags,
      params,
      searchNeedle,
      regex,
      fakerFn: async ({ options }: { options?: unknown } = {}) => {
        const result = fakerAny[api]![def.name]!(options);
        // Coerce numeric-string results to numbers (v1 behaviour) but leave
        // Dates/booleans/objects intact (fixes v1's date→timestamp coercion).
        if (typeof result === 'string' && result.trim() !== '' && !Number.isNaN(Number(result))) {
          return Number(result);
        }
        return result;
      },
    };
  });
});

/** Methods grouped by display api name (for the grouped browser). */
export function groupByApi (methods: FakerMethod[]): Record<string, FakerMethod[]> {
  return methods.reduce<Record<string, FakerMethod[]>>((acc, m) => {
    (acc[m.apiName] ??= []).push(m);
    return acc;
  }, {});
}
