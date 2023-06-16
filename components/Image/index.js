import Image from "next/image";

function extractSizeParameters(string) {
  const regex = /_(\d+)x(\d+)\.jpg$/;
  const match = string.match(regex);

  if (match) {
    const width = parseInt(match[1]);
    const height = parseInt(match[2]);
    return { width, height };
  }

  return null; // Return null if no width and height parameters found
}

export default ({ src, ...props }) => {
  const dimensions = extractSizeParameters(src);
  if (dimensions && props.width && !props.height) {
    props.height = (props.width / dimensions.width) * dimensions.height;
  }

  return <Image src={src} {...props} />;
};
