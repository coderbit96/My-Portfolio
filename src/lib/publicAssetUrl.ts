export const publicAssetUrl = (fileName: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/";
  return `${basePath.replace(/\/?$/, "/")}${fileName.replace(/^\//, "")}`;
};
