import React from "react";

function TableCustom({ col, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">
              <input type="checkbox" />
            </th>
            {col.map((title, index) => {
              return (
                <th className="px-4 py-2" key={index}>
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TableCustom;
