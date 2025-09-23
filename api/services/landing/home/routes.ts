import { normalizeUrl } from "@/utils/normalizeUrl";
// main route
const MainRoute = `/home`;
// header & footer path
const headerFooterPath = `/header-and-footer`;
// home path
const homePath = "";

// header & footer route
const headerFooterRoute = normalizeUrl(MainRoute, headerFooterPath);
// home route
const HomeRoute = normalizeUrl(MainRoute, homePath);

export { headerFooterRoute, HomeRoute };
