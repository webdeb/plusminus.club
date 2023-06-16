import React from "react";
import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Logo } from "@components/Logo";

const config: DocsThemeConfig = {
  logo: Logo,
  navigation: {
    next: true,
    prev: true,
  },
  project: {
    link: "https://github.com/plusminusclub",
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  i18n: [
    { locale: "en", text: "English" },
    { locale: "ru", text: "Русский" },
    { locale: "de", text: "Deutsch" },
  ],
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "© plusminus.club 2023",
  },
  search: {
    placeholder: () => I18n_STRINGS.searchPlaceholder[useRouter().locale],
  },
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="plusminus.club" />
      <meta property="og:description" content="Site about electicity" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </>
  ),
};

const I18n_STRINGS = {
  searchPlaceholder: {
    ru: "Поиск",
    de: "Search",
    en: "Suche",
  },
};

export default config;
