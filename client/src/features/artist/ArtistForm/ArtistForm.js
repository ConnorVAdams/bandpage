import React, { Component, PropTypes } from 'react'
import ArtistFormOne from './ArtistFormOne'
// import ArtistFormTwo from './ArtistFormTwo'
// import ArtistFormThree from './ArtistFormThree'

class ArtistForm extends Component  {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1
        }
        }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }
    
    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    
    render() {
        const { onSubmit } = this.props
        const { page } = this.state
        return (<div>
            {page === 1 && <ArtistFormOne onSubmit={this.nextPage}/>}
            {/* {page === 2 && <ArtistFormTwo previousPage={this.previousPage} onSubmit={this.nextPage}/>}
            {page === 3 && <ArtistFormThree previousPage={this.previousPage} onSubmit={onSubmit}/>} */}
        </div>
        )
    }
}

export default ArtistForm