import { Link } from "react-router-dom";

function ElementCard({ record, link_path, default_image }) {
  const avatar_url = record.avatar_url
    ? record.avatar_url
    : process.env.PUBLIC_URL + default_image;
  return (
    <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
      <div className="border p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <img
          width="120"
          height="120"
          src={avatar_url}
          className="w-25 h-25 rounded-lg object-cover self-start"
          alt="ava image"
        />
        <div className="flex flex-col">
          <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
            {record.name}
          </span>
          <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">
            {record.role}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ElementCard;
