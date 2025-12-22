// Node.js Library Strict ESLint configuration fixture
import { promises as fsPromises } from 'fs';
import { resolve } from 'path';

export type PackageInfo = {
  readonly name: string;
  readonly version: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
};

export type ValidationResult = {
  readonly isValid: boolean;
  readonly errors: readonly string[];
};

export async function readPackageInfoAsync(
  packagePath: string = '.'
): Promise<PackageInfo> {
  const packageJsonPath = resolve(packagePath, 'package.json');
  const packageJson = await fsPromises.readFile(packageJsonPath, 'utf-8');
  const packageData = JSON.parse(packageJson) as unknown;

  if (typeof packageData !== 'object' || packageData === null) {
    throw new Error('Invalid package.json: root must be an object');
  }

  const { name, version, description, keywords } = packageData as Record<
    string,
    unknown
  >;

  if (typeof name !== 'string') {
    throw new Error('Invalid package.json: name must be a string');
  }

  if (typeof version !== 'string') {
    throw new Error('Invalid package.json: version must be a string');
  }

  return {
    name,
    version,
    description: typeof description === 'string' ? description : undefined,
    keywords: Array.isArray(keywords)
      ? keywords.filter((k): k is string => typeof k === 'string')
      : undefined,
  } as const;
}

export function validatePackageInfo(info: PackageInfo): ValidationResult {
  const errors: string[] = [];

  if (!info.name.trim()) {
    errors.push('Package name cannot be empty');
  }

  if (!info.version.trim()) {
    errors.push('Package version cannot be empty');
  }

  // Semantic versioning check (basic)
  if (!/^\d+\.\d+\.\d+/.test(info.version)) {
    errors.push('Package version must follow semantic versioning (x.y.z)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  } as const;
}
