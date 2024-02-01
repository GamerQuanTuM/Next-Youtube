export const getTags = (tags: string) => {
  tags.trim();
  const tagsWithoutCommaAndSpace = tags.split(", ");

  const filteredTagsWithoutCommaAndSpace = tagsWithoutCommaAndSpace
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag !== "");

  const trimmedTags = filteredTagsWithoutCommaAndSpace.map((tag) => {
    if (tag.includes(",")) {
      const splitTags = tag.split(",");
      return splitTags;
    }
    return tag;
  });

  return trimmedTags.flat();
};
