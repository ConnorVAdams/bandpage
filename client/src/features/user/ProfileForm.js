import { useState, useEffect } from 'react'
import { ErrorMessage, Field, Formik, Form } from 'formik'
// import artistFormSchema from './artistFormSchema'
import { Container, Row, Col, Button } from 'react-bootstrap'

const ProfileForm = () => {
    // const [venues, setVenues] = useState([])
    // const [artists, setArtists] = useState([])
    // const [newArtist, setNewArtist] = useState(false)

    // const [showModal, setShowModal] = useState(false);

    // const handleClose = () => {
    //     setShowModal(false);
    // };

    // useEffect(() => {
    //     const fetchVenues = async () => {
    //         try {
    //             const response = await fetch('/api/v1/venues')
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setVenues(data)

    //             } else {
    //                 console.error('Response not ok:', response.status)
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch venues:', error)
    //         }
    //     }

    //     fetchVenues()
    // }, [])

    // useEffect(() => {
    //     const fetchArtists = async () => {
    //         try {
    //             const response = await fetch('/api/v1/artists')
    //             if (response.ok) {
    //                 const data = await response.json()
    //                 setArtists(data)
    //             } else {
    //                 console.error('Response not ok:', response.status)
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch artists:', error)
    //         }
    //     }

    //     fetchArtists()
    // }, [])
    return (
        <h1>ProfileForm</h1>
    )
}

export default ProfileForm