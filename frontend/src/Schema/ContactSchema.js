import * as yup from 'yup'

const contactSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    email: yup.string().required("Email is required.").email("Invalid email."),
    address: yup.string().required("Address is required."),
    phone: yup.string().required("Phone is required."),
    age: yup.number("Age is required").required("Age is required."),
    occupation: yup.string().required("Occupation is required."),
})

export default contactSchema