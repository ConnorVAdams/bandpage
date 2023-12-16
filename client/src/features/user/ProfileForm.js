import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Formik, Form } from 'formik'
// import artistFormSchema from './artistFormSchema'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { fetchPostArtist, fetchPatchArtist } from '../artist/artistSlice'
import { setUserType } from './userSlice'
import { fetchPostFan } from '../fan/fanSlice'
import { useDispatch } from 'react-redux'

const ProfileForm = () => {
    const acct = useSelector(state => state.user.data)
    const user = acct.artist || acct.fan
    console.log(acct.id)

    const path = useLocation().pathname

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    let initialValues

    if (path.includes('edit')) {
        initialValues = {
            name: user.name,
            genres: user.genres,
            bio: user.bio,
            location: user.location,
            img: user.img,
            user_id: acct.user_id
        }
    } else {
        initialValues = {
            name: '',
            genres:'',
            bio:'',
            location: '',
            img:'',
            user_id: acct.id
        }
    }
    // {debugger}
    const formik = useFormik({
        initialValues: initialValues
        ,
        // validationSchema: null,
        onSubmit: async (values, event) => {
            if (path.includes('edit')) {
                const action = await dispatch(fetchPatchArtist({user, values}))
                if (typeof action.payload !== "string") {
                    toast.success(`Patched ${action.payload}!`)
                    console.log(action.payload)
                    dispatch(setUserType(action.payload))
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }
            }

            else if (path.includes('artist')) {
                const action = await dispatch(fetchPostArtist(values))
                if (typeof action.payload !== "string") {
                    toast.success(`Loaded ${action.payload}!`)
                    dispatch(setUserType(action.payload))
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }

            } else { // if (path.includes('fan'))
                const action = await dispatch(fetchPostFan(values))
                if (typeof action.payload !== "string") {
                    toast.success(`Loaded ${action.payload}!`)
                    dispatch(setUserType(action.payload))
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }
            }
        }
    })
    
    return (
        <form onSubmit={formik.handleSubmit}>
            {path.includes('artist') ? 
            <>
                <label htmlFor='genres'>Genres</label>
                <input type='genres' name='genres' value={formik.values.genres} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.genres && formik.touched.genres ? <div className="error-message show">{formik.errors.genres}</div> : null}
                <br/>
            </> : 
            null}


                {!path.includes('artist') ? <label htmlFor='name'>Name</label> : <label htmlFor='name'>Artist Name</label>}
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
            <input type='submit' value='Submit!'/>
            </form>
    )
}

export default ProfileForm