const getStatusDecoration = (status) => {
  return status == "rejected"
    ? " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1 "
    : status == "approved"
    ? " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1 "
    : " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-amber-600 bg-amber-200 uppercase last:mr-0 mr-1 ";
};

export default getStatusDecoration;
