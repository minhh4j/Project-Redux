
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "../Context/AdminContext";

function LoginForm() {
  
  const {adminLogin} = useContext(AdminContext)
  const initialValues = {
    email: "",
    password: "",
  };


  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.get("http://localhost:3008/user");
      const users = response.data || [];
      const user = users.find(
        (x) => x.email === values.email && x.password === values.password
      );
      

     
        if(user.email === "admin@gmail.com"){
          adminLogin()
          // navigate("/adminpage")
          return
        }
        if (user.status === true) {
        localStorage.setItem("id",user.id)
        localStorage.setItem("username", user.username);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/"),
        });
      }
      else if(user.status === false){
        toast.error("Your Accound Has Been Blocked"); 
      }
      else {
        setErrors({ login: "Invalid email or password" });
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ login: "Something went wrong. Please try again later." });
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }; 
  

  


  useEffect(() => {
    toast.info("Please login with your credentials", {
      position: "top-center",
      autoClose: 3000,
    });
  }, []);

  return (
    <div
  className="flex items-center justify-center min-h-screen"
  style={{
    backgroundImage: `url('https://img.freepik.com/free-photo/view-cats-dogs-showing-friendship_23-2151806300.jpg?t=st=1732357015~exp=1732360615~hmac=586f4bdae6736e8e5b291a630114fca5b4ed5544af861e1c27c33790d94c11de&w=1380')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}
>
      <div className="w-full sm:w-96">
        <div className="p-6 bg-transparent rounde-lg bg-whit">
          <ToastContainer />
          <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>

                {errors.login && (
                  <div className="mb-3 text-xs text-red-500">
                    {errors.login}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Submit"}
                  </button>
                </div>

                <p className="mt-3 text-sm text-center">
                  No Account?{" "}
                  <Link className="text-blue-500 hover:underline" to={"/signin"}>
                    Create Account
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;