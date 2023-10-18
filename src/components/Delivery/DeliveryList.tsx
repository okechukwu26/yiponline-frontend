/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LIST } from "./ParentList";
import ListTable from "../common/ListTable";

const DeliveryList = ({
  list,
  loading,
}: {
  list: LIST[];
  loading: boolean;
}) => {
  return (
    <div>
      <p className="text-center text-3xl mb-5 font-extrabold text-slate-600">
        {" "}
        Logistic Queue
      </p>
      {loading && (
        <span className="loading loading-spinner font-[poppins] loading-md md:ml-80 mt-2 text-green-500"></span>
      )}
      <div className="overflow-y-auto md:max-h-[720px] max-h-[480px]">
        <table className="shadow-2xl font-[poppins] mx-1   border-cyan-200">
          <thead className="text-white">
            <tr className="">
              <th className="py-3 bg-green-500 md:text-sm text-xs">
                CustomerId
              </th>
              <th className=" py-3 bg-green-800 md:text-sm text-xs ">
                Customer Name
              </th>
              <th className="py-3 bg-green-500 md:text-sm text-xs ">
                PickUpLocation
              </th>
              <th className="py-3 bg-green-800 md:text-sm text-xs ">
                DropOffLocation
              </th>
            </tr>
          </thead>
          <tbody className="text-center text-cyan-900  ">
            {list.map((item) => (
              <React.Fragment key={item._id}>
                <ListTable item={item} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryList;
