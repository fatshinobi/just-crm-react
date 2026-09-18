import { Link } from "react-router-dom";

function AttachmentElementCard({ record, link_path }) {
  const defaultImage = (record) => {
      //attachment_types: other: 0, image: 1, document: 2, pdf: 3
      switch (record.attachment_type) {
          case 0:
              return "M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z M12 17v.01 M12 14c0-1.5 1.5-2 1.5-3.25A1.75 1.75 0 0011.75 9";
          case 1:
              return "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3.5 5.5a.01.01 0 110-.02 M5 19l4.5-6 3.5 4.5 5-6.5 3 4";
          case 2:
              return "M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z M8 11h8 M8 15h8";
          case 3:
              return "M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z M4 12h8a2 2 0 012 2v1a2 2 0 01-2 2H4";
          default:
              return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
      }
  };

  const slassForStage = (record) => {
      switch (record.attachment_type) {
          case 0:
              return "text-gray-500";
          case 1:
              return "text-purple-500";
          case 2:
              return "text-blue-500";
          case 3:
              return "text-red-500";
          default:
              return "text-gray-500";
      }
  };

  return (
    <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
      <div className="border p-4 rounded-lg shadow-lg flex flex-col gap-4 min-h-[200px] max-w-32">
        <svg className={`w-16 h-16 md:w-20 md:h-20 mr-4 ${slassForStage(record)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={defaultImage(record)}></path>
        </svg>

        <div className="flex flex-col">
          <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
            {record?.description || "No description"}
          </span>
          <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">
            {record?.uploaded_file_name || "No file name"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default AttachmentElementCard;
