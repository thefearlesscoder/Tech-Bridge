import axios from "axios"
import { useDispatch } from "react-redux"

const dispatch = useDispatch()

export function login(
    email,
    password,
    navigate
  ) {
    //   const navigate = useNavigate() ;
    return async (dispatch) => {
  
      dispatch(setLoading(true))
      try {
        const res = await axios.post ( `${BASE_URL}/users/login`, {
            email,
            password,
          }, {
            withCredentials: true,
          });
  
        console.log("LOGIN API RESPONSE...¸č.........", response)
        response = response?.data
        console.log("LOGIN API RESPONSE...¸č.........", response)
  
        if (!response?.success) {
          toast(response?.message)
          throw new Error(response?.message)
        } else {
          dispatch(setUser(res?.data?.data?.user));
          dispatch(setToken(res?.data?.data?.accessToken));
        localStorage.setItem("token", res?.data?.data?.accessToken);
        localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          toast.success("Login Successful")
          navigate("/dashboard")
        }
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        // toast.error()
        navigate("/login")
      }
      dispatch(setLoading(false))
  
    }
  }