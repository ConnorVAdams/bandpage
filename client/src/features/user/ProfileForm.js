import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
// import { ErrorMessage, Field, Formik, Form } from 'formik'
// import artistFormSchema from './artistFormSchema'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { fetchPostArtist, fetchPatchArtist } from '../artist/artistSlice'
import { fetchCurrentUser, setUser, setUserType } from './userSlice'
import { fetchPostFan } from '../fan/fanSlice'
import { useDispatch } from 'react-redux'
import profFormSchema from './profFormSchema'

const ProfileForm = () => {
    const acct = useSelector(state => state.user.data)
    const user = acct.artist || acct.fan

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

    const formik = useFormik({
        initialValues: initialValues
        ,
        validationSchema: profFormSchema,
        onSubmit: async (values, event) => {
            if (path.includes('edit')) {
                const action = await dispatch(fetchPatchArtist({user, values}))
                if (typeof action.payload !== "string") {
                    dispatch(fetchCurrentUser())
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }
            }

            else if (path.includes('artist')) {
                const action = await dispatch(fetchPostArtist(values))
                if (typeof action.payload !== "string") {
                    toast.success(`Loaded new artist!`)
                    dispatch(setUserType(action.payload))
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }

            } else { // if (path.includes('fan'))
                const action = await dispatch(fetchPostFan(values))
                if (typeof action.payload !== "string") {
                    dispatch(setUserType(action.payload))
                    navigate('/landing')
                } else {
                    toast.error(action.payload)
                }
            }
        }
    })
    
    return (
<Container style={{ maxHeight: '100vh' }}>
  <h1 
    className='visible rounded-pill mb-1 mx-8'
    style={{
        backgroundColor: '#FFB120',
        color: 'white',
        padding: '10px',
        width: '30vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2vh',
        }}>
    {path.includes('new') ? `NEW ${path.includes('artist') ? 'ARTIST' : 'FAN'}` : 'EDIT PROFILE'}</h1>
  <Row style={{ marginTop: '2vh' }}className="justify-content-md-center">
    <Col md={6} className="bg-dark p-4 rounded shadow">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label style={{ color: 'white' }}>{path.includes('artist') ? 'Artist Name' : 'Name'}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-secondary text-white rounded shadow"
          />
          {formik.errors.name && formik.touched.name && (
            <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
          )}
        </Form.Group>

        {path.includes('artist') && (
          <>
            <Form.Group controlId="genres">
              <Form.Label style={{ color: 'white' }}>Genres</Form.Label>
              <Form.Control
                type="text"
                name="genres"
                value={formik.values.genres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-secondary text-white rounded shadow"
              />
              {formik.errors.genres && formik.touched.genres && (
                <Form.Text className="text-danger">{formik.errors.genres}</Form.Text>
              )}
            </Form.Group>
          </>
        )}

        <Form.Group controlId="bio">
          <Form.Label style={{ color: 'white' }}>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-secondary text-white rounded shadow"
          />
          {formik.errors.bio && formik.touched.bio && (
            <Form.Text className="text-danger">{formik.errors.bio}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label style={{ color: 'white' }}>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-secondary text-white rounded shadow"
          />
          {formik.errors.location && formik.touched.location && (
            <Form.Text className="text-danger">{formik.errors.location}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="img">
          <Form.Label style={{ color: 'white' }}>Image</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-secondary text-white rounded shadow"
          />
          {formik.errors.img && formik.touched.img && (
            <Form.Text className="text-danger">{formik.errors.img}</Form.Text>
          )}
        </Form.Group>

        <Col xs={8} className="visible rounded-pill mb-1 mx-8" style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="text-center text-warning px-4 mx-8">
              <Button
                type='submit'
                className="d-inline-block p-2 rounded-pill shadow"
                style={{ cursor: 'pointer', background: '#FFB120', border: 'none' }}
              >
                <span className="text-white p-2">Register</span>
              </Button>
            </div>
        </Col>
      </Form>
    </Col>
  </Row>
</Container>
    )
}

export default ProfileForm