'use client';

import { Box, Typography, Grid, Chip, Button, useTheme, Modal, IconButton } from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useThemeContext } from '@/app/theme/ThemeProvider';
import { FaPlay, FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ReactPlayer from 'react-player';

// Updated project data with video URLs
const projectsData = [
  {
    id: 1,
    title: "Seemed Footcare",
    description: `<p>
      A modern medical website built with <span class="font-bold" style="color: #2563eb">Next.js</span> with backend connecting with <span class="font-bold" style="color: #16a34a">MongoDB</span> that scrapes and aggregates data from multiple online sources to showcase healthcare products. Features <span class="font-bold">dynamic routing</span>, email integration using <span class="font-bold" style="color: #9333ea">EmailJS</span>, and a clean, responsive design.
    </p>`,
    tags: ["Next.js", "EmailJS", "Web Scraping", "Dynamic Routing"],
    image: "images/image1.png", // Replace with your own image if available
    video: "/Videos/firstVideo.mp4", // Replace with your video link if available
    github: "https://github.com/your-username/medical-aggregator", // Replace with your GitHub link
    live: "https://seemedfootcare.com" // Replace with your live website link
  },
  {
    id: 2,
    title: "My Portfolio",
    description: `<p>
    A sleek personal portfolio built with <span class="font-bold" style="color: #2563eb">Next.js</span>, featuring smooth animations powered by <span class="font-bold" style="color: #6366f1">Framer Motion</span> and modern UI components from <span class="font-bold" style="color: #0ea5e9">Material UI</span>. Includes a functional contact form integrated using <span class="font-bold" style="color: #16a34a">Nodemailer</span> for email communication. Designed to showcase projects, skills, and contact info in a responsive and engaging layout.
  </p>`,
    tags: ["Next.js", "Framer Motion", "Material UI", "Nodemailer"],
    image: "images/image2.png", // Replace with your actual image path
    video: "/Videos/secondVideo.mp4", // Replace with your actual video path
    github: "https://github.com/your-username/portfolio", // Replace with your actual GitHub repo
    live: "https://your-portfolio-domain.com" // Replace with your deployed portfolio URL
  },

  // {
  //   id: 3,
  //   title: "AI Image Generator",
  //   description: "Web application that generates images from text prompts using machine learning models.",
  //   tags: ["Python", "TensorFlow", "Flask", "React"],
  //   image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  //   video: "https://example.com/videos/ecommerce-demo.mp4",
  //   github: "#",
  //   live: "#"
  // },
  // {
  //   id: 4,
  //   title: "Social Media Dashboard",
  //   description: "Analytics dashboard for social media metrics with real-time data visualization.",
  //   tags: ["React", "GraphQL", "D3.js", "Node.js"],
  //   image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  //   video: "https://example.com/videos/ecommerce-demo.mp4",
  //   github: "#",
  //   live: "#"
  // },
  // {
  //   id: 5,
  //   title: "Health & Fitness Tracker",
  //   description: "Mobile-first application for tracking workouts, nutrition, and health metrics.",
  //   tags: ["React Native", "Firebase", "Redux", "Expo"],
  //   image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  //   video: "https://example.com/videos/ecommerce-demo.mp4",
  //   github: "#",
  //   live: "#"
  // },
  // {
  //   id: 6,
  //   title: "Real Estate Platform",
  //   description: "Property listing platform with map integration, advanced filters, and virtual tours.",
  //   tags: ["Next.js", "Mapbox", "MongoDB", "Node.js"],
  //   image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
  //   video: "https://example.com/videos/ecommerce-demo.mp4",
  //   github: "#",
  //   live: "#"
  // }
];

export const Projects = () => {
  const theme = useTheme();
  const { darkMode } = useThemeContext();
  const containerRef = useRef<HTMLDivElement>(null!);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const openVideoModal = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setIsPlaying(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation to complete
  };

  return (
    <Box
      id="projects"
      component="section"
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        padding: { xs: '80px 20px', md: '120px 60px' },
        position: 'relative',
        overflow: 'hidden',
        background: darkMode ? 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' : 'radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)',
      }}
    >
      {/* Animated background elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent)`,
            opacity: 0.1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main container */}
      <Box sx={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        paddingLeft: { md: '100px' }
      }}>
        {/* Vertical animated line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50px',
            top: 0,
            bottom: 0,
            width: '4px',
            background: theme.palette.background.paper,
            borderRadius: '2px',
            display: 'block'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: lineHeight,
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            }}
          />
        </motion.div>

        {/* Section header */}
        <Box sx={{
          textAlign: 'center',
          mb: { xs: 4, md: 8 },
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              Featured Projects
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              Selected work showcasing my skills and experience
            </Typography>
          </motion.div>
        </Box>

        {/* Projects list */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {projectsData.map((project, index) => (
            <Box
              key={project.id}
              sx={{
                mb: { xs: 8, md: 12 },
                position: 'relative'
              }}
            >
              {/* Project dot on the line */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  position: 'absolute',
                  // left: { xs: 0, md: '46px' },
                  top: '40px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  border: `2px solid ${theme.palette.background.paper}`,
                  display: 'block',
                  zIndex: 2
                }}
              />

              <Grid
                container
                spacing={6}
                alignItems="center"
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                sx={{ position: 'relative' }}
              >
                {/* Project image with video play button */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: `0 20px 40px ${darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                        position: 'relative',
                        cursor: 'pointer',
                        '&:hover img': {
                          transform: 'scale(1.03)'
                        },
                        '&:hover .play-button': {
                          transform: 'scale(1.1)',
                          opacity: 1
                        }
                      }}
                      onClick={() => openVideoModal(project)}
                    >
                      <Box
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          display: 'block'
                        }}
                      />
                      {/* Gradient overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(to bottom, transparent 60%, ${darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)'})`
                        }}
                        className="play-button"
                      />
                      {/* Play button */}
                      <motion.div

                        initial={{ opacity: 0.8 }}
                        whileHover={{ scale: 1.1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 30px ${theme.palette.primary.main}80`,
                          cursor: 'pointer'
                        }}
                      >
                        <FaPlay size={32} color="#fff" />
                      </motion.div>
                      {/* Tags */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 3,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        {project.tags.map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              background: theme.palette.background.paper,
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                {/* Project content */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.text.primary,
                          fontSize: { xs: '1.8rem', md: '2.2rem' }
                        }}
                      >
                        {project.title}
                      </Typography>

                      <Box
                        sx={{
                          mb: 3,
                          color: theme.palette.text.secondary,
                          lineHeight: 1.8,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          '& .font-bold': {
                            fontWeight: 700
                          },
                          '& a': {
                            color: theme.palette.primary.main,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }
                        }}
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<FaGithub />}
                            sx={{
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              borderRadius: '12px',
                              padding: '10px 24px',
                              fontWeight: 600,
                              textTransform: 'none',
                              boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                              '&:hover': {
                                boxShadow: `0 6px 24px ${theme.palette.primary.main}50`
                              }
                            }}
                          >
                            Code
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outlined"
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<FaExternalLinkAlt />}
                            sx={{
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              borderRadius: '12px',
                              padding: '10px 24px',
                              fontWeight: 600,
                              textTransform: 'none',
                              '&:hover': {
                                background: `${theme.palette.primary.main}10`,
                                borderColor: theme.palette.primary.dark,
                                color: theme.palette.primary.dark
                              }
                            }}
                          >
                            Live Demo
                          </Button>
                        </motion.div>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            open={!!selectedProject}
            onClose={closeVideoModal}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                position: 'relative',
                width: '80vw',
                maxWidth: '1200px',
                maxHeight: '90vh',
                outline: 'none'
              }}
            >
              {/* Close button */}
              <motion.div
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  zIndex: 1
                }}
              >
                <IconButton
                  onClick={closeVideoModal}
                  sx={{
                    color: theme.palette.common.white,
                    background: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.7)'
                    }
                  }}
                >
                  <FaTimes />
                </IconButton>
              </motion.div>

              {/* Video player with glowing border */}
              <motion.div
                style={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: `0 0 40px ${theme.palette.primary.main}80`
                }}
                animate={{
                  boxShadow: [
                    `0 0 30px ${theme.palette.primary.main}80`,
                    `0 0 50px ${theme.palette.secondary.main}80`,
                    `0 0 30px ${theme.palette.primary.main}80`
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <ReactPlayer
                  url={selectedProject.video}
                  playing={isPlaying}
                  controls={true}
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </motion.div>

              {/* Project info */}
              <Box sx={{
                mt: 3,
                p: 3,
                background: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px'
              }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                  {selectedProject.title}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {selectedProject.description}
                </Typography>
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </Box>
  );
};