
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../data";
import toast from "react-hot-toast";
import { setLoading } from "../slices/authSlice";



function LoginForm() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  const handleOnSubmit = async(e) => {
    e.preventDefault();
    // dispatch(login(email, password, navigate));
    setLoading(true);
    try {
      const res = await axios.post ( `${BASE_URL}/users/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });
  
      console.log(res.data.data.user);
      if ( res.data.success) {
        setUser(res?.data?.data?.user);
        setEmail("");   
        setPassword("");
        toast.success("Login successful");
        navigate("/");
      }
      else {
        console.log("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed");
    }

    setLoading(false);

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
            <Link to={"/signin"} className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>
          {/* <div className=" flex gap-5 md:text-4xl text-2xl font-bold p-4 justify-center">
            <GoogleLogin 
            onSuccess={handleLoginWithGoogle}
            onError={() => { return toast.error("Google SignIn Failed")}}/>

          </div> */}
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
