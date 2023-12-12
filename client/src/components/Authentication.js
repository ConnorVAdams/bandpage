import React, {useState} from 'react'
import styled from "styled-components";
import { useFormik } from "formik"
import * as yup from "yup"
import {useDispatch} from 'react-redux'
import {fetchRegister} from './userSlice'
import { fetchAllProductions } from '../production/productionSlice';
import { setToken, setRefreshToken } from '../../utils/main';
import toast from 'react-hot-toast';

function Authentication() {
    // Conditionally render either signup or login option 

    // If signup:
        // Offer artist or fan signup:
            // If artist:
                // Step through form to input artist info
                // POST new artist to db
                // Load new artist to client as current user
                // Navigate user to /landing

            // If fan:
                // Step through form to input artist info
                // POST new fan to db
                // Load new fan to client as current user
                // Navigate user to /landing
    
        // If login:
            // POST new artist or fan obj to db
            // Load new artist or fan to client as current user
            // Navigate user to /landing

    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch()

    const signupSchema = yup.object().shape({
        username: yup.string()
        .required("Please enter a user name"),
        password: yup.string()
        .required('Please enter a user password') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.')
    })
    const loginSchema = yup.object().shape({
        username: yup.string()
        .email("Must be a valid email")
        .required("Please enter a user email"),
        password: yup.string()
        .required('Please enter a user password') 
    })
    const url = signUp ? "/signup" : "/login"
    
    const formik = useFormik({
        initialValues: {
            username:'',
            email:'',
            password:''
        },
        validationSchema: signUp ? signupSchema : loginSchema,
        onSubmit: async (values) => {
            const action = await dispatch(fetchRegister({url, values}))
            if (typeof action.payload !== "string") {
                toast.success(`Welcome ${action.payload.user.username}!`)
                setToken(action.payload.jwt_token)
                setRefreshToken(action.payload.refresh_token)
                dispatch(fetchAllProductions())
            } else {
                toast.error(action.payload)
            }
        }
    })
    
    const handleClick = () => setSignUp((signUp) => !signUp)

    return (
        <> 
            {/* <div id="register-switch">
                <h2>Please Log in or Sign up!</h2>
                <h3>{signUp?'Already a member?':'Not a member?'}</h3>
                <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email ? <div className="error-message show">{formik.errors.email}</div> : null}
                {signUp &&(
                    <>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                    </>
                )}
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
            </Form> */}
        </>
    )
}
