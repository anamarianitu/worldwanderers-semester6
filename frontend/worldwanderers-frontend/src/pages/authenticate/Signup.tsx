/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './css/Login.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import loginImage from '../../assets/login.jpg';
import Typography from '@mui/material/Typography';
import { registerUser, authenticationSuccess, authenticationFailure } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Checkbox, Modal } from '@mui/material';

const Signup = (props: any) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        agreedToTerms: false,
    });

    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleModalOpen = () => {
        setModalOpen(true);
      };

      const handleModalClose = () => {
        setModalOpen(false);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setValues({ ...values, [name]: checked });
      };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (values.agreedToTerms){
            if (
                values.username &&
                values.password &&
                values.email &&
                values.email.includes("@") &&
                values.firstName &&
                values.lastName
              ) {
                setValid(true);

                const signupDTO = {
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                };

                props
                  .registerUser(signupDTO)
                  .then((response: any) => {
                    dispatch(
                      authenticationSuccess(
                        response.userId,
                        response.accessToken,
                        response.refreshToken,
                        response.authorities[0]?.authority
                      )
                    );
                    navigate('/');
                  })
                  .catch((error: Error) => {
                    dispatch(authenticationFailure(error.message));
                    setValid(false);
                    setMessage('Failed to register user.');
                  });
              } else {
                setValid(false);
                setMessage('Please enter all required details, including a valid email address.');
              }
        }
        else{
            setValid(false);
            setMessage('Please accept the terms and conditions.');
        }
        setSubmitted(true);
      };

    return (
        <Box className="login-page">
            <Box className="login-left">
                <Box className="login-header">
                    <Typography
                        variant="h2"
                        sx={{ fontSize: '3rem', fontWeight: 'bold' }}
                    >
                        Welcome to WorldWanderers!
                    </Typography>
                </Box>
                {submitted && !valid && (
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'red',
                        }}
                    >
                        {message}
                    </Typography>
                )}
                <Box
                    component="form"
                    sx={{ mt: 1, width: '80%' }}
                    onSubmit={handleSubmit}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '15%',
                            }}
                        >
                            <TextField
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={values.username}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                value={values.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                value={values.lastName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    sx={{ marginRight: '10px' }}
                                    checked={values.agreedToTerms}
                                    onChange={handleCheckboxChange}
                                    name="agreedToTerms"
                                />
                            <Typography variant="body1">
                                * I have read and agreed to the{' '}
                                <Link onClick={handleModalOpen}>terms and conditions</Link>
                            </Typography>
                            </Box>

                            <Modal open={modalOpen} onClose={handleModalClose}>
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 600,
                                bgcolor: 'background.paper',
                                p: 4,
                            }}>
                                <Typography variant="h6" component="h2">
                                Terms and Conditions
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                By accessing and using this website, you agree to the following terms and conditions. The content on this website is protected by intellectual property laws and may not be used, reproduced, or modified without permission. You are responsible for providing accurate information, maintaining account confidentiality, and using the website lawfully. We strive to provide accurate information, but we do not guarantee its accuracy. Your use of the site is at your own risk, and we are not liable for any damages. We may modify these terms without notice. These terms are governed by [your jurisdiction] law. If you have any questions, please contact us.
                                </Typography>
                            </Box>
                            </Modal>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Link
                                href="/"
                                variant="body2"
                                style={{
                                    textDecoration: 'none',
                                    color: '#37306B',
                                    fontWeight: 'bold',
                                }}
                            >
                                {'Forgot password?'}
                            </Link>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Link
                                href="/log-in"
                                variant="body2"
                                style={{
                                    textDecoration: 'none',
                                    color: '#37306B',
                                    fontWeight: 'bold',
                                }}
                            >
                                {'Log in'}
                            </Link>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                background: '#37306B',
                                textTransform: 'none',
                                fontSize: '15px',
                            }}
                            sx={{ mt: '10%', mb: 2, ml: '15%' }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className="login-right">
                <img
                    className="login-picture"
                    src={loginImage}
                    alt="login-page"
                />
            </Box>
        </Box>
    );
};
const mapDispatchToProps = {
    registerUser,
};

export default connect(null, mapDispatchToProps)(Signup);
