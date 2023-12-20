import * as yup from "yup"

export const signUpSchema = () => {

    return yup.object().shape({
        username: yup
        .string()
        .min(8, 'Username must be between 8 and 12 characters.')
        .max(12, 'Username must be between 8 and 12 characters.')
        .required("Please enter a username."),
        password: yup
        .string()
        .required('Please enter a user password.') 
        .matches(/[a-z]/, 'Must contain at least one lowercase letter.')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter.')
        .matches(/\d/, 'Must contain at least one digit.')
        .matches(/[@$!%*?&]/, 'Must contain at least one special character.')
        .matches(/[A-Za-z\d@$!%*?&]{8,}/, 'Must be at least 8 characters long.')
        .required('Password is required.'),
        userType: yup
        .string('User Type is required.')
        .min(1, 'User Type is required.')
        .required('User Type is required.')
    });
};

export const loginSchema = yup.object().shape({
    username: yup.string()
    .required("Please enter a username."),
    password: yup.string()
    .required('Please enter a password.') 
})

