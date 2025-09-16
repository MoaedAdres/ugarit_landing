import { IMyImage } from "@/interfaces/ui";
import Image from "next/image";

function MyImage({ alt, src, loading, fill, priority, placeholder }: IMyImage) {
  return <Image {...{ src, alt, loading, fill, priority, placeholder }} />;
}

export default MyImage;
