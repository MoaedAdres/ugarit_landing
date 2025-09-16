"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
	error: Error;
	reset(): void;
};
export default function Error({ error, reset }: Props) {
	console.log("error.message", error.message);
	const key = error.message === "ServerError" ? "ServerError" : "Default";
	return (
		<div className="mx-auto flex h-screen max-w-xs flex-col items-center justify-center gap-3">
			<Image width={250} height={250} src={key === "ServerError" ? "/images/server-error.svg" : "/images/error.svg"} alt="error-image" />
			<div className="text-lg font-semibold">{ErrorPage[key].title}</div>
			<div>{ErrorPage[key].description}</div>
			<div className="flex flex-wrap flex-row gap-3">
				{!!ErrorPage[key]?.actionTitle && <Button onClick={reset}>{ErrorPage[key].actionTitle}</Button>}
				<Button variant={"secondary"}>الصفحة الرئيسية</Button>
			</div>
		</div>
	);
}
const ErrorPage = {
	Default: {
		description: "لسوء الحظ واجهنا خطأ، يمكنك محاولة إعادة تحميل الصفحة التي كنت تقوم بزيارتها.",
		title: "حدث خطأ ما!",
		actionTitle: "إعادة تحميل الصفحة",
	},
	ServerError: {
		description: "نواجه حالياً بعض المشكلات التقنية. يعمل فريقنا على حلها. يرجى المحاولة مرة أخرى لاحقاً.",
		title: "حدث خطأ ما!",
		actionTitle: null,
	},
};
