import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import "./signupForm.css"

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "" },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(50, "Must be 50 characters or fewer")
        .required("Required"),
      lastName: Yup.string()
        .max(50, "Must be 50 characters or fewer")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input name="firstName" {...formik.getFieldProps("firstName")} />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}
      <label htmlFor="lastName">Last Name</label>
      <input name="lastName" {...formik.getFieldProps("lastName")} />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}
      <label htmlFor="email">Email Address</label>
      <input name="email" {...formik.getFieldProps("email")} />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default SignupForm

/*
// Manual validation
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = "Required"
  } else if (values.firstName.length > 100) {
    errors.firstName = "Must be 100 characters or less"
  }

  if (!values.lastName) {
    errors.lastName = "Required"
  } else if (values.lastName.length > 100) {
    errors.lastName = "Must be 100 characters or less"
  }

  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  return errors
}
*/
