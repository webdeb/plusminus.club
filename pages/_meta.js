export default {
  "*": {
    type: "page",
    theme: {
      layout: "raw",
    },
  },
  index: {
    title: "Home",
    display: "hidden",
  },
  legends: {
    title: "Legends",
  },
  electricity: {
    title: "Electricity",
  },
  hackpwm: {
    title: "Hack PWM",
  },
  calculators: {
    title: "Calculators",
    type: "menu",
    items: {
      "rlc-resonance": {
        title: "RLC Resonance Calculator",
        href: "/calculators/rlc-resonance",
      },
    },
  },
  // "circuit-simulator": {
  //   title: "Circuit Simulator",
  //   type: "doc",
  //   theme: {
  //     layout: "default",
  //   },
  // },
};
