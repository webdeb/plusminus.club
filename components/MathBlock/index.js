import clsx from "clsx";
import { useState } from "react";
import { useMemo } from "react";
import { InlineMath, BlockMath } from "react-katex";
import MATH from "@components/math";

export function latex(str) {
  return <InlineMath math={str} />;
}

export default function MathBlock({
  math,
  className,
  children,
  description,
  explanation,
  latex,
  params = { A: 10, b: 10 },
  withCalc,
}) {
  return (
    <div
      className={clsx(
        "p-4 dark:bg-blue-gray-900 bg-gray-50 border border-gray-600 rounded-md mt-4",
        className
      )}
    >
      <p>{description}</p>
      {math && !Array.isArray(math) && (
        <div className="text-xl">
          <BlockMath math={MATH.parse(math).toTex({ handler: texHandler })} />
        </div>
      )}
      {math &&
        Array.isArray(math) &&
        math.map((m, idx) => (
          <div key={idx} className="text-xl mt-2 last:mt-0">
            <BlockMath math={MATH.parse(m).toTex()} />
            {idx + 1 < math.length && <div className="text-center">or</div>}
          </div>
        ))}
      {latex && <BlockMath math={latex} />}
      {children && (
        <div className="text-center font-semibold text-xl my-4">{children}</div>
      )}
      <p className="mt-2">{explanation}</p>
      {withCalc && <Calculator params={params} math={math} />}
    </div>
  );
}

export const Calculator = ({ math, params }) => {
  const paramsArray = useMemo(() => Object.keys(params), params);
  const values = useMemo(
    () => paramsArray.reduce((acc, k) => ({ ...acc, [k]: params[k].v }), {}),
    paramsArray
  );
  const units = useMemo(
    () => paramsArray.reduce((acc, k) => ({ ...acc, [k]: params[k].u }), {}),
    paramsArray
  );

  const [state, setState] = useState(values);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state) => ({ ...state, [name]: `${value} ${units[name]}` }));
  };

  const result = MATH.evaluate(math, { ...state, ...CONSTANTS });

  return (
    <div>
      {paramsArray.map((paramName) => (
        <div key={paramName} className="flex flex-col">
          <label>
            {paramName}: {state[paramName]}
          </label>
          <div>
            <input
              type="number"
              min={0}
              step={state[paramName]}
              name={paramName}
              value={state[paramName]}
              onChange={handleChange}
            />
            <select onChange={() => {}} name={paramName}>
              {["M", "k", "", "m", "u", "n", "p"].map((prefix) => (
                <option key={prefix} value={prefix + units[paramName]}>
                  {prefix + units[paramName]}
                </option>
              ))}
            </select>
          </div>
          <input
            type="range"
            name={paramName}
            value={state[paramName]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div>Result: {result}</div>
    </div>
  );
};
