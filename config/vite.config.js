const path = require('path');
const reactPlugin = require('vite-plugin-react')

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],
  alias: {
    '/@/': path.resolve(__dirname, '../src')
  },
  optimizeDeps: {
    include: ['antd']
  },
  cssPreprocessOptions:{
    // antd需要开启这个才能引用 antd.less
    javascriptEnabled: true
  }
}

module.exports = config
