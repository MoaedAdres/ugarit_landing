import { SigninForm } from "@/components/auth/signin-form";
import { Suspense } from "react";
import { getAuthTranslations } from "@/lib/server-translation";

export default async function SignInPage() {
	const t = await getAuthTranslations();
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-6">
				<Suspense fallback={<div>{t("signin.title")}</div>}>
					<SigninForm />
				</Suspense>
			</div>
		</div>
	);
}
