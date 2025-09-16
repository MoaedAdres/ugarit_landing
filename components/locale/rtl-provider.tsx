"use client";

import type React from "react";

import { useLocale } from "next-intl";
import { isRTL } from "@/i18n/request";
import { useEffect } from "react";

export function RTLProvider({ children }: { children: React.ReactNode }) {
	const locale = useLocale();
	const rtl = isRTL(locale);

	useEffect(() => {
		document.documentElement.dir = rtl ? "rtl" : "ltr";
		document.documentElement.lang = locale;
	}, [locale, rtl]);

	return <>{children}</>;
}
