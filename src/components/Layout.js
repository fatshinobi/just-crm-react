import { Outlet, Link } from "react-router-dom"

function Layout({setAccessToken}) {
    const Logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(false);
    };

    return (
        <>
          <div className="App">
            <h1 className="text-2xl font-bold mt-8 mb-5">Layout</h1>
            <button  onClick={Logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
            <div>
                <Outlet />
            </div>
          </div>
        </>
    );
}

export default Layout;