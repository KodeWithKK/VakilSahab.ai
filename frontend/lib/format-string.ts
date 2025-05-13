export function formatFileSize(sizeInByte: number, precision: number = 2) {
  const sizeInKB = sizeInByte / 1024;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(precision)} KB`;
  return `${(sizeInKB / 1024).toFixed(precision)} MB`;
}
