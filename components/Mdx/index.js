import * as runtime from "react/jsx-runtime";
import * as provider from "@mdx-js/react";
import { evaluateSync } from "@mdx-js/mdx";
import { useMDXComponents } from "nextra/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const options = {
  ...runtime,
  ...provider,
  useMDXComponents,
  format: "mdx",
  development: false,
  rehypePlugins: [remarkMath, rehypeKatex],
};

export default function Mdx({ children }) {
  const { default: MDXContent } = evaluateSync(children, options);
  return <MDXContent />;
}

export const mdx = (str) => {
  const { default: MDXContent } = evaluateSync(str, options);
  return <MDXContent />;
};
