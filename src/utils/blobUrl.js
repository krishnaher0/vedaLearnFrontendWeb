
export const getBlobUrl = async (mediaUrl) => {
  const response = await fetch(mediaUrl);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
