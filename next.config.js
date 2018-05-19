const path = require('path');
const get = require('lodash/get');
const has = require('lodash/has');
const withTypescript = require('@zeit/next-typescript');
const withSourceMaps = require('@zeit/next-source-maps');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const TSConfigPaths = require('tsconfig-paths-webpack-plugin');

const setPathsResolution = (config, tsOptions) => {
  Object.assign(config.resolve, {
    plugins: [
      ...(config.resolve.plugins || []),
      new TSConfigPaths(tsOptions),
    ],
  });
}

const nextTypescript = withTypescript();
const nextSass = withSass({
  ...nextTypescript,
});

// const nextSourceMaps = withSourceMaps(nextCss);
const baseNextConfig = nextSass;

const nextConfig = {
  distDir: '../../dist/client',
  useFileSystemPublicRoutes: false,
  webpack(config, options) {
    const newConfig = baseNextConfig.webpack(config, options)
    setPathsResolution(newConfig);
    return newConfig;
  }
};

module.exports = Object.assign(
  {},
  baseNextConfig,
  nextConfig,
);
