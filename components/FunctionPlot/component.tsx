import React, { useEffect, useRef } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";

export interface FunctionPlotProps {
  options?: FunctionPlotOptions;
}

export const FunctionPlot: React.FC<FunctionPlotProps> = React.memo(
  ({ options }) => {
    const rootEl = useRef(null);

    useEffect(() => {
      if (!rootEl.current) return;
      functionPlot(Object.assign({}, options, { target: rootEl.current }));
    }, [options, rootEl.current]);

    return <div ref={rootEl} />;
  },
  () => false
);
