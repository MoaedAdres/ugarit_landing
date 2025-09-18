import { IMyImage } from "@/interfaces/ui";
import Image from "next/image";

function MyImage({ alt, src, loading, fill, priority, placeholder, className, unoptimized }: IMyImage) {
  return <Image {...{ className, src, alt, loading, fill, priority, placeholder, unoptimized }} />;
}

export default MyImage;
