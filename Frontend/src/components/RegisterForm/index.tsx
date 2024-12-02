'use client'
import React from 'react'
import { Form, Formik, Field } from 'formik'
import { IRegistrationFormValues } from '@/Interfaces/interfaces';
import { registerValidationSchema } from '@/helpers/ValidationSchemas/registerValidationSchema';
import { Button, Input } from '@nextui-org/react';

export default function RegisterForm() {
  const initialValues: IRegistrationFormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: IRegistrationFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("Datos del formulario:", values);
    resetForm();
  };

  return (
    <div className='flex justify-center w-screen h-auto'>
      <div className='w-2/3 lg:w-1/3 h-auto flex flex-col justify-center p-5'>
        <p className='text-center text-secondary my-5 font-semibold text-3xl'>Regístrate</p>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, isSubmitting }) => (
            <Form>
              <div>
                <Field
                  name="username"
                  render={({ field }: any) => (
                    <Input
                      {...field}
                      label='Nombre de Usuario'
                      type='text'
                      id="username"
                      placeholder="Usuario_123"
                      aria-label="Username"
                      color='secondary'
                      isInvalid={touched.username && !!errors.username} // Se agrega isInvalid
                      errorMessage={touched.username && errors.username ? errors.username : ''} // Se agrega errorMessage
                    />
                  )}
                />
              </div>

              <div className='mt-5'>
                <Field
                  name="email"
                  render={({ field }: any) => (
                    <Input
                      {...field}
                      label='Correo Electrónico'
                      type='email'
                      id="email"
                      placeholder="ejemplo@email.com"
                      aria-label="Email"
                      color='secondary'
                      isInvalid={touched.email && !!errors.email} // Se agrega isInvalid
                      errorMessage={touched.email && errors.email ? errors.email : ''} // Se agrega errorMessage
                    />
                  )}
                />
              </div>

              <div className='mt-5'>
                <Field
                  name="password"
                  render={({ field }: any) => (
                    <Input
                      {...field}
                      label='Contraseña'
                      type="password"
                      id="password"
                      placeholder="********"
                      aria-label="Password"
                      color='secondary'
                      isInvalid={touched.password && !!errors.password} // Se agrega isInvalid
                      errorMessage={touched.password && errors.password ? errors.password : ''} // Se agrega errorMessage
                    />
                  )}
                />
              </div>

              <div className='mt-5'>
                <Field
                  name="confirmPassword"
                  render={({ field }: any) => (
                    <Input
                      {...field}
                      label='Confirmar Contraseña'
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      aria-label="Confirm Password"
                      color='secondary'
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword} // Se agrega isInvalid
                      errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''} // Se agrega errorMessage
                    />
                  )}
                />
              </div>

              <div className='flex justify-center mt-5'>
                <Button 
                  color='secondary'
                  type="submit" 
                  isDisabled={!isValid || isSubmitting}
                >
                  Registrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
