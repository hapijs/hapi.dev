export const formatVersion = (version: string) => {
  const [major] = version.split('.');
  return `${major}.x.x`;
};
