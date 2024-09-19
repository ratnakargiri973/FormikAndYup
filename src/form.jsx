import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import img from "./assets/img.webp";
import './form.css';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function form() {
  return (
    <div id="form_container">
      <div id="form_input">
        <h1>Welcome!</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form data:", values);
          }}
        >
          {({ isValid, dirty, errors, touched }) => (
            <Form id="form">
              <div id="input_div">
                <label htmlFor="name">NAME</label>
                <Field name="name">
                  {({ field }) => (
                    <div className="input-container">
                      <input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className={`input-field ${touched.name && errors.name ? "input-error" : ""}`}
                      />
                      {touched.name && errors.name && (
                        <div className="error-message">{errors.name}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div id="input_div">
                <label htmlFor="email">EMAIL</label>
                <Field name="email">
                  {({ field }) => (
                    <div className="input-container">
                      <input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`input-field ${touched.email && errors.email ? "input-error" : ""}`}
                      />
                      {touched.email && errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div id="input_div">
                <label htmlFor="password">PASSWORD</label>
                <Field name="password">
                  {({ field }) => (
                    <div className="input-container">
                      <input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className={`input-field ${touched.password && errors.password ? "input-error" : ""}`}
                      />
                      {touched.password && errors.password && (
                        <div className="error-message">{errors.password}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div id="input_div">
                <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <div className="input-container">
                      <input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className={`input-field ${touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}`}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="error-message">{errors.confirmPassword}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <button type="submit"
                className={`button ${isValid && dirty ? "button-enabled" : "button-disabled"}`}
                disabled={!(isValid && dirty)}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div id="img">
        <img src={img} alt="form illustration" />
      </div>
    </div>
  );
}

export default form;