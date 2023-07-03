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
import parallelImg from "./RLC.png";
import Image from "next/image";

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

function RLCResonanceCalculator({ initValues }) {
  const [inductance, setInductance] = useState(initValues.inductance);
  const [capacitance, setCapacitance] = useState(initValues.capacitance);
  const [frequency, setFrequency] = useState(initValues.frequency);
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

  const handleCalc = (e) => {
    setCalc(e.target.value);
  };

  const reactanceUnitValue = math.unit(reactance);

  return (
    <div className="flex flex-row">
      <div className="calculator-form md:w-1/3 items-center">
        <Image src={parallelImg} />
        <div className="flex flex-row items-center">
          <Radio
            name="calc"
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
        {/* <div className="flex flex-row items-center">
          <UnitInputWithPrefix
            className="mt-2 ml-11"
            label="R1"
            placeholder="Coil resistance"
            unit="ohm"
            value={coilResistance || "1 ohm"}
            onChange={handleCoilResistanceChange}
          />
        </div> */}
        <div className="flex flex-row items-center">
          <Radio
            name="calc"
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
            name="calc"
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
        {/* <div>
          {coilResistanceUnitValue.value &&
            (console.log(1) || (
              <div>
                <BlockMath
                  math={`X_L = ${reactanceUnitValue.toNumber()} \\text{ ${reactanceUnitValue.formatUnits()}}`}
                />
              </div>
            ))}
        </div> */}
      </div>
      <div className="w-2/3 ml-2 -mt-4 h-full">
        {frequency && (
          <Tabs
            items={[
              <InlineMath math="X_L, X_C" />,
              // <InlineMath math="X_L" />,
              // <InlineMath math="X_C" />,
            ]}
          >
            <Tab>
              <FunctionPlot
                options={{
                  xAxis: {
                    label: "Frequency",
                    domain: [0, math.unit(frequency).value * 2],
                  },
                  yAxis: {
                    label: "Reactance",
                    domain: [0, math.unit(reactance).value * 3],
                  },
                  data: [
                    {
                      fn: `2*pi*x*L`,
                      scope: {
                        L: math.unit(inductance).value,
                        C: math.unit(capacitance).value,
                        pi: Math.PI,
                      },
                      sampler: "builtIn", // Use built-in sampling method
                      graphType: "polyline", // Use line plot
                      range: [0, 10e10], // Define the range of x values
                      graphTitle: "XL", // Title of the graph
                      grid: true, // Display grid lines
                    },
                    {
                      fn: `1/(2*pi*x*C)`,
                      scope: {
                        C: math.unit(capacitance).value,
                        pi: Math.PI,
                      },
                      sampler: "builtIn", // Use built-in sampling method
                      graphType: "polyline", // Use line plot
                      range: [0, 10e10], // Define the range of x values
                      graphTitle: "XC", // Title of the graph
                      grid: true, // Display grid lines
                    },
                  ],
                }}
              />
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default RLCResonanceCalculator;
