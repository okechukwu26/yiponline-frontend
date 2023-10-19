import { CUSTOMER } from "./ParentList";

const Customer = ({
  customer,
  open,
}: {
  customer: CUSTOMER[];
  open: boolean;
}) => {
  if (customer.length === 0) {
    return (
      <p className="text-center text-xl text-slate-900 my-60 font-extralight">
        No Slot has been created
      </p>
    );
  }
  const top = () => {
    let classes =
      "shadow-2xl font-[poppins]  mx-auto text-center my-40  border-cyan-200";
    if (open) {
     
      classes += "mt-60";
    }
    return classes;
  };
  return (
    <table className={top()}>
      <thead className="text-white">
        <tr className="p-4 font-[poppins] ">
          <th className=" py-3 bg-green-800 md:text-xl text-xs ">Name</th>
          <th className="py-3 bg-green-500 md:text-xl text-xs ">PickUp</th>
          <th className="py-3 bg-green-800 md:text-xl text-xs ">DropOff</th>
          <th className="py-3 bg-green-800 md:text-xl text-xs ">Schedule</th>
          <th className="py-3 bg-green-800 md:text-xl text-xs ">Slot</th>
        </tr>
      </thead>
      <tbody className="text-center text-cyan-900">
        {customer.map((item) => (
          <tr
            key={item._id}
            className="odd:bg-slate-100 font-[poppins] hover:bg-green-500 hover:text-white even:bg-white-300"
          >
            <td className="py-3 md:px-6 px-2">{item.name}</td>
            <td className="py-3 md:px-6 px-2">{item.pickUpLocation}</td>
            <td className="py-3 md:px-6 px-2">{item.DropOffLocation}</td>
            <td className="py-3 md:px-6 px-2">{item.schedule}</td>
            <td className="py-3 md:px-6 px-2">{item.slot}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Customer;
