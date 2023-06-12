/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './css/Login.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import loginImage from '../../assets/login.jpg';
import Typography from '@mui/material/Typography';
import { authenticateUser, authenticationSuccess, authenticationFailure } from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const Login = (props: any) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (values.username && values.password) {
            setValid(true);

            props
                .authenticateUser(values.username, values.password)
                .then((response: any) => {
                    dispatch(
                        authenticationSuccess(
                            response.userId,
                            response.accessToken,
                            response.refreshToken,
                            response.authorities[0].authority
                        )
                    );
                    navigate('/');
                })
                .catch((error: Error) => {
                    dispatch(authenticationFailure(error.message));
                    setValid(false);
                    setMessage('Username or password may be incorrect.');
                });
        } else {
            setValid(false);
            setMessage('Please enter your details.');
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
                        Welcome back!
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '17px' }}>
                        Please enter your details
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
                                margin="normal"
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
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
                                    marginTop: '2%',
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
                                href="/sign-up"
                                variant="body2"
                                style={{
                                    textDecoration: 'none',
                                    color: '#37306B',
                                    fontWeight: 'bold',
                                    marginTop: '2%',
                                }}
                            >
                                {'Go to Sign up'}
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
                            Log In
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
    authenticateUser,
};

export default connect(null, mapDispatchToProps)(Login);
