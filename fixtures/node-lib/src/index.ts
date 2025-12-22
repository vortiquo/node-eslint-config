// Node.js Library ESLint configuration fixture
import { readFileSync } from 'fs';
import { join } from 'path';

export type PackageInfo = {
  readonly name: string;
  readonly version: string;
  readonly description?: string;
};

export function readPackageInfo(packagePath: string = '.'): PackageInfo {
  try {
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = readFileSync(packageJsonPath, 'utf-8');
    const packageData = JSON.parse(packageJson);

    return {
      name: packageData.name,
      version: packageData.version,
      description: packageData.description,
    };
  } catch (error) {
    throw new Error(`Failed to read package.json: ${error}`);
  }
}

export function validatePackageInfo(info: PackageInfo): boolean {
  return Boolean(info.name && info.version);
}
