const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/WakeelyPro";

export function infographicUrl(filename: string, width?: number): string {
  const base = `${IMAGEKIT_ENDPOINT}/${filename}`;
  if (!width) return base;
  return `${base}?tr=w-${width},q-auto,f-auto`;
}

export function infographicFullUrl(filename: string): string {
  return `${IMAGEKIT_ENDPOINT}/${filename}`;
}
