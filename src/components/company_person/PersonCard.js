import { Link } from "react-router-dom";

function PersonCard({ record }) {
  const avatar_url = record.avatar_url
    ? record.avatar_url
    : process.env.PUBLIC_URL + "/def_person_ava.png";
  return (
    <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex flex-col gap-4">
      <img
        width="120"
        height="120"
        src={avatar_url}
        className="w-25 h-25 rounded-lg object-cover self-start"
        alt="ava image"
      />
      <div className="flex flex-col">
        <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
          {record.client_name}
        </span>
        <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">
          {record.role}
        </p>
      </div>
    </div>
  );
}

export default PersonCard;
