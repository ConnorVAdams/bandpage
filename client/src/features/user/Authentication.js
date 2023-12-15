import React, {useState} from 'react'
import styled from "styled-components";
import { useFormik } from 'formik'
import * as yup from "yup"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from './userSlice'
import { fetchAllArtists, fetchPostArtist } from '../artist/artistSlice';
import { setToken, setRefreshToken } from '../../utils/main';
import toast from 'react-hot-toast';

function Authentication() {
    // Conditionally render either signup or login option 
    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch() 
    const navigate = useNavigate()

    // const signupSchema = yup.object().shape({
    //     username: yup.string()
    //     .required("Please enter a user name"),
    //     password: yup.string()
    //     .required('Please enter a user password') 
    //     .min(8, 'Password is too short - should be 8 chars minimum.')
    //     .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.')
    // })
    // const loginSchema = yup.object().shape({
    //     username: yup.string()
    //     .email("Must be a valid email")
    //     .required("Please enter a user email"),
    //     password: yup.string()
    //     .required('Please enter a user password') 
    // })
    const url = signUp ? "/signup" : "/login"

    const formik = useFormik({
        initialValues: {
            username:'',
            password:'',
            userType:'',
        },
        // validationSchema: signUp ? signupSchema : loginSchema,
        onSubmit: async (values, event) => {
            const action = await dispatch(fetchRegister({url, values}))
            if (typeof action.payload !== "string") {
                toast.success(`Welcome ${action.payload.user.username}!`)
                setToken(action.payload.jwt_token)
                setRefreshToken(action.payload.refresh_token)
                if (signUp) {
                    navigate(`${values.userType}s/new`)
                } else {
                    navigate('/landing')
                }

            } else {
                toast.error(action.payload)
            }
        }
    })
    
    const handleClick = () => {
        setSignUp((signUp) => !signUp)
    }

    return (
        <> 
            <div id="register-switch">
                <h2>Please Log in or Sign up!</h2>
                <h3>{signUp ? 'Already a member?':'Not a member?'}</h3>
                <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>

            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.email}</div> : null}
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                {signUp ?
                <>
                    <label htmlFor='userType'>User Type:</label>
                    <select id="userType" name='userType' value={formik.values.userType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option value="">Select</option>
                        <option value="artist">Artist</option>
                        <option value="fan">Fan</option>
                    </select>
                    {formik.errors.userType && formik.touched.userType ? <div className="error-message show">{formik.errors.userType}</div> : null}
                    <button type='submit' value='Register'>Register</button>
                </>
                :
                <input type='submit' value='Log In!'/>}
                    
            </form>
        </>
    )
}

export default Authentication