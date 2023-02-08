/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path')
const { getDefaultConfig } = require('metro-config')
const { getMetroAndroidAssetsResolutionFix, getMetroTools } = require('react-native-monorepo-tools')

const monorepoMetroTools = getMetroTools()

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix({
  depth: 3,
})

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()
  return {
    transformer: {
      // babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      publicPath: androidAssetsResolutionFix.publicPath,
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      blockList: monorepoMetroTools.blockList,
      extraNodeModules: monorepoMetroTools.extraNodeModules,
    },
    projectRoot: path.resolve(__dirname),
    watchFolders: monorepoMetroTools.watchFolders,
    server: {
      enhanceMiddleware: middleware => androidAssetsResolutionFix.applyMiddleware(middleware),
    },
  }
})()
