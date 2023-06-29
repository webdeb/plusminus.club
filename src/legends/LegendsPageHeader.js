import Image from "next/image";
import { legendsMap } from "./legends.en";
import { useMDXComponents } from "nextra/mdx";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

export default function LegendsPageHeader(
  { title, children, ...props },
  other
) {
  const router = useRouter();
  const config = useConfig();
  console.log(title, children, props, config.frontMatter, router.pathname);
  const pathParts = router.pathname.split("/");
  const legendId = pathParts.slice(-1)[0];

  return (
    <>
      {children[0]}
      <div className="flex flex-row">
        <Image src={legendsMap[legendId].image} width={500} height={500} />
        {children.slice(1)}
      </div>
    </>
  );
}
