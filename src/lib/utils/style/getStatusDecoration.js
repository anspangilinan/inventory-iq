const getStatusDecoration = (status) => {
  const common =
    "text-white text-xs font-semibold inline-block py-1 px-2 uppercase rounded uppercase last:mr-0 mr-1 ";
  switch (status) {
    case "rejected":
      return `${common} bg-red-400 `;
    case "approved":
      return `${common} bg-emerald-400 `;
    case "pending":
      return `${common} bg-yellow-500 `;
  }
};

export default getStatusDecoration;
