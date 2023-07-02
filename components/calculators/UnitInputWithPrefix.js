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

export default function UnitInputWithPrefix({
  unit,
  value,
  onChange,
  className,
  disabled,
  placeholder,
}) {
  const unitValue = MATH.unit(value);
  const incomintUnitWithPrefix = unitValue.formatUnits();
  const incomingUnitNumber = unitValue.toNumber();

  const [unitNumber, setUnitNumber] = useState(incomingUnitNumber);
  const [unitWithPrefix, setUnitWithPrefix] = useState(incomintUnitWithPrefix);

  useEffect(() => {
    if (disabled) {
      setUnitNumber(incomingUnitNumber);
      setUnitWithPrefix(incomintUnitWithPrefix);
      return;
    }

    if (unitNumber > 0) onChange(`${unitNumber} ${unitWithPrefix}`);
  }, [
    unitNumber,
    incomintUnitWithPrefix,
    incomingUnitNumber,
    disabled,
    unitWithPrefix,
  ]);

  return (
    <div className={clsx("flex max-w-[24rem]", className)}>
      <Input
        type="number"
        min={0}
        disabled={disabled}
        value={unitNumber}
        onChange={(e) => setUnitNumber(e.target.value)}
        placeholder={placeholder}
        className="rounded-r-none !border-t-blue-gray-200 focus:!border-t-blue-500 dark:disabled:bg-transparent"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-[0]",
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
            {unitWithPrefix}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem] dark:text-white dark:bg-blue-gray-900">
          {["G", "M", "k", "", "m", "u", "n", "p"].map((prefix, index) => {
            const unitWithPrefix = prefix + unit;

            return (
              <MenuItem
                key={unitWithPrefix}
                value={prefix}
                className="flex items-center gap-2"
                onClick={() => setUnitWithPrefix(unitWithPrefix)}
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
