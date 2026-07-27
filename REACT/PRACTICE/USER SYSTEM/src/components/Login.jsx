const Login = () => {
  return (
    <>
      <h2>LOGIN</h2>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>User ID :</label>
            <input type="text" placeholder="Enter Your User-ID" />
          </div>
          <div>
            <label>Password :</label>
            <input type="password" placeholder="Enter Your Password" />
          </div>
          <button>Login</button>
          <p>No Registration- Registration</p>
        </form>
        <from>
            <div>
                <label>Name :</label>
                <input type="text" placeholder="Enter Your Name" />
            </div>
             <div>
                <label>E-Mail :</label>
                <input type="email" placeholder="Enter Your E-Mail" />
            </div>
             <div>
                <label>Password :</label>
                <input type="password" placeholder="Enter Your Password" />
            </div>
             <div>
                <label>Confirm Password :</label>
                <input type="password" placeholder="Confirm Your Password" />
            </div>
             <div>
                <label>Contact Number :</label>
                <input type="number" placeholder="Enter Your contact Number" />
            </div>
             <div>
                <label>DOB :</label>
                <input type="date" placeholder="Enter Your DOB" />
            </div>
             <div>
                <label>Gender :</label>
                <input type="radio" placeholder="Enter Your Gender" />
            </div>
        </from>
      </div>
    </>
  );
};

export default Login;
