import * as yup from 'yup';

const signUpSchema = yup.object().shape({
    name: yup
        .string()
        .min(3)
        .required('Full name must be at least 3 characters'),
    username: yup
        .string()
        .min(3)
        .required('Username must be at least 3 characters'),
    password: yup.string().required('Password must be at least 6 characters'),
    description: yup
        .string()
        .min(10)
        .max(200)
        .required('Description must be at most 200 characters'),
    image: yup
        .mixed()
        .required('Image is required')
        .test('fileSize', 'Image is too large. Max size is 2MB.', (value) => {
            if (value) {
                return value.size <= 2 * 1024 * 1024;
            }
            return true;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (value) {
                return ['image/jpg', 'image/jpeg', 'image/png'].includes(
                    value.type,
                );
            }
            return true;
        }),
});

export { signUpSchema };
