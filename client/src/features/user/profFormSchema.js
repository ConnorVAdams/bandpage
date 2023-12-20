import * as yup from "yup"

const profFormSchema = () => {

    return yup.object().shape({
        name: yup
        .string()
        .max(40, 'Name must be between 1 and 40 characters.')
        .required("Please enter an artist name."),
        genres: yup
        .string()
        .max(50, 'Genres must be between 1 and 40 characters.')
        .required(),
        bio: yup
        .string()
        .max(200, 'Bio must be between 1 and 200 characters.'),
        location: yup
        .string()
        .max(50, 'Genres must be between 1 and 40 characters.')
        .required(),
        img: yup
        .string()
        .matches(
        /(http(s?):)([/|.|\w|\s|-])*\./,
        'Please enter a valid image URL (jpg, gif, or png)'
        )
    });
};

export default profFormSchema