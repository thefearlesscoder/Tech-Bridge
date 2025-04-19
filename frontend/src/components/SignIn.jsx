
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginWithGoogle = async (credentialResponse) => {
    if (credentialResponse?.credential) {
      console.log("Google Login Success:", credentialResponse);

      // Extract token
      let token = credentialResponse.credential;
      console.log(token);
     

      token = jwtDecode(token)
      console.log(token);

      const email = token.email;
      const name = token.name;
      const image = token.picture;
      const family_name = token.family_name;
      const given_name = token.given_name;
      const googleId = token.sub; // Google ID
      
      // Send token to backend for verification
      dispatch( googleLogin(email, family_name, given_name, image, navigate) );
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };


  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold">Login</h3>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 ">
              <input
                type="email"
                autoComplete="on"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-gray-300 ">
              <input
                type="password"
                autoComplete="on"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-md transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="mt-4 text-center">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>
          <div className=" flex gap-5 md:text-4xl text-2xl font-bold p-4 justify-center">
            <GoogleLogin 
            onSuccess={handleLoginWithGoogle}
            onError={() => { return toast.error("Google SignIn Failed")}}/>
            {/* <FaFacebook className="text-blue-400" /> */}
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
