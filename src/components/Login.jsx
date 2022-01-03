/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

function Login() {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validate: (data) => {
      const errors = {};

      if (!data.email) {
        errors.email = 'Email is required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      } else if (data.password.length < 8) {
        errors.password = 'Minimum eight characters';
      }

      return errors;
    },
    onSubmit: async (filledData) => {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/user/login',
        {
          email: filledData.email,
          password: filledData.password,
        },
      );
      const { token } = data;
      console.log(token);
      document.cookie = `token=${token}; expires=Thu, 18 Jan 2022 12:00:00 UTC; path=/`;
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  return (
    <div className="form-demo">
      <div className="p-d-flex p-jc-center">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  className={classNames({ 'p-invalid': isFormFieldValid('password') })}
                />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
              </span>
              {getFormErrorMessage('password')}
            </div>

            <Button type="submit" label="Login" className="p-mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
