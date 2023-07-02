import dynamic from "next/dynamic";

const FunctionPlot = dynamic(
  () => import("./component").then((mod) => mod.FunctionPlot),
  {
    ssr: false,
  }
);

export default FunctionPlot;
