import React, { useEffect, useRef, useState } from "react";
import functionPlot, { FunctionPlotOptions } from "function-plot";

export interface FunctionPlotProps {
  options?: FunctionPlotOptions;
}

export const FunctionPlot: React.FC<FunctionPlotProps & any> = ({
  options,
  data,
  eventHandlers = {},
  id,
}) => {
  const rootEl = useRef(null);
  const [plot, setPlot] = useState(null);

  useEffect(() => {
    if (!rootEl.current || plot) return;
    const plotInstance = functionPlot(
      Object.assign({}, options, { target: rootEl.current })
    );
    for (let k in eventHandlers) {
      plotInstance.on(k, (...args) => eventHandlers[k](...args, plotInstance));
    }
    setPlot(plotInstance);
  }, [options, rootEl.current, plot]);

  useEffect(() => {
    if (!plot || !data) return;
    plot.options.data = data;
    plot.draw();
  }, [data, plot]);

  return <div ref={rootEl} />;
};
