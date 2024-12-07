'use client'
import React from 'react'
import { Form, Formik, Field } from 'formik'
import { ILoginFormValues } from '@/Interfaces/interfaces';
import { loginValidationSchema } from '@/helpers/ValidationSchemas/loginValidationSchema';
import { Button, Input } from '@nextui-org/react';

export default function LoginForm() {
  const initialValues: ILoginFormValues = {
    username: "",
    password: ""
  };

  const handleSubmit = (values: ILoginFormValues, { resetForm }: { resetForm: () => void }) => {
    console.log("Datos del formulario:", values);
    resetForm();
  };

  return (
    <div className='flex justify-center w-screen h-auto'>
      <div className='w-2/3 lg:w-1/3 h-auto flex flex-col justify-center p-5'>
        <p className='text-center text-secondary my-5 font-semibold text-3xl'>Iniciar Sesión</p>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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
                      isInvalid={touched.username && !!errors.username} 
                      errorMessage={touched.username && errors.username ? errors.username : ''} 
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
                      isInvalid={touched.password && !!errors.password} 
                      errorMessage={touched.password && errors.password ? errors.password : ''} 
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
