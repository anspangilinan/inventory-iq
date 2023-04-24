import React from "react";
import PropTypes from "prop-types";

const TableLabel = ({ label }) => {
  return (
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            className={
              "font-semibold text-lg " +
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

const THead = ({ columns }) => {
  <thead>
    <tr>
      {columns.map((column) => {
        <th
          className={
            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
            (color === "light"
              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
              : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
          }
        >
          {column}
        </th>;
      })}
    </tr>
  </thead>;
};

const TBody = ({ tableData }) => {
  <tbody>
    {tableData.map((row) => {
      <tr>
        {row.map((column) => {
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {column}
          </td>;
        })}
      </tr>;
    })}
  </tbody>;
};

const CardTable = ({ color, label, columns, tableData }) => {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        {label ? <TableLabel label={label} /> : null}
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <THead columns={columns} />
            <TBody data={tableData} />
          </table>
        </div>
      </div>
    </>
  );
};

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTable;
