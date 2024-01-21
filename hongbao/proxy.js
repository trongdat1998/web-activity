module.exports = {
  '/s_api': {
    target: 'https://www.nucleex.com',
    changeOrigin: true,
    https: true,
    headers: {
      Referer: 'https://www.nucleex.com',
    },
    cookieDomainRewrite: 'localhost',
  },
  '/api/ws/': {
    target: 'wss://ws.nucleex.com',
    ws: true,
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    cookieDomainRewrite: 'localhost',
  },
  '/api': {
    target: 'https://www.nucleex.com',
    changeOrigin: true,
    https: true,
    headers: {
      Referer: 'https://www.nucleex.com',
    },
    cookieDomainRewrite: 'localhost',
  },
  '/ws/quote/': {
    target: 'wss://ws.nucleex.com',
    ws: true,
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    cookieDomainRewrite: 'localhost',
  },
}
