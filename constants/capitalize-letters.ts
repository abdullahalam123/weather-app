export const capitalizeFirstLetter = (str: string | undefined): string => {
  if (str && typeof str === "string") {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "";
};
