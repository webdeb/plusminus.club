import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import UnitInputWithPrefix from "./UnitInputWithPrefix";
import { Radio } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import math from "@components/math";
import { useEffect } from "react";
import { BlockMath } from "react-katex";

const FORMULAS = {
  C: "1/(4*pi^2*f^2*L)",
  L: "1/(4*pi^2*f^2*C)",
  f: "f = 1/(2*pi*(L*C)^0.5)",
  W: "w = 2*pi*f",
  XL: "XL = 2*pi*f*L",
  XC: "XC = 1/(w*C)",
};

const FORMULA_W = "w = 2πf";
const FORMULA_XL = "X_L = wL";
const FORMULA_XC = "X_C = 1/wC";

const FORMULA_FREQ = "f = 1/π(LC)^0.5";
const FORMULA_CAP = "C = 1/2πf";
const FORMULA_INDUCTANCE = "f = 1/π(LC)^0.5";

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
  const [reactance, setReactance] = useState("0 ohm");
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
    <div>
      <div className="calculator-form md:w-1/3">
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
          {reactanceUnitValue.value &&
            (console.log(1) || (
              <div>
                <BlockMath
                  math={`X_L = ${reactanceUnitValue.toNumber()} \\text{ ${reactanceUnitValue.formatUnits()}}`}
                />
              </div>
            ))}
        </div>
      </div>

      {/* <div>
        <label>Capacitance (F):</label>
        <input
          className="form-input"
          type="number"
          value={capacitance}
          onChange={handleCapacitanceChange}
        />
      </div>
      <div>
        <label>Frequency (Hz):</label>
        <input
          type="number"
          value={frequency}
          onChange={handleFrequencyChange}
        />
      </div> */}
      {/* <div className="text-right mt-4">
        <Button className="w-full" onClick={calculateValue}>
          Calculate
        </Button>
      </div> */}
    </div>
  );
}

export default RLCResonanceCalculator;
