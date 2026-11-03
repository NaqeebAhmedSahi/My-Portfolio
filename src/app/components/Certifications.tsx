'use client';

import { Box, Typography, useTheme, Avatar, Chip, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useThemeContext } from '@/app/theme/ThemeProvider';
import { FaCertificate, FaAward, FaGraduationCap } from 'react-icons/fa';
import {  SiHtml5,  SiWordpress, SiMongodb, SiFlask, SiReact } from 'react-icons/si';

export const Certifications = () => {
  const theme = useTheme();
  const { darkMode } = useThemeContext();
  const containerRef = useRef<HTMLElement>(null!);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll transformations for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  const certificationsData = [
    {
      id: 1,
      title: "HTML, CSS, & JavaScript - Certification Course for Beginners",
      issuer: "Udemy",
      date: "2023",
      description: "Comprehensive course covering the fundamentals of web development with HTML, CSS, and JavaScript.",
      icon: <SiHtml5 size={24} />,
      color: "#E44D26",
      skills: ["HTML5", "CSS3", "JavaScript", "Web Development"],
      verification: "https://ude.my/UC-c82abff4-8b55-4c5c-84f2-68cdad71b134/"
    },
    {
      id: 2,
      title: "WordPress Crash Course: Build any Website in Minutes!",
      issuer: "Udemy",
      date: "2023",
      description: "Learned to quickly build professional websites using WordPress with themes and plugins.",
      icon: <SiWordpress size={24} />,
      color: "#21759B",
      skills: ["WordPress", "CMS", "Website Building", "Themes"],
      verification: "https://ude.my/UC-98d69993-efbb-440b-990f-aefb83e80909/"
    },
    {
      id: 3,
      title: "PyMongo Essentials: Dive into MongoDB with Python",
      issuer: "Udemy",
      date: "2023",
      description: "Mastered MongoDB database operations using Python's PyMongo driver.",
      icon: <SiMongodb size={24} />,
      color: "#47A248",
      skills: ["MongoDB", "PyMongo", "NoSQL", "Python"],
      verification: "https://www.udemy.com/certificate/UC-91a0ffc7-fb92-4a88-a1ef-98b1c834fb62/"
    },
    {
      id: 4,
      title: "Python And Flask Demonstrations Practice Course",
      issuer: "Udemy",
      date: "2023",
      description: "Hands-on practice building web applications with Python and Flask framework.",
      icon: <SiFlask size={24} />,
      color: "#000000",
      skills: ["Python", "Flask", "Web Framework", "Backend"],
      verification: "https://www.udemy.com/certificate/UC-1f459e28-f959-4aab-9b05-1b8d30d28b31/"
    },
    {
      id: 5,
      title: "MERN Stack: All You Need to Know with Practical Project",
      issuer: "Udemy",
      date: "2023",
      description: "Full-stack development using MongoDB, Express, React, and Node.js with a practical project.",
      icon: <SiReact size={24} />,
      color: "#61DAFB",
      skills: ["MERN Stack", "React", "Node.js", "Full Stack"],
      verification: "https://www.udemy.com/certificate/UC-edf438a7-115c-4e46-b164-a873478be3d9/"
    }
  ];

  const certificationLevels = [
    { icon: <FaAward />, name: "Professional", color: theme.palette.primary.main },
    { icon: <FaCertificate />, name: "Associate", color: theme.palette.secondary.main },
    { icon: <FaGraduationCap />, name: "Fundamentals", color: "#6C63FF" }
  ];

  return (
    <Box 
      id="certifications"
      component="section"
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        padding: { xs: '80px 20px', md: '120px 60px' },
        position: 'relative',
        overflow: 'hidden',
        background: darkMode 
          ? 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' 
          : 'radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)',
      }}
    >
      {/* Animated floating certificate badges */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            borderRadius: '8px',
            background: 'transparent',
            border: `2px solid ${theme.palette.primary.main}${Math.random() > 0.5 ? '80' : '30'}`,
            opacity: 0.4,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 60 - 30}deg`,
          }}
          animate={{
            y: [0, Math.random() * 200 - 100],
            x: [0, Math.random() * 200 - 100],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, Math.random() * 360]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        />
      ))}

      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '30% 70% 67% 33% / 30% 30% 70% 70%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
          filter: 'blur(60px)',
          zIndex: 0,
          y,
          opacity,
          scale
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}10, ${theme.palette.primary.main}10)`,
          filter: 'blur(70px)',
          zIndex: 0,
          y: useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
          opacity,
          scale
        }}
      />

      {/* Main content */}
      <Box sx={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
              Certifications & Credentials
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
              Validated expertise through industry-recognized certifications
            </Typography>
          </motion.div>
        </Box>

        {/* Certification level filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px',
            marginBottom: '40px'
          }}
        >
          {certificationLevels.map((level, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                startIcon={level.icon}
                sx={{
                  background: `${level.color}20`,
                  color: level.color,
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  border: `1px solid ${level.color}30`,
                  '&:hover': {
                    background: `${level.color}30`
                  }
                }}
              >
                {level.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: '30px'
        }}>
          {certificationsData.map((cert, index) => {
            const accent = darkMode && cert.color.toLowerCase() === '#000000' ? '#f4f4f5' : cert.color;
            return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* Certification card */}
              <Box
                sx={{
                  background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  padding: { xs: '20px', md: '30px' },
                  borderRadius: '20px',
                  boxShadow: `0 10px 30px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                  border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 15px 40px ${darkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
                    '& .cert-highlight': {
                      width: '100%',
                      opacity: 0.1
                    },
                    '& .cert-badge': {
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: `0 0 30px ${accent}80`
                    }
                  }
                }}
              >
                {/* Certification highlight effect */}
                <Box
                  className="cert-highlight"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0%',
                    height: '100%',
                    background: accent,
                    opacity: 0,
                    transition: 'all 0.5s ease',
                    zIndex: -1
                  }}
                />

                {/* Animated ribbon effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '0',
                    height: '0',
                    borderLeft: '50px solid transparent',
                    borderRight: '50px solid transparent',
                    borderBottom: `50px solid ${accent}20`,
                    transform: 'rotate(45deg)',
                    filter: 'blur(2px)'
                  }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ display: 'flex', gap: '20px', mb: 3 }}>
                    <motion.div 
                      // className="cert-badge"
                      style={{
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Avatar
                        sx={{
                          width: '80px',
                          height: '80px',
                          background: `${accent}20`,
                          color: accent,
                          fontSize: '32px',
                          border: `2px solid ${accent}`,
                          boxShadow: `0 0 20px ${accent}30`
                        }} 
                      >
                        {cert.icon}
                      </Avatar>
                    </motion.div>

                    <Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ 
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 0.5,
                          background: `linear-gradient(90deg, ${accent}, ${theme.palette.secondary.main})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          display: 'inline-block'
                        }}
                      >
                        {cert.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.secondary
                        }}
                      >
                        {cert.issuer} • {cert.date}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{ 
                      mb: 3,
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      flexGrow: 1
                    }}
                  >
                    {cert.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: 3 }}>
                    {cert.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Chip
                          label={skill}
                          sx={{
                            background: `${accent}15`,
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                            border: `1px solid ${accent}30`,
                            '&:hover': {
                              background: `${accent}25`
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      href={cert.verification}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: accent,
                        color: accent,
                        fontWeight: 600,
                        '&:hover': {
                          background: `${accent}20`,
                          borderColor: accent
                        }
                      }}
                    >
                      View Certificate
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};