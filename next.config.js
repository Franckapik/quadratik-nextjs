const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      })
  
      return config
    }
  });