import { BASE_URL, online } from "@/api/config";

export function handleAddSearchParam(key: string, value: string) {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  searchParams.set(key, value);
  currentUrl.search = searchParams.toString();
  window.history.replaceState(null, "", currentUrl.toString());

}
export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getQueryParamsFromURL(url: string): URLSearchParams {
  const queryParamString = url.split("?");
  console.log("queryParamString", queryParamString[1]);
  const queryParams = new URLSearchParams(`?${queryParamString[1]}`);
  return queryParams;
}
export function truncatePargraph(pargraph: string, count: number = 20) {
  const cutedParagraph = pargraph?.slice(0, count);
  return pargraph?.length <= count ? pargraph : `${cutedParagraph}...`;
}
export const downloadFileFromBinary = ({
  binaryFile,
  mimeType = "application/pdf",
  fileName = "file",
  toast,
}: {
  binaryFile: any;
  mimeType: string;
  fileName: string;
  toast: any;
}) => {
  const blob = new Blob([binaryFile], {
    type: mimeType,
  });
  console.log("blob", blob);
  const blobUrl = window.URL.createObjectURL(blob);
  console.log("blobUrl", blobUrl);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${fileName}`;

  // Check if the browser supports creating a Blob URL
  if ("download" in a) {
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    toast({
      title: "error_downloading_file",
      description:
        "your_browser_does_not_support_blob_URLs_or_download_attribute",
    });
  }

  // Clean up by revoking the Blob URL
  URL.revokeObjectURL(blobUrl);
};
export const createFormDataFromObject = (object: { [key: string]: any }) => {
  const formData = new FormData();
  Object.keys(object).map((key) => formData.set(key, object[key]));
  return formData;
};

export const convertQueryParamsToObject = (queryParams: URLSearchParams) => {
  const queryObject: { [key: string]: string } = {};

  queryParams.forEach((value, key) => {
    if (value && key) queryObject[key] = value;
  });
  return queryObject;
};

export const readFile: any = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Constructs the full URL for an icon by combining the backend service URL with the icon path
 * @param iconPath - The icon path returned from the backend (e.g., "/storage/3/cart.svg")
 * @returns The full URL for the icon or the original path if it's already a full URL
 */
export const getIconUrl = (iconPath: string): string => {
  // If it's already a full URL (starts with http/https), return as is
  if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
    return iconPath;
  }

  // If it's a FontAwesome icon class, return as is
  if (iconPath.startsWith('fas fa-') || iconPath.startsWith('far fa-') || iconPath.startsWith('fab fa-')) {
    return iconPath;
  }

  const url = "http://192.168.0.72:8020";
  // Remove trailing slash from backend URL and leading slash from icon path to avoid double slashes
  const cleanBackendUrl = url?.replace(/\/$/, '');
  const cleanIconPath = iconPath.startsWith('/') ? iconPath : `/${iconPath}`;

  return `${cleanBackendUrl}${cleanIconPath}`;
};