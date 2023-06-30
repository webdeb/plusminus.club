import { create, all } from "mathjs";
import { CONSTANTS, allowedChars } from "./constants";

export const MATH = create(all);
MATH.import(CONSTANTS);

const isAlphaOriginal = MATH.parse.isAlpha;
MATH.parse.isAlpha = function (c, cPrev, cNext) {
  return isAlphaOriginal(c, cPrev, cNext) || allowedChars.includes(c);
};

export const texHandler = (node, options) => {
  if (node.type === "SymbolNode" && node.name.includes("_")) {
    const index = node.name.indexOf("_");
    return ` ${node.name.substring(0, index + 1)}{${node.name.substring(
      index + 1
    )}}`;
  }
};

export default MATH;
