const path = require('path');

module.exports = {
  transpilePackages: ['three'],
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