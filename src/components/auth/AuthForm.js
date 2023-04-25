import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

// This goes to our signup API endpoint
async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

// This gets handled by the [...nextauth] endpoint
function AuthForm() {
  const [registered, setRegistered] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // We keep track of whether in a login / or register state
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation here

    if (isLogin) {
      await signIn("credentials", {
        redirect: "/",
        email: enteredEmail,
        password: enteredPassword,
      });
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        setRegistered(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="max-w-xl mx-auto my-7">
      {!registered ? (
        <>
          <div className="text-center">
            <h1 className="text-blueGray-500 font-bold">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
              />
            </div>
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
              />
            </div>
            <div className="text-center mt-6">
              <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
            {/* <div className="text-center mt-6">
              <button
                type="button"
                onClick={switchAuthModeHandler}
                className="text-blueGray-700"
              >
                {isLogin ? "No Account? Create One" : "Already a user? Login"}
              </button>
            </div> */}
          </form>
        </>
      ) : (
        <div className="">
          <p>You have successfully registered!</p>

          <button
            onClick={() => router.reload()}
            className="button button-color"
          >
            Login Now
          </button>
        </div>
      )}
    </section>
  );
}

export default AuthForm;
