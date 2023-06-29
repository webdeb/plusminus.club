import { evaluateSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import * as provider from "@mdx-js/react";

export default function evalMdx(string) {
  const { default: MDXContent, ...rest } = evaluateSync(
    "this must work **children** asdf",
    {
      ...runtime,
      ...provider,
      format: "mdx",
      development: false,
    }
  );

  return <MDXContent />;
}
