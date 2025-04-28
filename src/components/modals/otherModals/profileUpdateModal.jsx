import React, { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

const ProfileUpdate = () => {

    const [isDisabled, setIsDisabled] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: 'Aditya Jain',
            email: 'aj257453@gmail.com',
            mobile: '9540441958',
        },
    });

    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
        setIsDisabled(true); // Disable again after save
    };



    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <Card>
                    <CardContent className="p-8">
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                            <Typography variant="h5" fontWeight="bold">
                                Profile
                            </Typography>
                            <Button
                                onClick={() => {
                                    if (isDisabled) {
                                        setIsDisabled(false); // go into edit mode
                                    } else {
                                        // Save clicked: manually trigger submission
                                        handleSubmit(onSubmit)();
                                    }
                                }} variant="contained" color="success">
                                {isDisabled ? <p>Edit</p> : <p>Save</p>}
                            </Button>
                        </Box>

                        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                            Basic Details
                        </Typography>

                        <Box className="p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Name"
                                            fullWidth
                                            disabled={isDisabled}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            fullWidth
                                            disabled={isDisabled}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\S+@\S+\.\S+$/,
                                                    message: 'Invalid email address',
                                                },
                                            })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Mobile"
                                            fullWidth
                                            type='tel'
                                            disabled={isDisabled}
                                            error={!!errors.mobile}
                                            helperText={errors.mobile?.message}
                                            {...register('mobile', {
                                                required: 'Mobile is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Mobile must be 10 digits',
                                                },
                                            })}
                                        />
                                    </Grid>
                                </Grid>


                            </form>
                        </Box>

                        <Typography variant="subtitle1" fontWeight="medium" mt={6} mb={2}>
                            GST Details
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="GST No." fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="outlined" fullWidth>
                                    Verify
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileUpdate;
