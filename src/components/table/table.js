import React from "react";

const TableLabel = ({ label, color }) => {
  return (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            className={
              "font-semibold text-lg" +
              (color === "light" ? "text-blueGray-700" : "text-white")
            }
          >
            {label}
          </h3>
        </div>
      </div>
    </div>
  );
};

const THead = ({ columns, color }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, i) => {
          return (
            <th
              key={i}
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light"
                  ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
              }
            >
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TBody = ({ tableData, colspan, color }) => {
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData?.map((row, i) => {
          const rowLink = row.rowLink;
          return (
            <tr
              key={i}
              className={
                "cursor-pointer " +
                (color === "light"
                  ? " hover:bg-gray-100 text-blueGray-600"
                  : "hover:bg-gray-600 text-white")
              }
              onClick={() => {
                if (rowLink) window.location = rowLink;
              }}
            >
              {row.items.map((column, i) => {
                return (
                  <td
                    key={i}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {column}
                  </td>
                );
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={colspan}
            className="border-t-0 align-middle border-l-0 border-r-0 text-sm text-center italic whitespace-nowrap p-12"
          >
            No entries found
          </td>
        </tr>
      )}
    </tbody>
  );
};

const CardTable = ({ label, columns, tableData, color = "light" }) => {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light"
            ? "bg-white text-blueGray-700"
            : "bg-blueGray-700 text-white")
        }
      >
        {label ? <TableLabel label={label} color={color} /> : null}
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <THead columns={columns} color={color} />
            <TBody
              tableData={tableData}
              colspan={columns.length}
              color={color}
            />
          </table>
        </div>
      </div>
    </>
  );
};

export default CardTable;
