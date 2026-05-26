function Layout({setAccess}) {
    const Logout = () => {
        localStorage.removeItem("access");
        setAccess(false);
    };

    return (
        <>
            <h1>Layout</h1>
            <button onClick={Logout}>Logout</button>
        </>
    );
}

export default Layout;