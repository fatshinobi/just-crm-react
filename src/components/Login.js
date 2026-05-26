function Login({setAccessToken}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        fetch('http://localhost:3000/api/v1/auth/sign_in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        //.then(response => response.json())
        .then(response => {
          if (response.ok) {
            localStorage.setItem('accessToken', response.headers.get('access-token'));
            setAccessToken(true);
            return response.json();
          } else {
            throw new Error('Login failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    return (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Log In</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email:</label>
                    <input type="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password:</label>
                    <input type="password" name="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <input type="submit" value="Submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" />
            </form>
          </div>
        </>
    );
}

export default Login;
