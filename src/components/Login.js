function Login({setAccessToken}) {
    //const token = localStorage.getItem('accessToken');
    //if (token) {
    //    setAccessToken(token);
    //}
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
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Email:</label>
                    <input type="email" name="email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password:</label>
                    <input type="password" name="password" class="form-control" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Login;