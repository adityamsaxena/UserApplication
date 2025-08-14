import React from "react";
import Loader from "./loader";

const Table = ({
  headers,
  children,
  loading,
  noDataMessage = "No data found.",
}) => {
  const isEmpty =
    !loading &&
    (!children || (Array.isArray(children) && children.length === 0));

  return (
    <table className="table table-hover table-bordered">
      <thead className="table-light">
        <tr>
          {headers.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={headers.length} className="text-center">
              <Loader size="2rem" color="primary" />
            </td>
          </tr>
        ) : isEmpty ? (
          <tr>
            <td colSpan={headers.length} className="text-center">
              {noDataMessage}
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
};

export default Table;
