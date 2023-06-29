import { legends } from "./legends.en";
import clsx from "clsx";
import { useSSG } from "nextra/ssg";
import Link from "next/link";
import Image from "next/image";

export const Legends = ({ children, className }) => {
  return (
    <div className={clsx("flex flex-col space-y-4", className)}>
      {legends.map((legend) => (
        <LegendCard key={legend.id} {...legend} />
      ))}
    </div>
  );
};

export const LegendCard = ({
  name,
  dateOfDeath,
  dateOfBirth,
  shortDescription,
  image,
  id,
}) => {
  return (
    <div className="flex flex-row items-start bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden">
      <div className="w-1/3 min-h-fit m-4 relative">
        <Image
          className="rounded-md border border-gray-100 w-64 dark:border-gray-800"
          src={image}
          alt={name}
          placeholder="blur"
        />
      </div>
      <div className="flex flex-col w-2/3 m-4 ml-0 self-stretch justify-between">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="text-gray-600">
            {dateOfBirth} - {dateOfDeath}
          </div>
          <p className="mt-2">{shortDescription}</p>
        </div>
        <p className="font-semibold">
          <Link href={"/legends/" + id}>Read More</Link>
        </p>
      </div>
    </div>
  );
};
