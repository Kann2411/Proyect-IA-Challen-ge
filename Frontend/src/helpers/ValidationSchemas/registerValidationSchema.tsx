import * as Yup from 'yup'
export const registerValidationSchema = Yup.object({
    username: Yup.string()
    .matches(/^[A-Za-z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos")

    .required("El nombre de usuario es obligatorio"),
  email: Yup.string()
    .email("Debe ser un correo válido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/,
      "La contraseña debe tener al menos 7 caracteres, incluyendo letras y números"
    )
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("Debe confirmar su contraseña"),
  });
  