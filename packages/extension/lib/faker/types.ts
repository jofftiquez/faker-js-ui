// Typed Faker.js registry — v2 port of v1's src/constants/faker.js, migrated to
// the faker@10 API (see scripts/audit-faker.mjs for the audit that drove the
// remap). Every method here is proven to exist in faker@10 by tests/unit.

export type ParamType = 'number' | 'text' | 'select' | 'boolean' | 'date';

export interface SelectOption {
  label: string;
  value: string;
}

export interface MethodParam {
  name: string;
  label: string;
  type: ParamType;
  default: string | number | boolean;
  hint?: string;
  options?: SelectOption[];
}

/** Raw definition authored in the registry. */
export interface FakerMethodDef {
  name: string;
  tags: string[];
  params?: MethodParam[];
}

export interface FakerApiDef {
  emoji: string;
  api: string;
  methods: FakerMethodDef[];
}

/** Flattened, UI-ready method. */
export interface FakerMethod {
  api: string;
  emoji: string;
  apiName: string;
  name: string;
  methodName: string;
  tags: string[];
  params: MethodParam[];
  searchNeedle: string;
  regex: RegExp[];
  fakerFn: (args?: { options?: unknown }) => Promise<unknown>;
}
