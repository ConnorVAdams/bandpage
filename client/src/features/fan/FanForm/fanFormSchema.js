import * as Yup from 'yup';

const artistFormSchema = (newArtist) => {

    return Yup.object().shape({
        username: Yup
            // .date()
            // .min(new Date(), 'Date must be in the future.')
            .required('Date is required.'),

        password: Yup
            // .string()
            // .matches(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/, 'Invalid time format. Please use HH:MM.')
            // .matches(/(00|15|30|45)$/, 'Time must end in 00, 15, 30, or 45.')
            .required('Time is required.'),

        name: Yup
            // .number()
            // .integer('Price must be an integer.')
            // .moreThan(-1, 'Price must be 0 or greater.')
            .required('Price is required.'),

        genres: Yup
            // .number()
            // .integer()
            .required('Venue is required.'),
        
        bio: Yup
            // .number()
            // .integer()
            .required('Venue is required.'),

        location: Yup
            // .number()
            // .integer()
            .required('Venue is required.'),
    });
};

export default artistFormSchema;