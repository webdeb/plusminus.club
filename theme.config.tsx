import React from "react";
import { useRouter } from "next/router";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Logo } from "@components/Logo";

const config: DocsThemeConfig = {
  logo: Logo,
  darkMode: false,
  chat: {
    link: "https://t.me/plusminusclub",
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 48 48">
        <path
          fill="currentColor"
          d="M41.4193 7.30899s3.8853-1.515 3.5615 2.16429c-.1079 1.51502-1.0792 6.81752-1.8347 12.55292l-2.5902 16.9897s-.2158 2.4889-2.1585 2.9218c-1.9427.4328-4.8566-1.515-5.3963-1.9479-.4317-.3246-8.0943-5.1943-10.7925-7.575-.7555-.6493-1.6189-1.9479.1079-3.4629l11.3322-10.8214c1.2951-1.2986 2.5902-4.3286-2.8061-.6493L15.7331 27.7616s-1.7268 1.0821-4.9645.1082l-7.01518-2.1643s-2.59021-1.6232 1.83473-3.2465C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
        />
      </svg>
    ),
  },
  navigation: {
    next: true,
    prev: true,
  },
  project: {
    link: "https://github.com/webdeb/plusminus.club",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – plusminus.club",
    };
  },
  // chat: {
  //   link: "https://discord.com",
  // },
  // i18n: [
  //   { locale: "en", text: "English" },
  //   { locale: "ru", text: "Русский" },
  //   { locale: "de", text: "Deutsch" },
  // ],
  docsRepositoryBase: "https://github.com/webdeb/plusminus.club",

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
      <meta
        property="og:description"
        content="Site about electicity research"
      />
      <link rel="icon" href="/favicon.png" type="image/png" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    // title: (...args) => {
    //   console.log({ args }, "title");
    //   return "Heheh..";
    // },
    extraContent: (...args) => {
      return (
        <div>
          Contact: <a href="mailto:mail@plusminus.club"> mail@plusminus.club</a>
        </div>
      );
    },
    // component: (...args) => {
    //   console.log({ args });
    //   return null;
    // },
  },
};

const I18n_STRINGS = {
  searchPlaceholder: {
    ru: "Поиск",
    de: "Search",
    en: "Suche",
  },
};

export default config;
