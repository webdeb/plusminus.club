var nextra = require("nextra");

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

module.exports = withNextra({
  reactStrictMode: true,
  eslint: {
    // Eslint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["en", "ru", "de"],
    defaultLocale: "en",
  },
  redirects: () => [
    // {
    //   source: "/docs/docs-theme/built-ins/callout",
    //   destination: "/docs/guide/built-ins/callout",
    //   permanent: true,
    // },
  ],
});
