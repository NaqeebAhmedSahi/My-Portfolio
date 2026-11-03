'use client';

import { Box, Typography, Grid, TextField, Button, IconButton, useTheme, Snackbar, Alert } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useThemeContext } from '@/app/theme/ThemeProvider';
import { SiGithub, SiLinkedin, SiDiscord, SiCodepen } from 'react-icons/si';
import { FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import type { RefObject } from 'react';

export const Contact = () => {
  const theme = useTheme();
  const { darkMode } = useThemeContext();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Submission state
  const [submissionState, setSubmissionState] = useState({
    loading: false,
    success: false,
    error: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { icon: <SiGithub />, url: "https://github.com", color: "#181717", name: "GitHub" },
    { icon: <SiLinkedin />, url: "https://linkedin.com", color: "#0077B5", name: "LinkedIn" },
    { icon: <SiDiscord />, url: "https://discord.com", color: "#5865F2", name: "Discord" },
    { icon: <SiCodepen />, url: "https://codepen.io", color: "#000000", name: "CodePen" },
  ];

  const contactMethods = [
    { icon: <FiMapPin size={24} />, title: "Location", info: "9N, Gulberg II, Lahore, Pakistan", color: theme.palette.primary.main },
    { icon: <FiPhone size={24} />, title: "Phone", info: "+92 307 6131070", color: theme.palette.secondary.main },
    { icon: <FiMail size={24} />, title: "Email", info: "naqeebahmedsahi@gmail.com", color: "#6c63ff" },
  ];

  // Animation triggers
  const isInView = useInView(ref as RefObject<Element>, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enter")
    
    if (!validateForm()) return;

    setSubmissionState({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmissionState({ loading: false, success: true, error: '' });
      setSnackbarOpen(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setSubmissionState({ loading: false, success: false, error: errorMessage });
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      ref={ref}
      sx={{
        minHeight: '100vh',
        padding: { xs: '80px 20px', md: '120px 60px' },
        position: 'relative',
        overflow: 'hidden',
        background: darkMode ?
          'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' :
          'radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)',
      }}
    >
      {/* Animated floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            opacity: 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 200 - 100],
            x: [0, Math.random() * 200 - 100],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}

      {/* Main content container */}
      <Box sx={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2
            }}
          >
            Lets Connect
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              margin: '0 auto',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Have a project in mind or want to chat? Drop me a message and Ill get back to you as soon as possible.
          </Typography>
        </motion.div>

        {/* Contact content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{ width: '100%' }}
        >
          <Grid container spacing={6}>
            {/* Contact form */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: `0 20px 40px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                    border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Form background gradient */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at center, ${theme.palette.primary.main}10, transparent 70%)`,
                      zIndex: -1
                    }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                  />

                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 4,
                      color: theme.palette.text.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <Box sx={{ 
                      width: '8px', 
                      height: '24px', 
                      background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '4px'
                    }} />
                    Send Me a Message
                  </Typography>

                  <Grid container spacing={3}>
                    {['name', 'email', 'subject', 'message'].map((field, i) => (
                      <Grid item xs={12} key={field} sm={field === 'message' ? 12 : 6}>
                        <motion.div
                          variants={itemVariants}
                          custom={i}
                          whileHover={{ scale: 1.02 }}
                        >
                          <TextField
                            fullWidth
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            variant="outlined"
                            value={formData[field as keyof typeof formData]}
                            onChange={handleChange}
                            multiline={field === 'message'}
                            rows={field === 'message' ? 4 : 1}
                            error={!!errors[field as keyof typeof errors]}
                            helperText={errors[field as keyof typeof errors]}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: theme.palette.primary.main,
                                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <motion.div
                        variants={itemVariants}
                        custom={4}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'inline-block' }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={<FiSend />}
                          disabled={submissionState.loading}
                          sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            borderRadius: '12px',
                            padding: '16px 32px',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                            '&:hover': {
                              boxShadow: `0 6px 24px ${theme.palette.primary.main}50`,
                            },
                            '&:disabled': {
                              opacity: 0.7,
                            }
                          }}
                        >
                          {submissionState.loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>

            {/* Contact info */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  {/* Contact methods */}
                  <Box
                    sx={{
                      background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      padding: '40px',
                      borderRadius: '24px',
                      boxShadow: `0 20px 40px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 4,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <Box sx={{ 
                        width: '8px', 
                        height: '24px', 
                        background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '4px'
                      }} />
                      Contact Information
                    </Typography>

                    {contactMethods.map((method, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        custom={i}
                        whileHover={{ x: 5 }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 3,
                          background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          borderRadius: '12px',
                          padding: '16px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            boxShadow: `0 4px 12px ${method.color}20`
                          }
                        }}>
                          <Box
                            sx={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '12px',
                              background: `${method.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '16px',
                              color: method.color,
                              flexShrink: 0
                            }}
                          >
                            {method.icon}
                          </Box>
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 600, 
                                color: theme.palette.text.secondary,
                                mb: 0.5
                              }}
                            >
                              {method.title}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: 500,
                                color: theme.palette.text.primary
                              }}
                            >
                              {method.info}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>

                  {/* Social links */}
                  <Box
                    sx={{
                      background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      padding: '40px',
                      borderRadius: '24px',
                      boxShadow: `0 20px 40px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 4,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <Box sx={{ 
                        width: '8px', 
                        height: '24px', 
                        background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '4px'
                      }} />
                      Find Me On
                    </Typography>

                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '12px',
                      justifyContent: { xs: 'center', sm: 'flex-start' }
                    }}>
                      {socialLinks.map((social, i) => {
                        const hex = social.color.replace('#', '');
                        const luminance = hex.length === 6
                          ? (0.299 * parseInt(hex.slice(0, 2), 16) + 0.587 * parseInt(hex.slice(2, 4), 16) + 0.114 * parseInt(hex.slice(4, 6), 16)) / 255
                          : 1;
                        const accent = darkMode && luminance < 0.35 ? '#f4f4f5' : social.color;
                        const onAccent = accent === '#f4f4f5' ? '#111111' : '#ffffff';
                        return (
                        <motion.div
                          key={i}
                          variants={itemVariants}
                          custom={i + 3}
                          whileHover={{ y: -8 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              background: `${accent}20`,
                              color: accent,
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px',
                              '&:hover': {
                                background: `${accent}30`,
                                boxShadow: `0 8px 16px ${accent}30`
                              },
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {social.icon}
                            {/* Hover effect */}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: accent,
                                transform: 'translateY(100%)',
                                transition: 'transform 0.3s ease',
                              }}
                              className="hover-effect"
                            />
                            {/* Tooltip */}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                mb: 1,
                                background: accent,
                                color: onAccent,
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                opacity: 0,
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                '&:after': {
                                  content: '""',
                                  position: 'absolute',
                                  top: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  borderWidth: '4px',
                                  borderStyle: 'solid',
                                  borderColor: `${accent} transparent transparent transparent`
                                }
                              }}
                              className="tooltip"
                            >
                              {social.name}
                            </Box>
                          </IconButton>
                        </motion.div>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={submissionState.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {submissionState.success 
            ? 'Message sent successfully!' 
            : submissionState.error || 'Failed to send message'}
        </Alert>
      </Snackbar>
    </Box>
  );
};