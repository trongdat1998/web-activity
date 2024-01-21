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
  '/api': {
    target: 'https://www.nucleex.com',
    changeOrigin: true,
    https: true,
    headers: {
      Referer: 'https://www.nucleex.com',
    },
    cookieDomainRewrite: 'localhost',
  },
}
