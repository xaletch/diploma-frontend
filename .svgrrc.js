export default {
  jsxRuntime: "automatic",
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeDimensions',
    ],
  },
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
};
