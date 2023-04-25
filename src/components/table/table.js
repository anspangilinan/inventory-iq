import React from "react";

const TableLabel = ({ label }) => {
  return (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className={"font-semibold text-lg text-blueGray-700"}>{label}</h3>
        </div>
      </div>
    </div>
  );
};

const THead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, i) => {
          return (
            <th
              key={i}
              className={
                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
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

const TBody = ({ tableData, colspan }) => {
  return (
    <tbody>
      {tableData.length > 0 ? (
        tableData?.map((row, i) => {
          return (
            <tr key={i}>
              {row.map((column, i) => {
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
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm text-center italic whitespace-nowrap p-4"
          >
            No entries found
          </td>
        </tr>
      )}
    </tbody>
  );
};

const CardTable = ({ label, columns, tableData }) => {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {label ? <TableLabel label={label} /> : null}
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <THead columns={columns} />
            <TBody tableData={tableData} colspan={columns.length} />
          </table>
        </div>
      </div>
    </>
  );
};

export default CardTable;
