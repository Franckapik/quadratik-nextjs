const path = require('path');

module.exports = {
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
  }