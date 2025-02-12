module.exports = {
  presets: ["next/babel"],
  overrides: [
    {
      test: /node_modules[\\\/]react-markdown/,
      presets: ["next/babel"],
    },
  ],
};
