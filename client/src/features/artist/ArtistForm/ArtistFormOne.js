import React from 'react'
import { Field, reduxForm } from 'redux-form'

const  { DOM: { input } } = React

const ArtistFormOne = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Artist Name</label>
                <Field name="name" component = {name => 
                    <div>
                    <input type="text" {...name} placeholder="Artist Name"/>
                    {name.touched && name.error && <span>{name.error}</span>}
                    </div>
                } />
            </div>
            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    ) 
}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
//   validate
})(ArtistFormOne)