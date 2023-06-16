import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import config from "../../config";

export default function verify() {
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState("");
  const [typealert, setTypeAlert] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const [auth_token, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (otp === "") {
      setTypeAlert("error");
      setAlert("Please enter your OTP");
    } else {
      setLoading(true);
      axios
        .post(`${config.apiURL}verify_otp/`, { otp, token })
        .then((res) => {
          if (res.status === 200) {
            // OTP verification successful
            setLoading(false);
            setTypeAlert("success");
            setAlert("OTP verification successful");
            // Redirect the user to the desired page
            router.push("/createroom");
          } else {
            // OTP verification failed
            setLoading(false);
            setTypeAlert("error");
            setAlert("Invalid OTP");
          }
        })
        .catch((err) => {
          setLoading(false);
          setTypeAlert("error");
          setAlert("Something went wrong");
          console.error(err);
        });
    }
  };

  return (
    <>
      {loading && <Spinner />}

      {alert && <Alert typeAlert={typealert} message={alert} />}

      <motion.div
        style={{ zIndex: -1 }}
        className="flex items-center justify-center min-h-screen"
        initial={{
          opacity: 0,
          translateY: "100vh",
        }}
        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <input
            className="bg-offBlack rounded-[10px] p-3"
            type="password"
            placeholder="Please enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="bg-primary hover:bg-offPrimary hover:scale-[100.5%] ease-in-out duration-100 text-white rounded-[12px] px-3 py-2 font-bold w-20 mt-5"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </motion.div>
    </>
  );
}
