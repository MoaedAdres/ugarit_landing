import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
export default function ErrorLayout({
    img,
    header,
    description,
}: {
    img: StaticImport;
    header: string;
    description: string;
}) {
    return (
        <div className="flex items-center justify-center">
            <div className="flex gap-4 flex-col items-center justify-center md:pt-8 lg:pt-5">
                <div>
                    <Image alt="Not Found Page" src={img} />
                </div>
                <div className="flex gap-3 md:gap-4 flex-col items-center justify-center">
                    <div className="text-center mx-2 flex flex-col gap-2">
                        <h1 className="font-[500] text-xl md:text-4xl lg:text-6xl text-blue-500">
                            {header}
                        </h1>
                        <p className="text-gray-850 text-md font-[500] leading-[24px]">
                            {description}
                        </p>
                    </div>
                    <Link
                        className="px-8 py-2 bg-slate-400 hover:bg-black-200 hover:text-slate-400 rounded-2xl text-base lg:text-md font-[400] leading-[24px] animate duration-150 ease-in-out delay-150 text-black-200"
                        href={"/"}
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}