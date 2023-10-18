/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDrop } from "react-dnd";
import { RiAddCircleFill } from "react-icons/ri";
import { DropCustomer } from "../common/request";

import { LIST } from "./ParentList";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ITEM {
  item: LIST;
}
interface Props {
  removeList: (item: LIST) => void;
}

let lit = "";
const PlannerList = ({ removeList }: Props) => {
  let schedule: Value = new Date();
  const [success, setSuccess] = useState({} as { message: string });
  const [error, setError] = useState({} as { error: string });
  const [value, onChange] = useState<Value>(new Date());

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "customer",
    drop: (item) => addImageBoard(item as ITEM, lit, schedule),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // useEffect(() => {}, [value]);
  const addImageBoard = (item: ITEM, slot: string, schedule: Value) => {
    const info = {
      name: item.item?.name,
      customerId: item.item?._id,
      DropOffLocation: item.item?.DropOffLocation,
      pickUpLocation: item.item?.pickUpLocation,
      slot,
      schedule: schedule,
    };
    console.log(info, schedule);

    DropCustomer(info, setSuccess, setError, setLoading, setOpen, removeList);
  };
  const handleDate = (date: Value) => {
    onChange(date);
    schedule = date;
  };

  const slot = ["SLOT1", "SLOT2", "SLOT3", "SLOT4"];

  const maxDate = new Date();
  const minDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  console.log(value);
  return (
    <div>
      <p
        className={`text-center font-extrabold text-3xl font-[poppins]  text-slate-600 mb-5`}
      >
        Planner
      </p>
      <div className="text-center mx-auto font-[poppins]">
        <p className="text-xl text-slate-600 font-bold"> Select Date</p>
        <DatePicker
          className={`mx-auto z-20 `}
          value={value}
          onChange={(date) => handleDate(date)}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      {success.message && open && (
        <div className=" md:p-3 p-2 mx-auto font-[poppins] mt-4 bg-green-500 rounded-xl items-center w-8/12 flex justify-between">
          <p className="text-center md:text-xl text-sm text-white">
            customer added successful
          </p>
          <p
            onClick={() => {
              setOpen(false);
              setSuccess({ message: "" });
            }}
            className="text-white md:text-2xl text-sm  cursor-pointer"
          >
            X
          </p>
        </div>
      )}
      {error.error && open && (
        <div className=" md:p-3 p-2 mx-auto font-[poppins]  mt-4 bg-red-500 rounded-xl items-center w-8/12 flex justify-between">
          <p className="text-center text-white md:pl-20 pl-4 md:text-xl text-xs">
            {error.error}
          </p>
          <p
            onClick={() => {
              setOpen(false);
              setError({ error: "" });
            }}
            className="text-white text-xs md:text-2xl md:pr-10 cursor-pointer"
          >
            X
          </p>
        </div>
      )}
      {loading && (
        <span className="loading loading-spinner font-[poppins] loading-md md:ml-80 mt-2 text-green-500"></span>
      )}
      <div
        className=" grid md:grid-cols-1 gap-10 md:mt-2 mt-5 grid-cols-2 p-10"
        ref={drop}
      >
        {slot.map((item) => (
          <div
            key={item}
            className={`border py-3 rounded-md font-[poppins] border-3 shadow-lg text-center ${
              isOver && "cursor-pointer"
            }`}
            ref={drop}
          >
            <p>{item}</p>
            <div className="p-15 text-center" onDrop={() => (lit = item)}>
              <RiAddCircleFill className="mx-auto" size={40} color="green" />
              <p> Drag & Drop a customer</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerList;
