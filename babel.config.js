module.exports = function(api) {
  babelrcRoots: [".", "packages/*"], api.cache(true);

  return {
    plugins: ["@babel/plugin-proposal-class-properties"]
  };
};
