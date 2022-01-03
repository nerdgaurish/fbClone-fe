/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './styles/register.css';

function Register() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validate: (filledData) => {
      const errors = {};

      if (!filledData.firstname) {
        errors.firstname = 'First name is required.';
      }

      if (!filledData.lastname) {
        errors.lastname = 'Last name is required.';
      }

      if (!filledData.username) {
        errors.username = 'Username is required.';
      }

      if (!filledData.email) {
        errors.email = 'Email is required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(filledData.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!filledData.password) {
        errors.password = 'Password is required.';
      } else if (filledData.password.length < 8) {
        errors.password = 'Minimum eight characters';
      }

      return errors;
    },
    onSubmit: async (filledData) => {
      setFormData(filledData);
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/v1/user/register',
          {
            firstName: filledData.firstname,
            lastName: filledData.lastname,
            userName: filledData.username,
            email: filledData.email,
            password: filledData.password,
            role: 'user',
            avatar: filledData.firstname,
          },
        );
        await console.log(data);
        await setShowMessage(true);
        await formik.resetForm();
        await navigate('/login');
      } catch (err) {
        console.log(err.response.data.errors);
        console.log('err.response');
      }
    },
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;

  const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  return (
    <div className="form-demo">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }} />
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name
            {' '}
            <b>{formData.name}</b>
            {' '}
            ; it'll be valid next 30 days without activation. Please check
            {' '}
            <b>{formData.email}</b>
            {' '}
            for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="p-d-flex p-jc-center">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="firstname" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('firstname') })} />
                <label htmlFor="firstname" className={classNames({ 'p-error': isFormFieldValid('firstname') })}>First Name*</label>
              </span>
              {getFormErrorMessage('firstname')}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('lastname') })} />
                <label htmlFor="lastname" className={classNames({ 'p-error': isFormFieldValid('lastname') })}>Last Name*</label>
              </span>
              {getFormErrorMessage('lastname')}
            </div>
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username*</label>
              </span>
              {getFormErrorMessage('username')}
            </div>
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
                  header={passwordHeader}
                  footer={passwordFooter}
                />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
              </span>
              {getFormErrorMessage('password')}
            </div>

            <Button type="submit" label="Submit" className="p-mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
