import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import React from "react";
import { BASE_URL } from "../../../lib/constant";
import { ToastContainer, toast } from 'react-toastify';

// initialValues
const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: ""
}

// validationSchema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required your email"),
  firstName: Yup.string().required("Required your first name"),
  lastName: Yup.string().required("Required your last name"),
  password: Yup.string().min(6, "Password at last 6 charater").required("Required your password"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("confirm Password is Required")
})

export default function Register() {
  const notify = () => toast("Wow so easy!");
    // handle register
    const handleRegister = async (values) => {
      console.log(values);
      const reponse = await fetch(`${BASE_URL}user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const data = await reponse.json();
      console.log(data);
    };

  return (
    <section className="h-screen flex justify-center items-center flex-col">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(value) => {
          console.log(value);
          handleRegister(value);
        }}
      >
        <Form className="w-1/2 bg-slate-100 p-5 rounded-md">
          <h2 className="text-3xl text-center font-bold text-blue-600 mb-5">register</h2>
          <div>
            <label htmlFor="email" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Email</label>
            <Field type="email" id="email" name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <ErrorMessage component="div" name="email" className="text-red-700" />
          </div>

          <div className="mt-3">
            <label htmlFor="firstName" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >First Name</label>
            <Field type="firstName" id="firstName" name="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <ErrorMessage component="div" name="firstName" className="text-red-700" />
          </div>

          <div className="mt-3">
            <label htmlFor="lastName" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Last Name</label>
            <Field type="lastName" id="lastName" name="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <ErrorMessage component="div" name="lastName" className="text-red-700" />
          </div>

          <div className="mt-3">
            <label htmlFor="password" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password</label>
            <Field type="password" id="password" name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <ErrorMessage component="div" name="password" className="text-red-700" />
          </div>

          <div className="mt-3">
            <label htmlFor="confirmPassword" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <ErrorMessage component="div" name="confirmPassword" className="text-red-700" />
          </div>

          <div className="flex justify-end mt-5">
          <button type="submit" onClick={notify} class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
          <ToastContainer />
          </div>
        </Form>      
      </Formik>
    </section>
  );
}
