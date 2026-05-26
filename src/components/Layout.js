import { Outlet, Link } from "react-router-dom"

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
              {/* Clients submenu */}
              <div className="relative group">
                <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                  Clients
                  <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/clients" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Clients</Link>
                </div>
              </div>
              {/* Companies submenu */}
              <div className="relative group">
                <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                  Companies
                  <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/companies" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Companies</Link>
                </div>
              </div>
            </div>
            <button onClick={Logout} className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </nav>
          <div className="App mt-8">
            <h1 className="text-2xl font-bold mb-5">Layout</h1>
            <div>
                <Outlet />
            </div>
          </div>
        </>
    );
}

export default Layout;
