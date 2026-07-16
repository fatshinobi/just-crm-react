import { Outlet, Link } from "react-router-dom"
import SidebarSwitcher from "./SidebarSwitcher"

function Layout({setAccessToken}) {
    const Logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(false);
    };

    return (
        <>
          {/* Navbar */}
          <nav className="bg-gray-800 p-4 flex items-center">
            <div className="flex space-x-4">
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/people" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">People</Link>
              <Link to="/companies" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Companies</Link>
            </div>
            <button onClick={Logout} className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </nav>
          <div className="grid grid-cols-[70%_30%]">
            <div class="bg-white">
                <Outlet />
            </div>
            <div class="bg-gray-200">
              <SidebarSwitcher />
            </div>
          </div>
        </>
    );
}

export default Layout;
