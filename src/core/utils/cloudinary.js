const UPLOAD_URL = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/;
const HAS_TRANSFORM = /^[a-z]{1,3}_[^/]+\//;

export function isCloudinaryUrl(url) {
  return typeof url === "string" && UPLOAD_URL.test(url);
}

export function cloudinaryImage(url, width) {
  if (!url) return url;
  const match = url.match(UPLOAD_URL);
  if (!match) return url;
  const [, base, rest] = match;
  if (HAS_TRANSFORM.test(rest)) return url;
  return `${base}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}

export function cloudinarySrcSet(url, widths) {
  if (!isCloudinaryUrl(url)) return undefined;
  return widths.map((w) => `${cloudinaryImage(url, w)} ${w}w`).join(", ");
}
