// import { useState, useEffect } from 'react'
// import { ErrorMessage, Field, Formik, Form } from 'formik'
// // import artistFormSchema from './artistFormSchema'
// import { Container, Row, Col, Button } from 'react-bootstrap'

// const ArtistForm = () => {
//     // const [venues, setVenues] = useState([])
//     // const [artists, setArtists] = useState([])
//     // const [newArtist, setNewArtist] = useState(false)

//     // const [showModal, setShowModal] = useState(false);

//     // const handleClose = () => {
//     //     setShowModal(false);
//     // };

//     // useEffect(() => {
//     //     const fetchVenues = async () => {
//     //         try {
//     //             const response = await fetch('/api/v1/venues')
//     //             if (response.ok) {
//     //                 const data = await response.json()
//     //                 setVenues(data)

//     //             } else {
//     //                 console.error('Response not ok:', response.status)
//     //             }
//     //         } catch (error) {
//     //             console.error('Failed to fetch venues:', error)
//     //         }
//     //     }

//     //     fetchVenues()
//     // }, [])

//     // useEffect(() => {
//     //     const fetchArtists = async () => {
//     //         try {
//     //             const response = await fetch('/api/v1/artists')
//     //             if (response.ok) {
//     //                 const data = await response.json()
//     //                 setArtists(data)
//     //             } else {
//     //                 console.error('Response not ok:', response.status)
//     //             }
//     //         } catch (error) {
//     //             console.error('Failed to fetch artists:', error)
//     //         }
//     //     }

//     //     fetchArtists()
//     // }, [])

//     return (
//         <Container className='my-5'>
//             <Formik
//                 initialValues={{
//                     date: '',
//                     time: '',
//                     price: '',
//                     artist_id: '',
//                     venue_id: '',
//                     tix_low: 0,
//                     sold_out: 0,
//                     artist_name: '',
//                     artist_genre: '',
//                     artist_description: ''
//                 }}
//                 // validationSchema={concertFormSchema(newArtist)}
//                 onSubmit={async (values, { resetForm }) => {
//                     values.date_time = `${values.date} ${values.time}`
//                     values.price = Number(values.price)
//                     values.artist_id = Number(values.artist_id)
//                     values.venue_id = Number(values.venue_id)
//                     values.tix_low = Number(values.tix_low)
//                     values.sold_out = Number(values.sold_out)

//                     delete values.date
//                     delete values.time

//                     if (!newArtist) {
//                         delete values.artist_name
//                         delete values.artist_genre
//                         delete values.artist_description

//                         try {
//                             const response = await fetch('/api/v1/concerts', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: JSON.stringify(values),
//                             })
                
//                             if (response.ok) {
//                                 console.log('Form submitted successfully:', response.status);
//                                 setShowModal(true);
//                                 resetForm()
//                                 setNewArtist(false)
//                             } else {
//                                 console.error('Response not ok:', response.status);
//                             }
//                         } catch (error) {
//                             console.error('Error submitting form:', error);
//                         }
//                     } 
//                     else {
//                         try {
//                             const response = await fetch('/api/v1/concert_and_artist', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                 },
//                                 body: JSON.stringify(values),
//                             })
                            
//                             if (response.ok) {
//                                 console.log('Form submitted successfully:', response.status);
//                                 setShowModal(true);
//                                 resetForm()
//                                 setNewArtist(false)
//                             } else {
//                                 console.error('Response not ok:', response.status);
//                             }
//                         } catch (error) {
//                             console.error('Error submitting form:', error);
//                         }
//                 }
//             }}
//             >
//                 {formik => {
//                     const { errors, touched, setFieldValue, setFieldError } = formik
//                     return (
//                         <div className='concert-form'>
//                             <Form>
//                                 <Row>
//                                     <Col>
//                                         <label htmlFor='date'>Date</label><br/>
//                                         <Field
//                                             type='date'
//                                             name='date'
//                                             id='date'
//                                             className={`form-control  form-control-lg ${errors.date && touched.date ? 'input-error' : null}`}
//                                         />
//                                         <ErrorMessage name='date' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
                                    
//                                     </Col>
//                                     <Col>
//                                         <label htmlFor='time'>Time</label><br/>
//                                         <Field
//                                             type='time'
//                                             name='time'
//                                             id='time'
//                                             className={`form-control  form-control-lg ${errors.time && touched.time ? 'input-error' : null}`}
//                                         />
//                                         <ErrorMessage name='time' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
//                                     </Col>
//                                 </Row>

//                                 <div className='form-field my-3'>
//                                     <label htmlFor='price'>Price</label><br/>
//                                     <Field
//                                         type='price'
//                                         name='price'
//                                         id='price'
//                                         className={`form-control  form-control-lg ${errors.price && touched.price ? 'input-error' : null}`}
//                                     />
//                                     <ErrorMessage name='price' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
//                                 </div>


//                                 <div className='form-field'>
//                                     <label htmlFor='artist_id'>Choose Existing Artist</label><br/>
//                                     <Field
//                                         as='select'
//                                         name='artist_id'
//                                         id='artist_id'
//                                         className={`form-control  form-control-lg ${errors.artist_id && touched.artist_id ? 'input-error' : null}`}
//                                         onChange={(e) => {
//                                             setFieldValue('artist_id', e.target.value)
//                                             setNewArtist(false)
//                                         }}
//                                         disabled={newArtist}
//                                         value={newArtist ? '' : formik.values.artist_id}
//                                     >
//                                         <option value=''>Select Artist</option>
//                                         {artists.map(artist => (
//                                             <option key={artist.id} value={artist.id}>
//                                                 {artist.name}
//                                             </option>
//                                         ))}
//                                     </Field><br/>
//                                     <ErrorMessage name='artist_id' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>                                
//                                 </div>

//                                 {!newArtist && (
//                                     <>
//                                         <label htmlFor='add_new_artist_btn'>Or </label>
//                                         <Button 
//                                             type='button' 
//                                             name='add_new_artist_btn'
//                                             className='mx-2'
//                                             onClick={() => setNewArtist(true)}>
//                                             Add New Artist
//                                         </Button>
//                                     </>
//                                 )}

//                                 <div className={newArtist ? `rounded border border-primary border-2 p-3`: null}>
//                                     {newArtist && (
//                                         <>
//                                             <h4>New Artist</h4>
//                                             <div className='form-field my-3'>
//                                                 <label htmlFor='artist_name'>Name</label><br/>
//                                                 <Field
//                                                     type='text'
//                                                     name='artist_name'
//                                                     id='artist_name'
//                                                     className={`form-control  form-control-lg ${errors.artist_name && touched.artist_name ? 'input-error' : null}`}
//                                                     onChange={(e) => {
//                                                         const artistNames = artists.map(artist => artist.name.toUpperCase())
//                                                         const enteredName = e.target.value.toUpperCase()
//                                                         if (artistNames.includes(enteredName)) {
//                                                             console.log('That artist already exists. Please use the dropdown above.')
//                                                             setFieldError('artist_name', 'That artist already exists. Please use the dropdown above.')
//                                                         } else {
//                                                             setFieldValue('artist_name', e.target.value)
//                                                         }
//                                                     }}
//                                                 />
//                                                 <ErrorMessage name='artist_name' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
//                                             </div>

//                                             <div className='form-field my-3'>
//                                                 <label htmlFor='artist_genre'>Genre</label><br/>
//                                                 <Field
//                                                     as='select'
//                                                     name='artist_genre'
//                                                     id='artist_genre'
//                                                     className={`form-control  form-control-lg ${errors.genre && touched.genre ? 'input-error' : null}`}
//                                                 >
//                                                     <option value=''>Select Genre</option>
//                                                     {Array.from(new Set(artists.map(artist => artist.genre))).map((genre, index) => (
//                                                         <option key={index} value={genre}>
//                                                             {genre}
//                                                         </option>
//                                                     ))}
//                                                     <option value='Other'>Other</option>
//                                                 </Field>
//                                                 <ErrorMessage name='artist_genre' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>                                            
//                                             </div>

//                                             <div className='form-field my-3'>
//                                                 <label htmlFor='artist_description'>Description</label><br/>
//                                                 <Field
//                                                     type='text'
//                                                     name='artist_description'
//                                                     id='artist_description'
//                                                     className={`form-control  form-control-lg ${errors.artist_description && touched.artist_description ? 'input-error' : null}`}
//                                                 />
//                                                 <ErrorMessage name='artist_description' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
//                                             </div>

//                                             <Button 
//                                                 type='button' 
//                                                 name='cancel_new_artist_btn'
//                                                 onClick={() => setNewArtist(false)}>
//                                                 Cancel
//                                             </Button>

//                                         </>
//                                     )}
//                                 </div>

//                                 <div className='form-field my-3'>
//                                     <label htmlFor='venue_id'>Venue</label><br/>
//                                     <Field
//                                         as='select'
//                                         name='venue_id'
//                                         id='venue_id'
//                                         className={`form-control  form-control-lg ${errors.venue_id && touched.venue_id ? 'input-error' : null}`}

//                                     >
//                                         <option value=''>Select Venue</option>
//                                         {venues.map(venue => (
//                                             <option key={venue.id} value={venue.id}>
//                                                 {venue.name}
//                                             </option>
//                                         ))}
//                                     </Field>
//                                     <ErrorMessage name='venue_id' render={(msg) => <div className='alert alert-warning'>{msg}</div>}/>
//                                 </div>

//                                 <Button size="lg" type='submit'>Submit</Button>
//                             </Form>
//                         </div>
//                     )
//                 }}
//             </Formik>
//             {/* <FormSubmissionComponent show={showModal} handleClose={handleClose} /> */}
//         </Container>
//     )
// }

// export default ArtistForm