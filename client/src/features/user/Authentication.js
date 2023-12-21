import React, {useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from './userSlice'
import { setToken, setRefreshToken } from '../../utils/main';
import toast from 'react-hot-toast';
import { Form, Button, Col, Container, Row } from 'react-bootstrap'
import { signUpSchema, loginSchema } from './authFormSchema'


function Authentication() {

    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    
    const url = signUp ? "/signup" : "/login"

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            userType: '',
        },
        validationSchema: signUp ? signUpSchema : loginSchema,
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
                let error_msg = ''
                if (action.payload.includes('UNIQUE constraint failed')) {
                    error_msg = "Username already exists. Please choose a different username."
                } else {
                    error_msg = 'Username or password incorrect.'
                }
                toast.error(error_msg)
            }
        }
    })
    
    const handleClick = () => {
        setSignUp((signUp) => !signUp)
    }

    const handleUserTypeChange = (e) => {
        // setUserTypeVal(e.target.value)
        formik.handleChange(e)
    }

    return (
<Container className='invisible' style={{ maxHeight: '100vh' }}>
  <Row className="justify-content-center mt-5">
    <Col md={6} className="bg-dark p-4 rounded shadow">
      <Container id="title" className="visible shadow-lg rounded-pill p-4 text-center text-warning mb-4" style={{ background: '#3b3b3b', width: '70%' }}>
        <h2 style={{ color: 'white' }}>Welcome to BandPage</h2>
        <h4 className='custom-text'>Please log in or sign up!</h4>
      </Container>
      <Col xs={12} className="visible rounded-pill p-4 mb-4 mx-8 shadow" style={{ background: '#3b3b3b', paddingLeft: '20px', paddingRight: '20px', marginLeft: 'auto', marginRight: 'auto', width: '55%' }}>
        <div className="text-center text-warning px-4 mx-8" >
          <h3 style={{ color: 'white' }}>{signUp ? 'Already a member?' : 'Not a member?'}</h3>
          <div
            className="d-inline-block p-2 rounded-pill shadow"
            onClick={handleClick}
            style={{ cursor: 'pointer', background: '#34ce2c' }}
          >
            <span className="text-white p-2">{signUp ? 'Log In!' : 'Register now!'}</span>
          </div>
        </div>
      </Col>
      <Container
        className="visible shadow-lg rounded-pill p-4 mb-4"
        style={{
          background: '#3b3b3b',
          width: '95%',
          marginTop: !signUp ? 'auto' : '0',
          marginBottom: !signUp ? 'auto' : '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Row className="justify-content-center" style={{ paddingTop: '25px' }}>
            <Col xs={12} md={8} className="text-center">
              <Form.Group controlId="username" className="shadow">
                <Form.Label className="custom-text">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow-lg bg-secondary text-white rounded rounded-pill"
                />
                {formik.errors.username && formik.touched.username ? (
                  <div className="text-danger shadow">{formik.errors.username}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="password" className="shadow">
                <Form.Label className="custom-text">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-secondary text-white rounded rounded-pill shadow"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-danger shadow">{formik.errors.password}</div>
                ) : null}
                {signUp && (
                  <Form.Text muted className="custom-text shadow" style={{ opacity: '50%' }}>
                    Password must contain one lowercase letter, one uppercase letter, one digit, and one special character, and be 8 or more characters.
                  </Form.Text>
                )}
              </Form.Group>
              {signUp && (
                <Form.Group controlId="userType" className="shadow">
                  <Form.Label className="custom-text rounded-pill">User Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    value={formik.values.userType}
                    onChange={handleUserTypeChange}
                    onBlur={formik.handleBlur}
                    className="bg-secondary text-white rounded shadow"
                  >
                    <option value="">Select</option>
                    <option value="artist">Artist</option>
                    <option value="fan">Fan</option>
                  </Form.Control>
                  {formik.errors.userType && formik.touched.userType ? (
                    <div className="text-danger shadow">{formik.errors.userType}</div>
                  ) : null}
                </Form.Group>
              )}
            </Col>
          </Row>
          <Col xs={8} className="visible rounded-pill p-4 mb-1 mx-8" style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="text-center text-warning px-4 mx-8">
              <Button
                type='submit'
                className="d-inline-block p-2 rounded-pill shadow"
                style={{ cursor: 'pointer', background: '#34ce2c', border: 'none' }}
              >
                <span className="text-white p-2">{!signUp ? 'Log In' : 'Register'}</span>
              </Button>
            </div>
          </Col>
        </Form>
      </Container>
    </Col>
  </Row>
</Container>
    )
}

export default Authentication