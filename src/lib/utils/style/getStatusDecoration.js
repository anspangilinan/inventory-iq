const getStatusDecoration = (status) => {
  return status == "rejected"
    ? " rounded px-2 py-1 bg-red-200 text-red-800 "
    : status == "approved"
    ? " rounded px-2 py-1 bg-green-200 text-green-800 "
    : " rounded px-2 py-1 bg-orange-200 text-orange-800 ";
};

export default getStatusDecoration;
