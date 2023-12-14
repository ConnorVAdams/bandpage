import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserLanding = () => {
    const userInfo = useSelector(state => state.user.data)
    // console.log(userInfo)

    if (userInfo.artist) {
        const { 
            artist: { 
                name, 
                img, 
                id, 
                upcoming_events, 
                fan_followers, 
                artist_followers,
                followed_artists,
                favorite_tracks,
                events_attending
            },
            user_id,
            username 
        } = userInfo

        return(
        <>
            <div id={user_id}>
                <div id='profile-info'>
                    <h1>ProfileInfo</h1>
                    <h4>Username: {username}</h4>
                    <Link to={`/artists/${id}/home`}> 
                        <h2>{name}</h2>
                        <img src={img} alt={name}/>
                    </Link><br/>
                    <Link>Edit Profile</Link>
                </div>
                <div id='Landing-info'>
                    <h1>LandingInfo</h1>

                    <h5>Events I'm Headlining:</h5>
                        <div id='events-headlining-div'>
                            {/* {events && events} */}
                        </div>
                    <h5>Events I'm Attending:</h5>

                    <h5>My Liked Artists</h5>

                    <h5>My Liked Tracks</h5>

                    <h5>My Followers:</h5>


                </div>
            </div>
        </>
    )} 
    console.log(userInfo)
    const { 
        fan: {
            name,
            img,
            id,
            followed_artists,
            favorite_tracks,
            events_attending
        },
        user_id,
        username 
        } = userInfo

    return (
        <>
        <div id={user_id}>
            <div id='profile-info'>
                <h1>ProfileInfo</h1>
                <h4>Username: {username}</h4>
                    <h2>{name}</h2>
                    <img src={img} alt={name}/>
                    <br/>
                <Link>Edit Profile</Link>
            </div>
            <div id='Landing-info'>
                <h1>LandingInfo</h1>

                <h5>Events I'm Attending:</h5>

                <h5>My Liked Artists</h5>

                <h5>My Liked Tracks</h5>

            </div>
        </div>
    </>
    )
}

export default UserLanding