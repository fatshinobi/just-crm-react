import { Link } from "react-router-dom"

function Card({ record }) {
    return (
        <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
            <img srcSet="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" src="https://files.idyllic.app/files/static/230399?width=200&optimizer=image" class="w-24 h-24 rounded-lg object-cover flex-shrink-0" alt="ava image"></img>

            <div className="flex flex-col">
                <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
                    {record.caption}
                </span>
                <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">Description text</p>
                <span className="inline-flex items-center px-3 py-0.5 text-xs font-bold leading-5 text-white font-display mr-2 capitalize bg-red-500 w-fit" >
                    <Link to={record.show_path} className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">View</Link>
                </span>
            </div>
        </div>
    );
}

export default Card;
