import axios from "axios";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css"; 
import { Link, useNavigate } from "react-router-dom";

function Signupdup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    status:true,
    cart:[],
    order:[]
  };

  const navigate = useNavigate()
  
  const onSubmit = async (values) => {
    if (values.password !== values.cpassword) {
      console.log("Passwords do not match");
      
      return;
    }

    const responce = await axios.get("http://localhost:3008/user" )
    const users = responce.data
    const user =users.find((x) => x.email === values.email)
    if(user) {
    alert("alredy login")
    return ; 
    }
    
    
    try {
      console.log(values, "check");
      const response = await axios.post("http://localhost:3008/user", values);
      console.log("Successfully submitted", response.data);
      navigate("/login")
    } catch (error) {
      toast.error("🚨 Error creating account. Please try again.");
      console.error("Error during submission:", error);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  // /g
  return (
    <div className="flex items-center justify-start min-h-screen px-4"style={{
      backgroundImage: `url('https://img.freepik.com/free-photo/view-cats-dogs-showing-friendship_23-2151806307.jpg?t=st=1732356670~exp=1732360270~hmac=6f2850fe06bcd19906d2ad96e76d5dbde337de072705fc194207ede203140ad0&w=1380')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }} >
      <div className="max-w-xs p-6 bg-transparent rounded-lg h-100 w-150" >
        <h2 className="mb-6 text-2xl font-semibold text-center">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="username"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="cpassword"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
              <p>
                Have an Account?{" "}
                <Link className="link" to={"/login"}>
                  Please Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signupdup; 