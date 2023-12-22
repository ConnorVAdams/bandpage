function NotFound(){
    return(
        <div style={{
            backgroundImage: "url('https://i.imgur.com/jgh8jP9.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxHeight: '80vh',
            maxWidth: '80vw',
            height: '70%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '10px'
        }}>
            <>
            <h1 
                className='visible rounded-pill mb-1 mx-8'
                style={{
                    backgroundColor: '#FFB120',
                    color: 'white',
                    padding: '10px',
                    width: '15vw',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '10px',
                    }}>
                        🎵 404 🎵
            </h1>
                <h1 className='' style={{ marginBottom: '15%', color: 'white'}}>Sorry, we can't find the page you're looking for!</h1>
            </>
        </div>
    )
}
export default NotFound