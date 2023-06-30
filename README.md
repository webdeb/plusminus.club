# Plusminus.club website

### Rules for contribute

1. Use mdx format for pages

```mdx
---
title: The TRIAC
description: Here you will learn what the triac is, how it works, and which problems it solves.
---

### The Triac

...
```

2. Use `<MathBlock />` Component for Math expressions

```mdx
import MathBlock from "@components/MathBlock";

### Some formulas

<MathBlock
  description="Quadratic function"
  math="y = x*x"
  // or for more precise latex expressions
  latex="f(x) = x \cdot x"
  explanation="x gets multiplied by itsef."
/>

The formula above is just an example.. ..
```

3. Add illustrations, but use only open source images.

4. Use the Simulator Module
