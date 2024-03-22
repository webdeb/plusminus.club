import React from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import clsx from "clsx";
import { useState } from "react";
import MATH from "@components/math";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";

const unitPrefixes = ["G", "M", "k", "", "m", "u", "n", "p"];

export default function UnitInputWithPrefix({
  unit,
  value,
  label,
  onChange,
  className,
  disabled,
  placeholder,
}) {
  const unitValue = MATH.unit(value);
  const incomintUnitWithPrefix = unitValue.formatUnits();
  const incomingUnitNumber = unitValue.toNumber();
  const unitWithPrefixes = useMemo(
    () => unitPrefixes.map((p) => p + unit),
    [unit]
  );
  const [unitNumber, setUnitNumber] = useState(incomingUnitNumber);
  const [unitIndex, setUnitIndex] = useState(
    unitWithPrefixes.findIndex((el) => el === incomintUnitWithPrefix)
  );

  useEffect(() => {
    if (disabled) {
      setUnitNumber(incomingUnitNumber);
      setUnitIndex(
        unitWithPrefixes.findIndex((el) => el === incomintUnitWithPrefix)
      );
      return;
    }

    if (unitNumber > 0)
      onChange(`${unitNumber} ${unitWithPrefixes[unitIndex]}`);
  }, [
    unitNumber,
    incomintUnitWithPrefix,
    incomingUnitNumber,
    unitIndex,
    disabled,
  ]);

  return (
    <div className={clsx("flex max-w-[24rem]", className)}>
      <Input
        type="number"
        min={0}
        label={label}
        disabled={disabled}
        value={unitNumber}
        onChange={(e) => setUnitNumber(e.target.value)}
        step={1}
        placeholder={placeholder}
        className="w-full rounded-r-none"
        containerProps={{
          className: "min-w-[0] w-full rounded-r-0",
        }}
      />
      <Menu placement="bottom-end">
        <MenuHandler>
          <Button
            ripple={false}
            disabled={disabled}
            variant="text"
            color="blue-gray"
            className="flex h-10 w-12 items-center gap-2 normal-case rounded-l-none border disabled:border-0 border-l-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
          >
            {unitWithPrefixes[unitIndex]}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem] dark:text-white dark:bg-blue-gray-900">
          {unitWithPrefixes.map((unitWithPrefix, idx) => {
            return (
              <MenuItem
                key={unitWithPrefix}
                value={unitWithPrefix}
                className="flex items-center gap-2"
                onClick={() => setUnitIndex(idx)}
              >
                {unitWithPrefix}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

const Result = ({ value }) => <div>{value}</div>;
