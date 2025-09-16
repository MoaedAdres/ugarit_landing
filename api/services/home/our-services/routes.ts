import { normalizeUrl } from "@/utils/normalizeUrl";
// auth route
const authRoute = `/auth`;
// sign in path
const signInPath = `/login`;
// sign in route
const signInRoute = normalizeUrl(authRoute, signInPath);

export { signInRoute };
