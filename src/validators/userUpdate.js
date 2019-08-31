import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatórios.'),
  email: Yup.string().required('O e-mail é obrigatório.'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (password, field) => {
    return password
      ? field
          .min(6, 'A senha deve conter ao menos 6 caracteres.')
          .required('A senha é obrigatória.')
      : field;
  }),
  confirmPassword: Yup.string().when('password', (password, field) => {
    return password
      ? field
          .required()
          .oneOf([Yup.ref('password')], 'As senhas não coincidem.')
      : field;
  }),
});

export default validationSchema;
