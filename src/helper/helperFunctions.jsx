// page count in pagination
export const pageCount = (totalUserCount, totalItemsPerPage) => {
  return Math.ceil(totalUserCount / totalItemsPerPage);
};
