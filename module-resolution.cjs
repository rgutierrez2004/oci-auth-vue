module.exports = {
  resolve: {
    preserveSymlinks: true,
    fallback: {
      "punycode": require.resolve("punycode/")
    }
  }
}
