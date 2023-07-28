import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import UnitInputWithPrefix from "./UnitInputWithPrefix";
import { Radio } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import math from "@components/math";
import { useEffect } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { useRef } from "react";
import FunctionPlot from "../FunctionPlot";
import { Tab, Tabs } from "nextra-theme-docs";
import Img from "./Combi.png";
import Image from "next/image";
import clsx from "clsx";

const FORMULAS = {
  C: "1/(4*pi^2*f^2*L)",
  L: "1/(4*pi^2*f^2*C)",
  f: "f = 1/(2*pi*(L*C)^0.5)",
  XL: "XL = 2*pi*f*L",
  XC: "XC = 1/(2*pi*f*C)",
};

const PRECISION = 5;

const shortenUnitValue = (value, u) => {
  const unit = math.unit(value + " " + u);

  if (value > 1000000000) return unit.to("G" + u).format(PRECISION);
  if (value > 1000000) return unit.to("M" + u).format(PRECISION);
  if (value > 1000) return unit.to("k" + u).format(PRECISION);
  if (value > 0) return unit.format(PRECISION);
  if (value > 10e-3) return unit.to("m" + u).format(PRECISION);
  if (value > 10e-6) return unit.to("u" + u).format(PRECISION);
  if (value > 10e-9) return unit.to("n" + u).format(PRECISION);
  if (value > 10e-12) return unit.to("p" + u).format(PRECISION);

  return unit.format(PRECISION);
};

const Calculators = () => {
  const [parallelValues, setParallelValues] = useState(null);
  const [serialValues, setSerialValues] = useState(null);
  const [domain, setDomain] = useState({});

  const domainDebounced = useDebounce(domain, 10000);

  const frequency =
    parallelValues?.frequency || serialValues?.frequency || "1 Mhz";
  const reactance =
    parallelValues?.reactance || serialValues?.reactance || "100 ohm";

  return (
    <div>
      <div className="flex flex-row w-full">
        <div className="w-1/3">
          <h5>Parallel</h5>
          <RLCResonanceCalculator
            id="parallel"
            onChange={setParallelValues}
            initValues={{
              inductance: "10 mH",
              capacitance: "960 pF",
            }}
          />
          <h5>Serial</h5>
          <RLCResonanceCalculator
            onChange={setSerialValues}
            type="serial"
            id="serial"
            initValues={{
              inductance: "22 mH",
              capacitance: "4 nF",
            }}
          />
        </div>
        <div className="ml-4 w-2/3">
          <Image src={Img} />
          {parallelValues && (
            <FunctionPlot
              id="combined"
              options={{
                id: "combi",
                xAxis: {
                  label: "Frequency",
                  domain: domain.x || [0, math.unit(frequency).value * 2],
                },
                yAxis: {
                  label: "Reactance",
                  domain: domain.y || [0, math.unit(reactance).value * 3],
                },
              }}
              data={[
                // Parallel
                getPlotDataOptions({
                  fn: `2*pi*x*L`,
                  scope: {
                    L: math.unit(parallelValues.inductance).value,
                    C: math.unit(parallelValues.capacitance).value,
                    pi: Math.PI,
                  },
                  graphTitle: "XL", // Title of the graph
                }),
                getPlotDataOptions({
                  fn: `1/(2*pi*x*C)`,
                  scope: {
                    C: math.unit(parallelValues.capacitance).value,
                    pi: Math.PI,
                  },
                  graphTitle: "XC", // Title of the graph
                }),
                getPlotDataOptions({
                  fn: "(L/C)/sqrt(R1^2 + (2*pi*x*L - 1/(2*pi*x*C))^2)",
                  scope: {
                    C: math.unit(parallelValues.capacitance).value,
                    L: math.unit(parallelValues.inductance).value,
                    R1: math.unit(parallelValues.resistance).value,
                    pi: Math.PI,
                  },
                }),
                // Serial
                getPlotDataOptions({
                  fn: `2*pi*x*L`,
                  scope: {
                    L: math.unit(serialValues.inductance).value,
                    C: math.unit(serialValues.capacitance).value,
                    pi: Math.PI,
                  },
                  graphTitle: "XL", // Title of the graph
                }),
                getPlotDataOptions({
                  fn: `1/(2*pi*x*C)`,
                  scope: {
                    C: math.unit(serialValues.capacitance).value,
                    pi: Math.PI,
                  },
                  graphTitle: "XC", // Title of the graph
                }),
                getPlotDataOptions({
                  fn: "sqrt(R1^2 + (2*pi*x*L - 1/(2*pi*x*C))^2)",
                  scope: {
                    C: math.unit(serialValues.capacitance).value,
                    L: math.unit(serialValues.inductance).value,
                    R1: math.unit(serialValues.resistance).value,
                    pi: Math.PI,
                  },
                  color: "#000",
                }),
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getPlotDataOptions = (options) => {
  return {
    fn: "(L/C)/sqrt(R1^2 + (2*pi*x*L - 1/(2*pi*x*C))^2)",
    scope: {},
    sampler: "builtIn", // Use built-in sampling method
    graphType: "polyline", // Use line plot
    range: [0, 10e10], // Define the range of x values
    graphTitle: "XC", // Title of the graph
    grid: true, // Display grid lines
    ...options,
  };
};

function RLCResonanceCalculator({
  initValues,
  className,
  type,
  onChange,
  id = "0",
}) {
  const [inductance, setInductance] = useState(
    initValues?.inductance || "1 uH"
  );
  const [capacitance, setCapacitance] = useState(
    initValues?.capacitance || "1 nF"
  );
  const [frequency, setFrequency] = useState(initValues?.frequency);
  const [coilResistance, setCoilResistance] = useState("1 ohm");
  const [reactance, setReactance] = useState("0.1 ohm");
  const [calc, setCalc] = useState("f");

  const handleInductanceChange = (value) => {
    setInductance(value);
  };

  const handleCapacitanceChange = (value) => {
    setCapacitance(value);
  };

  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };

  const handleCoilResistanceChange = (value) => {
    setCoilResistance(value);
  };

  const calculateValue = () => {
    if (calc === "f") {
      const result = math.evaluate(FORMULAS.f, {
        L: math.unit(inductance).value,
        C: math.unit(capacitance).value,
      });

      setFrequency(shortenUnitValue(result, "Hz"));
    } else if (calc === "C") {
      const result = math.evaluate(FORMULAS.C, {
        f: math.unit(frequency).value,
        L: math.unit(inductance).value,
      });

      setCapacitance(shortenUnitValue(result, "F"));
    } else if (calc === "L") {
      const result = math.evaluate(FORMULAS.L, {
        f: math.unit(frequency).value,
        C: math.unit(capacitance).value,
      });

      setInductance(shortenUnitValue(result, "H"));
    } else {
      alert("Please enter two values to calculate the desired value.");
    }
  };

  const calculateReactance = () => {
    try {
      const uL = math.unit(inductance);
      const uf = math.unit(frequency);
      if (uL.value > 0 && uf.value > 0) {
        const result = math.evaluate(FORMULAS.XL, {
          L: uL.value,
          f: uf.value,
        });

        setReactance(shortenUnitValue(result, "ohm"));
      }
    } catch (e) {
      return;
    }
  };

  useEffect(calculateValue, [inductance, capacitance, frequency]);
  useEffect(calculateReactance, [inductance, frequency]);
  useEffect(() => {
    if (inductance && capacitance && frequency && coilResistance && reactance) {
      onChange({
        inductance,
        capacitance,
        frequency,
        resistance: coilResistance,
        reactance,
      });
    }
  }, [inductance, capacitance, frequency, coilResistance, reactance]);

  const handleCalc = (e) => {
    setCalc(e.target.value);
  };

  const reactanceUnitValue = math.unit(reactance);
  const inductanceUnitValue = math.unit(inductance);
  const capacitanceUnitValue = math.unit(capacitance);
  const coilResistanceUnitValue = math.unit(coilResistance);

  return (
    <div className={clsx(className, "md:w-1/3 items-center")}>
      <div className="flex flex-row items-center">
        <Radio
          name={"calc" + id}
          value="L"
          onChange={handleCalc}
          checked={calc === "L"}
        />
        <UnitInputWithPrefix
          className="mt-2"
          label="Inductance"
          unit="H"
          disabled={calc === "L"}
          value={inductance || "0 uH"}
          onChange={handleInductanceChange}
        />
      </div>
      <div className="flex flex-row items-center">
        <UnitInputWithPrefix
          className="mt-2 ml-11"
          label="R1"
          placeholder="Coil resistance"
          unit="ohm"
          value={coilResistance || "1 ohm"}
          onChange={handleCoilResistanceChange}
        />
      </div>
      <div className="flex flex-row items-center">
        <Radio
          name={"calc" + id}
          value="C"
          onChange={handleCalc}
          checked={calc === "C"}
        />
        <UnitInputWithPrefix
          className="mt-2"
          label="Capacitance"
          unit="F"
          disabled={calc === "C"}
          value={capacitance || "0 nF"}
          onChange={handleCapacitanceChange}
        />
      </div>
      <div className="flex flex-row items-center">
        <Radio
          name={"calc" + id}
          value="f"
          onChange={handleCalc}
          checked={calc === "f"}
        />
        <UnitInputWithPrefix
          className="mt-2"
          unit="Hz"
          label="Frequency"
          disabled={calc === "f"}
          value={frequency || "0 Hz"}
          onChange={handleFrequencyChange}
        />
      </div>
      <div>
        {reactanceUnitValue.value && (
          <div>
            <BlockMath
              math={`X_L = ${reactanceUnitValue.toNumber()} \\text{ ${reactanceUnitValue.formatUnits()}}`}
            />
          </div>
        )}
      </div>
      <div>
        <BlockMath
          math={`Z_0 = ${Number(
            inductanceUnitValue.value /
              (coilResistanceUnitValue.value * capacitanceUnitValue.value)
          ).toFixed(2)} \\text{ ${reactanceUnitValue.formatUnits()}}`}
        />
      </div>
    </div>
  );
}

export default Calculators;

export const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};
