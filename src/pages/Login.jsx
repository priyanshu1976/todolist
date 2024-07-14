import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  return <Example />;
}

export default Login;

function Example() {
  const [userData, setUserData] = useState({
    userEmail: "",
    userPass: "",
  });
  const [bool, islogin] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.userEmail,
        userData.userPass
      );
      const user = userCredential.user;
      islogin(!bool);
    } catch (error) {
      // Handle login error
      alert("Incorrect email or password. Please try again.");
    }
  }
  if (bool) {
    return <Outlet />;
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://img.icons8.com/cute-clipart/64/pencil.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="email"
                name="userEmail"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="password"
                name="userPass"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/createaccount"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}
