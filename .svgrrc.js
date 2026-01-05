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
      {
        name: "convertColors",
        params: {
          currentColor: true,
        },
      },
    ],
  },
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
};
