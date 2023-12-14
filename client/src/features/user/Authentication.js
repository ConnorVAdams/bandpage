import React, {useState} from 'react'
import styled from "styled-components";
import { useFormik } from "formik"
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
    const [userType, setUserType] = useState('')
    const dispatch = useDispatch() 
    const navigate = useNavigate()

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
            name:'',
            genres:'',
            bio:'',
            location: '',
            img:''
        },
        // validationSchema: signUp ? signupSchema : loginSchema,
        onSubmit: async (values) => {
            const action = await dispatch(fetchRegister({url, values}))
            if (typeof action.payload !== "string") {
                toast.success(`Welcome ${action.payload.user.username}!`)
                const new_user_id = action.payload.user.id
                navigate('/artists/new')
                setToken(action.payload.jwt_token)
                setRefreshToken(action.payload.refresh_token)
                // navigate('/landing')

            } else {
                toast.error(action.payload)
            }
        }
    })
    
    const handleClick = () => {
        setSignUp((signUp) => !signUp)
        setUserType('')
    }

    const handleRegister = (e) => {
        setUserType(userType => e.target.id)
    }

    return (
        <> 
            <div id="register-switch">
                <h2>Please Log in or Sign up!</h2>
                <h3>{signUp ? 'Already a member?':'Not a member?'}</h3>
                <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>
                <h3>{signUp &&
                    <>
                        <button id={'artist'} onClick={handleRegister}>Register as Artist</button>
                        <button id={'fan'} onClick={handleRegister}>Register as Fan</button>
                    </>}
                </h3>

            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.email}</div> : null}
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
                <br/>
                {userType === 'artist' ? 
                    <>
                        <label htmlFor='genres'>Genres</label>
                        <input type='genres' name='genres' value={formik.values.genres} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.genres && formik.touched.genres ? <div className="error-message show">{formik.errors.genres}</div> : null}
                        <br/>
                    </> : 
                    null}

                {userType !== '' ? 
                    <>
                        {userType !== 'artist' ? <label htmlFor='name'>Name</label> : <label htmlFor='name'>Artist Name</label>}
                        <input type='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ? <div className="error-message show">{formik.errors.name}</div> : null}    
                    <br/>
                    <label htmlFor='bio'>Bio</label>
                    <input type='bio' name='bio' value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.bio && formik.touched.bio ? <div className="error-message show">{formik.errors.bio}</div> : null}
                    <br/>
                    <label htmlFor='location'>Location</label>
                    <input type='location' name='location' value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.location && formik.touched.location ? <div className="error-message show">{formik.errors.location}</div> : null}
                    <br/>
                    <label htmlFor='img'>Image</label>
                    <input type='img' name='img' value={formik.values.img} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.img && formik.touched.img ? <div className="error-message show">{formik.errors.img}</div> : null}
                    <br/>
                    
                    </> :  
                    null}
                    
            </form>
        </>
    )
}

export default Authentication