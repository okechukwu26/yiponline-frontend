/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDrop } from "react-dnd";
import { RiAddCircleFill } from "react-icons/ri";
import { DropCustomer } from "../common/request";
import dayjs from "dayjs";

import { LIST } from "./ParentList";

import DatePickers from "../common/DatePicker";

interface ITEM {
  item: LIST;
}
interface Props {
  removeList: (item: LIST) => void;
  SLOT: string[];
}
let slot = "";
let schedule = new Date();
const PlannerList = ({ removeList, SLOT }: Props) => {
  const [success, setSuccess] = useState({} as { message: string });
  const [error, setError] = useState({} as { error: string });
  const [value, onChange] = useState(new Date());

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "customer",
    drop: (item) => addImageBoard(item as ITEM, slot, schedule),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // useEffect(() => {}, [value]);
  const addImageBoard = (item: ITEM, slot: string, schedule: Date) => {
    const time = dayjs(schedule).format("DD/MM/YYYY");
    const info = {
      name: item.item?.name,
      customerId: item.item?._id,
      DropOffLocation: item.item?.DropOffLocation,
      pickUpLocation: item.item?.pickUpLocation,
      slot,
      schedule: time,
    };

    DropCustomer(info, setSuccess, setError, setLoading, setOpen, removeList);
  };
  const handleDate = (date: Date) => {
    localStorage.setItem(
      "date",
      JSON.stringify(dayjs(date).format("DD/MM/YYYY"))
    );
    schedule = date;
    onChange(date);
  };

  const handleSlot = (item: string) => {
    slot = item;
  };

  const maxDate = new Date();
  const minDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  return (
    <div>
      <p
        className={`text-center font-extrabold text-3xl font-[poppins]  text-slate-600 mb-5`}
      >
        Planner
      </p>
      <div className="text-center mx-auto font-[poppins]">
        <p className="text-xl text-slate-600 font-bold"> Select Date</p>
        <DatePickers
          value={value}
          handleDate={handleDate}
          minDate={minDate}
          maxDate={maxDate}
          style="mx-auto  z-20 p-3 text-center mt-3 rounded-xl font-[poppins] hover:bg-green-500"
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
        {SLOT.map((slot) => (
          <div
            key={slot}
            className={`border py-3 rounded-md font-[poppins] border-3 shadow-lg text-center ${
              isOver && "cursor-pointer"
            }`}
            ref={drop}
          >
            <p>{slot}</p>
            <div className="p-15 text-center" onDrop={() => handleSlot(slot)}>
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
