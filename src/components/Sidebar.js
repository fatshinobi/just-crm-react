import { Link } from "react-router-dom"

function Sidebar() {

    return (
        <div className="p-4">
            <Link to="/company/create" className="text-blue-500 hover:underline mt-4 block">Create Company</Link>
        </div>
    );
}

export default Sidebar;
