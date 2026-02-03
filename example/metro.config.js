const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const root = path.resolve(__dirname, '..');
const rootNodeModules = path.resolve(root, 'node_modules');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Configure for monorepo: watch root directory and resolve modules from root node_modules
config.watchFolders = [root];
config.resolver.nodeModulesPaths = [rootNodeModules];
// Point to the library source in the monorepo root
config.resolver.extraNodeModules = {
  '@fortawesome/react-native-fontawesome': root,
};

module.exports = config;
