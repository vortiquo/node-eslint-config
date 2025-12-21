// Node.js Library JavaScript Strict ESLint configuration fixture
const fs = require('fs');
const path = require('path');

/**
 * Reads package information from package.json
 * @param {string} packagePath - Path to the package directory
 * @returns {Object} Package information
 */
function readPackageInfo(packagePath = '.') {
  try {
    const packageJsonPath = path.join(packagePath, 'package.json');
    const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageData = JSON.parse(packageJson);

    return {
      name: packageData.name,
      version: packageData.version,
      description: packageData.description,
    };
  } catch (error) {
    throw new Error(`Failed to read package.json: ${error.message}`);
  }
}

/**
 * Validates package information
 * @param {Object} info - Package information
 * @returns {boolean} Whether the package info is valid
 */
function validatePackageInfo(info) {
  return Boolean(info.name && info.version);
}

module.exports = {
  readPackageInfo,
  validatePackageInfo,
};
