import React from "react"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import "./signupForm.css"

// Helper function for Netlify forms
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" id={props.id} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const Checkbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" })
  return (
    <>
      <label className="checkbox" htmlFor={props.id || props.name}>
        <input type="checkbox" id={props.id} {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select id={props.id} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        acceptedTerms: false, // added for checkbox
        jobType: "", // added for select
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(50, "Must be 50 characters or fewer")
          .required("Required"),
        lastName: Yup.string()
          .max(50, "Must be 50 characters or fewer")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        acceptedTerms: Yup.boolean()
          .required("Required")
          .oneOf([true], "You must accept the terms and conditions."),
        jobType: Yup.string()
          .required("Required")
          .oneOf(
            ["design", "development", "product", "other"],
            "Invalid job type"
          ),
      })}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "gatsbySignupForm", ...values }),
        })
          .then(() => {
            alert("Success")
            actions.resetForm()
          })
          .catch(() => {
            alert("Error")
          })
          .finally(() => actions.setSubmitting(false))
      }}
    >
      <Form
        name="gatsbySignupForm"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="gatsbySignupForm" />
        <TextInput
          label="First Name"
          name="firstName"
          type="text"
          id="firstName"
          placeholder="Your First Name"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          type="text"
          id="lastName"
          placeholder="Your Last Name"
        />
        <TextInput
          label="Email Address"
          name="email"
          type="email"
          id="email"
          placeholder="Don't say yahoo"
        />
        <Select label="Job Type" name="jobType" id="jobType">
          <option value="">Select a job type</option>
          <option value="design">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </Select>
        <Checkbox name="acceptedTerms" id="acceptedTerms">
          I accept the terms and conditions
        </Checkbox>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default SignupForm
