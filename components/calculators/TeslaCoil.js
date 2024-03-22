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
import parallelImg from "./RLCParallel.png";
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

const PI = Math.PI;
function calculateSelfFrequency(x, l, d, D, H = null) {
    H = H || coilHeight(d, l, D)
    const numerator = Math.pow((300 / x) / (l * (1 + (0.9 / x) / (H / D))), 0.8);
    const denominator = Math.pow((73 * H) / Math.pow(D, 2), 0.2);
    return numerator * denominator * 1000000;
}

function coilHeight(d, l, D) {
  return d * (l / (D * PI)) * 1000
}

function lengthByWindings(w, D) {
  return w * D * PI / 1000
}

function approxFreq(wireDiameter, coilDiameter, windings, x = 4) {
  const len = lengthByWindings(windings, coilDiameter)
  return calculateSelfFrequency(x, len, wireDiameter, coilDiameter)
}

function TeslaCoilCalculator() {
  const [wireDiameter, setWireDiameter] = useState("300 um");
  const [coilDiameter, setCoildDiameter] = useState("50 mm");
  const [frequency, setFrequency] = useState("1 MHz");
  const [windings, setWindings] = useState(0)
  
  const wireDiameterUnitValue = math.unit(wireDiameter);
  const coilDiameterUnitValue = math.unit(coilDiameter);
  const frequencyUnitValue = math.unit(frequency);

  const d = wireDiameterUnitValue.toNumber("mm")
  const D = coilDiameterUnitValue.toNumber("mm")
  const f = frequencyUnitValue.toNumber("Hz")
  const D2 = Math.pow(D, 2)
  const s = 300000000
  const k = 0.9
  const x = 4
  /*
  l = (9.67444 d s - 3.14159 D^2 k (f/(1/D^2)^(1/5))^(5/4))/(d x (f/(1/D^2)^(1/5))^(5/4))
  */
  // console.log(d, D2, f)
  // const wireLength = (9.67444 * d * s - math.PI * D2 * k * Math.pow(f/Math.pow(1/D2, 0.2), 1.25))/(d * x * Math.pow(f/Math.pow(1/D2, 0.2), 1.25))
  // const heigthOfCoil =  wireLength / math.PI
  
  useEffect(() => {
    let windings = 0
    let lastDiff = Infinity
    while(true) {
      windings++
      const approx = approxFreq(d, D, windings)
      let diff = approx - f
      if (diff < 0) {
        if (Math.abs(diff) < Math.abs(lastDiff)) {
          setWindings(windings)
        } else {
          setWindings(windings - 1)
        }
        return
      } else {
        lastDiff = diff
      }
    }

  }, [d, D, f])
  
  const wireLength = lengthByWindings(windings, D)
  const H = coilHeight(d, wireLength, D)
  const fMhz = calculateSelfFrequency(4, wireLength, d, D)/1000000

  return (
    <div className="flex flex-row">
      <div className="calculator-form md:w-1/3 items-center">
        <div className="flex flex-row items-center">
          <UnitInputWithPrefix
            className="mt-2"
            label="d: Wire ø"
            unit="m"
            value={wireDiameter}
            onChange={setWireDiameter}
          />
        </div>
        {/* <div className="flex flex-row items-center">
          <UnitInputWithPrefix
            className="mt-2"
            label="Step (Use if >= d)"
            unit="m"
            value={step}
            onChange={setStep}
          />
        </div> */}
        <div className="flex flex-row items-center">
          <UnitInputWithPrefix
            className="mt-2"
            label="D: Coil ø"
            unit="m"
            value={coilDiameter}
            onChange={setCoildDiameter}
          />
        </div>
        <div className="flex flex-row items-center">
          <UnitInputWithPrefix
            className="mt-2"
            unit="Hz"
            label="Frequency"
            value={frequency || "0 Hz"}
            onChange={setFrequency}
          />
        </div>
          {!!windings && (
            <div className="flex flex-col mt-4">
              <InlineMath math={`Approx_{Freq} = ${fMhz.toFixed(3)} Mhz`} />
              <InlineMath math={`Windings = ${windings}`} />
              <InlineMath math={`Wire = ${wireLength.toFixed(2)}m`} />
              <InlineMath math={`Coil = ${(wireLength*d*1000/(D*math.PI)).toFixed(2)}mm`} />
            </div>
          )}
      </div>
      <div className="w-2/3 ml-2 -mt-4 h-full">
        {frequency && (
          <FunctionPlot
            options={{
              xAxis: {
                label: "Length",
                domain: [1, wireLength * 2],
              },
              yAxis: {
                label: "Frequency in kHz",
                domain: [1, fMhz * 2],
              },
            }}
            data={[
              {
                // fn: "((300/4)/(x*(1+(0.9/4)/((1000*d*x/(D*PI))/D)))^(4/5))*(73*(1000*d*x/(D*PI))/D2)^(5/4)",
                fn: function (scope) {
                  return calculateSelfFrequency(scope.lambda, scope.x, scope.d, scope.D) / 1000000
                },
                scope: {
                  lambda: 4,
                  D,
                  d,
                  PI,
                },
                sampler: "builtIn", // Use built-in sampling method
                graphType: "polyline", // Use line plot
                range: [0, 250], // Define the range of x values
                graphTitle: "1/4", // Title of the graph
                grid: true, // Display grid lines
              },
              {
                // fn: "((300/4)/(x*(1+(0.9/4)/((1000*d*x/(D*PI))/D)))^(4/5))*(73*(1000*d*x/(D*PI))/D2)^(5/4)",
                fn: function (scope) {
                  const H = coilHeight(scope.d, scope.x, scope.D)
                  const N = H/scope.d
                  const k = H/scope.D

                  const L = (scope.D*Math.pow(N, 2))/(0.45*k*1000000)
                  const C = (0.1126*(H/10)+0.08*(scope.D/10)+0.27*(Math.pow(scope.D/10, 3)/(H/10)))
                  const LC = (159*Math.sqrt(0.45 + k)/(N*scope.D/1000))*Math.sqrt(scope.D/C/1000)
                  return LC
                },
                scope: {
                  lambda: 4,
                  D,
                  d,
                  PI,
                },
                sampler: "builtIn", // Use built-in sampling method
                graphType: "polyline", // Use line plot
                range: [0, 1000], // Define the range of x values
                graphTitle: "LC", // Title of the graph
                grid: true, // Display grid lines
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default TeslaCoilCalculator;
