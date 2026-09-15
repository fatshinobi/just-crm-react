import { Link } from "react-router-dom";

function AttachmentElementCard({ record, link_path }) {
  const defaultImage = (record) => {
      //attachment_types: other: 0, image: 1, document: 2, pdf: 3
      switch (record.attachment_type) {
          case 0:
              return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
          case 1:
              return "M1 12s8 7 11 7 11-7 11-7-8-7-11-7S1 12 1 12z";
          case 2:
              return "M12 2l3 9h9l-6 5 2 9-7-5-7 5 2-9z";
          case 3:
              return "M5 13l4 4L19 7";
          default:
              return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
      }
  };

  const slassForStage = (record) => {
      switch (record.attachment_type) {
          case 0:
              return "text-gray-500";
          case 1:
              return "text-blue-500";
          case 2:
              return "text-orange-500";
          case 3:
              return "text-green-500";
          default:
              return "text-gray-500";
      }
  };

  return (
    <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
      <div className="border p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <svg className={`w-16 h-16 md:w-20 md:h-20 mr-4 ${slassForStage(record)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage(record)}></path>
        </svg>

        <div className="flex flex-col">
          <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
            {record?.description || "No description"}
          </span>
          <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">
            {record.role}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default AttachmentElementCard;
