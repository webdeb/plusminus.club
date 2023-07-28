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

  console.log(data);

  useEffect(() => {
    if (!rootEl.current || plot?.id === id) return;
    const plotInstance = functionPlot(
      Object.assign({}, options, { target: rootEl.current })
    );
    plotInstance.id = id;
    for (let k in eventHandlers) {
      plotInstance.on(k, (...args) => eventHandlers[k](...args, plotInstance));
    }
    setPlot(plotInstance);
  }, [options, rootEl.current, plot]);

  useEffect(() => {
    console.log({ data });
    if (!plot || !data) return;
    console.log(data);
    plot.options.data = data;
    plot.draw();
  }, [data, plot]);

  return <div ref={rootEl} />;
};
