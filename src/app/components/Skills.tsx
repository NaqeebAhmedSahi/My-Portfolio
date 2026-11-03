'use client';

import { useMemo, useRef } from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useThemeContext } from '@/app/theme/ThemeProvider';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql, SiPython, SiDjango,
  SiTensorflow, SiPhp, SiLaravel, SiGit, SiGithub,
  SiDocker, SiFirebase, SiGraphql, SiRedux, SiSass,
  SiTailwindcss, SiFigma, SiAdobexd, SiElectron, SiMysql,
  SiAmazons3, SiAwsamplify, SiOpenai, SiLangchain, SiGooglegemini
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { TbFileTextAi, TbVector } from 'react-icons/tb';

export const Skills = () => {
  const theme = useTheme();
  const { darkMode } = useThemeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 400], [5, -5]);
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    x.set(mx);
    y.set(my);
    container.style.setProperty('--mx', `${mx}px`);
    container.style.setProperty('--my', `${my}px`);
  };

  const floatingDots = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        size: Math.random() * 80 + 40,
        top: Math.random() * 100,
        left: Math.random() * 100,
        driftX: Math.random() * 80 - 40,
        driftY: Math.random() * 80 - 40,
        duration: Math.random() * 18 + 14,
      })),
    []
  );

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "React", icon: <SiReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
        { name: "Redux", icon: <SiRedux />, color: "#764ABC" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "Electron", icon: <SiElectron />, color: "#47848F" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
        { name: "Express", icon: <SiExpress />, color: "#000000" },
        { name: "Python", icon: <SiPython />, color: "#3776AB" },
        { name: "Django", icon: <SiDjango />, color: "#092E20" },
        { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
        { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      ]
    },
    {
      title: "AI/ML",
      skills: [
        { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
        { name: "OpenAI", icon: <SiOpenai />, color: "#10A37F" },
        { name: "LangChain", icon: <SiLangchain />, color: "#2DD4BF" },
        { name: "Gemini", icon: <SiGooglegemini />, color: "#8E75FF" },
        { name: "RAG", icon: <TbFileTextAi />, color: "#7C3AED" },
        { name: "Embeddings", icon: <TbVector />, color: "#0EA5E9" },
      ]
    },
    {
      title: "DevOps",
      skills: [
        { name: "Git", icon: <SiGit />, color: "#F05032" },
        { name: "GitHub", icon: <SiGithub />, color: "#181717" },
        { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
        { name: "GraphQL", icon: <SiGraphql />, color: "#E10098" },
        { name: "Amazon S3", icon: <SiAmazons3 />, color: "#569A31" },
        { name: "Amplify", icon: <SiAwsamplify />, color: "#FF9900" },
        { name: "Azure", icon: <VscAzure />, color: "#0078D4" },
      ]
    },
    {
      title: "Design",
      skills: [
        { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
        { name: "Adobe XD", icon: <SiAdobexd />, color: "#FF61F6" },
        { name: "Sass", icon: <SiSass />, color: "#CC6699" },
      ]
    }
  ];

  const allIcons = skillCategories.flatMap(category => category.skills);
  const duplicatedIcons = [...allIcons, ...allIcons];

  return (
    <Box
      id="skills"
      component="section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      sx={{
        minHeight: '100vh',
        padding: { xs: '80px 20px', md: '120px 60px' },
        position: 'relative',
        overflow: 'hidden',
        background: darkMode ? 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' : 'radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)',
      }}
    >
      {/* Floating gradient dots */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent)`,
            opacity: 0.1,
            top: `${dot.top}%`,
            left: `${dot.left}%`,
          }}
          animate={{
            y: [0, dot.driftY],
            x: [0, dot.driftX],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <Box sx={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              My Technical Skills
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
              Technologies Ive mastered and tools I use to create exceptional digital experiences
            </Typography>
          </motion.div>
        </Box>

        {/* Skill categories with 3D cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  perspective: '1000px',
                  height: '100%'
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Gradient border that follows mouse */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '24px',
                      padding: '2px',
                      background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), 
                        ${theme.palette.primary.main}80, transparent 70%)`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: 1,
                      pointerEvents: 'none',
                      transition: 'background 0.2s ease-out'
                    }}
                  />

                  <Box
                    sx={{
                      background: darkMode
                        ? 'rgba(30, 30, 30, 0.7)'
                        : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '22px',
                      padding: '24px',
                      height: '100%',
                      border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.primary.main,
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
                      {category.title}
                    </Typography>

                    <Grid container spacing={2}>
                      {category.skills.map((item) => (
                        <Grid item xs={6} key={item.name} component={motion.div}>
                          <motion.div
                            whileHover={{
                              y: -5,
                              transition: { type: 'spring', stiffness: 400, damping: 10 }
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Box
                              sx={{
                                background: darkMode
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(0, 0, 0, 0.03)',
                                borderRadius: '12px',
                                padding: '12px',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                  boxShadow: `0 8px 24px ${item.color}40`
                                }
                              }}
                            >
                              {/* item icon background glow */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  background: `radial-gradient(circle at center, ${item.color}10, transparent 70%)`,
                                  opacity: 0,
                                  transition: 'opacity 0.3s ease',
                                  '&:hover': {
                                    opacity: 1
                                  }
                                }}
                              />

                              <Box sx={{
                                fontSize: '2.5rem',
                                color: item.color,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {item.icon}
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  textAlign: 'center'
                                }}
                              >
                                {item.name}
                              </Typography>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Floating tech bubble showcase */}
        {/* Floating tech bubble showcase */}
        <Box sx={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
          mb: 8,
          borderRadius: '24px',
          background: darkMode
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(0, 0, 0, 0.03)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
        }}>
          <Typography
            variant="h5"
            component="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              pt: 4,
              color: theme.palette.text.primary
            }}
          >
            Technologies Ive Worked With
          </Typography>

          <Box
            sx={{
              display: 'flex',
              width: 'max-content',
              animation: 'skills-marquee 40s linear infinite',
              willChange: 'transform',
              '@keyframes skills-marquee': {
                from: { transform: 'translate3d(0, 0, 0)' },
                to: { transform: 'translate3d(-50%, 0, 0)' },
              },
            }}
          >
            {duplicatedIcons.map((item, index) => (
              <Box
                key={`${item.name}-${index}`}
                sx={{
                  margin: '0 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '80px',
                }}
              >
                <Box sx={{
                  fontSize: '48px',
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                }}>
                  {item.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 'medium',
                    color: theme.palette.text.secondary,
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};