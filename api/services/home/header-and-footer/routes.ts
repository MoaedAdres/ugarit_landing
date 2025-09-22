import { normalizeUrl } from "@/utils/normalizeUrl";
// home route
const HomeRoute = `/home`;
// header & footer path
const headerFooterPath = `/header-and-footer`;
// header & footer route
const headerFooterRoute = normalizeUrl(HomeRoute, headerFooterPath);

export { headerFooterRoute };
