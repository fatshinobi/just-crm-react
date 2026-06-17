import { Outlet, Link, useLocation } from "react-router-dom"
import CompanyShow from "./companies/Show"
import CompanyEdit from "./companies/Edit"

function Layout({setAccessToken}) {
    const location = useLocation();
    const Logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(false);
    };

    const renderSidebar = () => {
      switch (true) {
        case location.pathname.includes("/companies"):
          return <div>Companies Sidebar</div>;
        case location.pathname.includes("/company/edit"):
          return <CompanyEdit />;
        case location.pathname.includes("/company/show"):
          return <CompanyShow />;
        default:
          return <div>Default Sidebar</div>;
      }
    };
    return (
        <>
          {/* Navbar */}
          <nav className="bg-gray-800 p-4 flex items-center">
            <div className="flex space-x-4">
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/clients" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Clients</Link>
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
              {renderSidebar()}
            </div>
          </div>
        </>
    );
}

export default Layout;
