import clsx from "clsx";

export default function MathBlock({
  className,
  children,
  description,
  explanation,
}) {
  return (
    <div
      className={clsx(
        "p-4 dark:bg-blue-gray-900 border border-gray-600 rounded-md mt-4",
        className
      )}
    >
      <p>{description}</p>
      <div className="text-center mt-4 text-3xl">{children}</div>
      <p className="italic mt-2">{explanation}</p>
    </div>
  );
}
