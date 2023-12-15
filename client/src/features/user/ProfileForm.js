import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Formik, Form } from 'formik'
// import artistFormSchema from './artistFormSchema'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { fetchPostArtist } from '../artist/artistSlice'
import { useDispatch } from 'react-redux'

const ProfileForm = () => {
    const user = useSelector(state => state.user.data)
    const artist = useLocation().pathname.includes('artist')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues: {
            name: '',
            genres:'',
            bio:'',
            location: '',
            img:'',
            user_id: user.id
        },
        // validationSchema: null,
        onSubmit: async (values, event) => {
            const action = await dispatch(fetchPostArtist(values))
            if (typeof action.payload !== "string") {
                toast.success(`Loaded ${action.payload}!`)
                
                navigate('/landing')


            } else {
                toast.error(action.payload)
            }
        }
    })
    
    return (
        <form onSubmit={formik.handleSubmit}>
            {artist ? 
            <>
                <label htmlFor='genres'>Genres</label>
                <input type='genres' name='genres' value={formik.values.genres} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.genres && formik.touched.genres ? <div className="error-message show">{formik.errors.genres}</div> : null}
                <br/>
            </> : 
            null}


                {artist ? <label htmlFor='name'>Name</label> : <label htmlFor='name'>Artist Name</label>}
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