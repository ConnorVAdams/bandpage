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
        <>
        <Container fluid>
        <Container>
        <Row className="justify-content-center mt-5 invisible">
            <Col md={6} className="bg-dark p-4 rounded shadow invisible">
                <Container id="title" className="visible rounded-pill border p-4 text-center text-warning mb-4" style={{ width: '85%'}}>
                <h2>Welcome to BandPage</h2>
                <h4>Please log in or sign up!</h4>
                </Container>
                <Col xs={8} className="visible rounded-pill border p-4 mb-4 mx-8" style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="text-center text-warning px-4 mx-8">
                    <h3>{signUp ? 'Already a member?' : 'Not a member?'}</h3>
                    <div
                    className="d-inline-block p-2 rounded-pill shadow"
                    onClick={handleClick}
                    style={{ cursor: 'pointer', background: '#34ce2c' }}
                    >
                    <span className="text-white p-2">{signUp ? 'Log In!' : 'Register now!'}</span>
                    </div>
                </div>
                </Col>
                <Container className="visible rounded-pill border p-4 mb-4">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="justify-content-center" style={{paddingTop: '25px'}}>
                    <Col xs={12} md={8} className="text-center">
                        <Form.Group controlId="username">
                        <Form.Label className="custom-text">Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-secondary text-white rounded rounded-pill"
                        />
                        {formik.errors.username && formik.touched.username ? (
                            <div className="text-danger">{formik.errors.username}</div>
                        ) : null}
                        </Form.Group>
                        <Form.Group controlId="password">
                        <Form.Label className="custom-text">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="bg-secondary text-white rounded rounded-pill"
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                        {signUp && (
                            <Form.Text muted className="custom-text">
                            Password must contain one lowercase letter, one uppercase letter, one digit, and one
                            special character, and be 8 or more characters.
                            </Form.Text>
                        )}
                        </Form.Group>
                        {signUp && (
                        <>
                            <Form.Group controlId="userType">
                            <Form.Label className="custom-text rounded-pill">User Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="userType"
                                value={formik.values.userType}
                                onChange={handleUserTypeChange}
                                onBlur={formik.handleBlur}
                                className="bg-secondary text-white rounded"
                            >
                                <option value="">Select</option>
                                <option value="artist">Artist</option>
                                <option value="fan">Fan</option>
                            </Form.Control>
                            {formik.errors.userType && formik.touched.userType ? (
                                <div className="text-danger">{formik.errors.userType}</div>
                            ) : null}
                            </Form.Group>
                        </>
                        )}

                    </Col>
                    </Row>
                    <Col xs={8} className="visible rounded-pill p-4 mb-1 mx-8" style={{ paddingLeft: '20px', paddingRight: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="text-center text-warning px-4 mx-8">
                        <div
                        type='submit'
                        className="d-inline-block p-2 rounded-pill shadow"
                        onClick={handleClick}
                        style={{ cursor: 'pointer', background: '#34ce2c' }}
                        >
                        <span className="text-white p-2">{!signUp ? 'Log In' : 'Register'}</span>
                        </div>
                    </div>
                    </Col>

                    {/* <Button
                        type="submit"
                        variant="primary"
                        className="rounded-pill p-2 shadow"
                        style={{ cursor: 'pointer', background: '#34ce2c'}}
                    >
                        {<span className="text-white p-2">{!signUp ? 'Log In' : 'Register'}</span>}
                    </Button> */}
                </Form>
                </Container>
    
                {/* {!signUp && (
                <Container className="text-center">
                    <Button
                    type="submit"
                    variant="primary"
                    className="rounded-pill p-2 shadow"
                    style={{ cursor: 'pointer', background: '#34ce2c' }}
                    >
                    <span className="text-white p-2">Log In!</span>
                    </Button>
                </Container>
                )} */}
            </Col>
            </Row>
        </Container>
    </Container>
    </>
    )
}

export default Authentication