import { useFormik } from 'formik';
import { getPropertyByPath } from './property-by-path';

export const formikPropsGenerator = (
    formik: ReturnType<typeof useFormik<any>>,
    name: string,
) => {
    return {
        name,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: (getPropertyByPath(formik.touched, name) &&
            getPropertyByPath(formik.errors, name)) as string,
    };
};
