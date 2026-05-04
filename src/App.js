import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';

const h = React.createElement;
const A = 'assets/Hero/';
const S = 'assets/OurStory/';
const SC = 'assets/Schedule/';
const LC = 'assets/location/location_assets_html/';
const DC = 'assets/dress_code_assets_white_bg/';
const DCP = `${DC}color_palette_assets_no_text/`;
const DCLG = `${DC}ladies_gentlemen_icons_assets/`;
const DCVN = `${DC}venue_note_assets_no_text/`;
const donutImage = `${SC}donut-cake.png`;

// 0. Global Frame Layer (Fixed Corner Flowers)
function GlobalFrame() {
  const S = 'assets/OurStory/';
  const A = 'assets/Hero/';

  return h(
    'div',
    { className: 'global-frame-container', style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 } },
    h(motion.img, {
      src: `${A}hero-flower-top-left.png`,
      className: 'frame-flower top-left',
      style: { position: 'absolute', top: '-1%', left: '0%', width: 'min(35vw, 240px)', mixBlendMode: 'multiply' },
      animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
      transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
    }),
    h(motion.img, {
      src: `${A}hero-flower-top-right.png`,
      className: 'frame-flower top-right',
      style: { position: 'absolute', top: '-1%', right: '0%', width: 'min(35vw, 240px)', mixBlendMode: 'multiply' },
      animate: { y: [0, -8, 0], rotate: [0, -2, 0] },
      transition: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }
    }),
    h(motion.img, {
      src: `${A}hero-flower-bottom-left.png`,
      className: 'frame-flower bottom-left',
      style: { position: 'absolute', bottom: '-2%', left: '0%', width: 'min(35vw, 240px)', mixBlendMode: 'multiply' },
      animate: { y: [0, 8, 0], rotate: [0, -2, 0] },
      transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
    }),
    h(motion.img, {
      src: `${A}hero-flower-bottom-right.png`,
      className: 'frame-flower bottom-right',
      style: { position: 'absolute', bottom: '-3%', right: '0%', width: 'min(35vw, 240px)', mixBlendMode: 'multiply' },
      animate: { y: [0, 10, 0], rotate: [0, 2, 0] },
      transition: { duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }
    })
  );
}

// 0. Global Petals Layer
function Petals() {
  return h(
    'div',
    {
      className: 'global-petals-container',
      style: { pointerEvents: 'none' }
    },
    h(motion.img, {
      src: `${A}petal-10.png`,
      className: 'hero-layer hero-petal petal-back-1',
      style: { width: '18px', top: '15%', left: '30%', opacity: 0.4, zIndex: 5, mixBlendMode: 'multiply', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' },
      animate: { y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 45, 0] },
      transition: { duration: 25, repeat: Infinity, ease: 'linear' }
    }),
    h(motion.img, {
      src: `${A}petal-11.png`,
      className: 'hero-layer hero-petal petal-back-2',
      style: { width: '16px', top: '45%', right: '20%', opacity: 0.3, zIndex: 5, mixBlendMode: 'multiply', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' },
      animate: { y: [0, 40, 0], x: [0, -15, 0], rotate: [0, -60, 0] },
      transition: { duration: 30, repeat: Infinity, ease: 'linear', delay: 2 }
    }),
    h(motion.img, {
      src: `${A}petal-04.png`,
      className: 'hero-layer hero-petal petal-mid-1',
      style: { width: '30px', top: '35%', left: '45%', opacity: 0.8, zIndex: 25, mixBlendMode: 'multiply', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' },
      animate: { y: [0, -20, 20, 0], x: [0, 15, -15, 0], rotate: [0, 360] },
      transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
    }),
    h(motion.img, {
      src: `${A}petal-08.png`,
      className: 'hero-layer hero-petal petal-mid-2',
      style: { width: '28px', top: '55%', right: '35%', opacity: 0.7, zIndex: 25, mixBlendMode: 'multiply', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' },
      animate: { y: [0, 30, -10, 0], x: [0, -20, 10, 0], rotate: [0, -120, 0] },
      transition: { duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }
    }),
    h(motion.img, {
      src: `${A}petal-03.png`,
      className: 'hero-layer hero-petal petal-front-1',
      style: { width: '55px', top: '10%', left: '5%', opacity: 0.9, zIndex: 45, mixBlendMode: 'multiply', transform: 'translateZ(0)', WebkitBackfaceVisibility: 'hidden' },
      animate: { y: [0, 40, 0], x: [0, 30, 0], rotate: [10, 25, 10] },
      transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
    })
  );
}

function Loader({ hidden }) {
  return h(
    motion.div,
    {
      className: 'loader-wrapper',
      animate: { opacity: hidden ? 0 : 1, visibility: hidden ? 'hidden' : 'visible' },
      transition: { duration: 0.8 },
      'aria-hidden': hidden,
    },
    h('div', { className: 'spinner' }),
  );
}

function Hero() {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    // Safety fallback: Force unlock scroll after 3.5 seconds
    const safetyTimer = setTimeout(() => setCanScroll(true), 3500);

    if (!canScroll) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => clearTimeout(safetyTimer);
  }, [canScroll]);

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0]);
  const namesY = useTransform(scrollYProgress, [0, 0.24], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 0.24], [0, -80]);
  const flowersY = useTransform(scrollYProgress, [0, 0.24], [0, 100]);

  // Our Story ranges (shifted for 1000vh)
  const storyY = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.48], ['100vh', '0vh', '0vh', '-20vh']);
  const storyScale = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.416], [0.95, 1, 1, 0.95]);
  const storyBlur = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.416], ['10px', '0px', '0px', '5px']);
  const storyOpacity = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.416], [0, 1, 1, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.176, 0.224, 0.36, 0.4], [0, 1, 1, 0]);
  const storyVideoOpacity = useTransform(scrollYProgress, [0.192, 0.24, 0.36, 0.4], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.208, 0.256, 0.36, 0.4], [0, 1, 1, 0]);

  const titleY = useTransform(scrollYProgress, [0.176, 0.224, 0.36, 0.4], [40, 0, 0, -40]);
  const videoY = useTransform(scrollYProgress, [0.192, 0.24, 0.36, 0.4], [80, 0, 0, -80]);
  const textY = useTransform(scrollYProgress, [0.208, 0.256, 0.36, 0.4], [40, 0, 0, -40]);

  // Schedule ranges (shifted for 1000vh)
  const scheduleY = useTransform(scrollYProgress, [0.336, 0.416, 0.6, 0.68], ['100vh', '0vh', '0vh', '0vh']);
  const scheduleOpacity = useTransform(scrollYProgress, [0.336, 0.44, 0.576, 0.704], [0, 1, 1, 0]);
  
  const scheduleFlowerOpacity = useTransform(scrollYProgress, [0.336, 0.4], [0, 1]);
  const scheduleFlowerY = useTransform(scrollYProgress, [0.336, 0.416], [40, 0]);

  const scheduleDonutY = useTransform(scrollYProgress, [0.416, 0.52, 0.704], [40, 0, -20]);
  const scheduleListOpacity = useTransform(scrollYProgress, [0.44, 0.544, 0.704], [0, 1, 0]);
  const scheduleListY = useTransform(scrollYProgress, [0.44, 0.544, 0.72], [40, 0, 0]);

  // Location ranges (shifted for 1000vh)
  const locationY = useTransform(scrollYProgress, [0.624, 0.704, 0.8], ['100vh', '0vh', '0vh']);
  const locationOpacity = useTransform(scrollYProgress, [0.624, 0.704, 0.82], [0, 1, 0]);
  const locationPhotoOpacity = useTransform(scrollYProgress, [0.624, 0.704, 0.8], [0, 1, 1]);
  const locationPhotoScale = useTransform(scrollYProgress, [0.624, 0.704, 0.8], [0.95, 1, 1]);
  
  const locationLabelY = useTransform(scrollYProgress, [0.656, 0.72, 0.8], [60, 0, 0]);
  const locationLabelOpacity = useTransform(scrollYProgress, [0.656, 0.72, 0.8], [0, 1, 1]);
  
  const locationContentY = useTransform(scrollYProgress, [0.624, 0.704, 0.8], [40, 0, 0]);
  const locationPhotoY = useTransform(scrollYProgress, [0.72, 0.8], ['5%', '-5%']);

  // Dress Code ranges (0.78 to 1.0)
  const dressCodeY = useTransform(scrollYProgress, [0.78, 0.88, 1], ['100vh', '0vh', '0vh']);
  const dressCodeOpacity = useTransform(scrollYProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const dressCodeContentY = useTransform(scrollYProgress, [0.8, 0.9, 1], [40, 0, 0]);


  useEffect(() => {
    const fallback = window.setTimeout(() => setLoaderHidden(true), 400);
    return () => window.clearTimeout(fallback);
  }, []);

  const toggleMusic = () => {
    const bgMusic = document.getElementById('bg-music');
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(() => console.log('Audio play failed'));
    }
    setIsPlaying((current) => !current);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return h(
    React.Fragment,
    null,
    h(Loader, { hidden: loaderHidden }),
    h(
      motion.main,
      {
        className: 'e-card wedding-hero',
        id: 'hero',
        style: { scale: heroScale }
      },
      h(motion.div, {
        variants: containerVariants,
        initial: 'hidden',
        animate: 'visible',
        className: 'hero-layers-container'
      },
        h(motion.div, { className: 'hero-gold-dots hero-gold-dots-left', variants: itemVariants }),
        h(motion.div, { className: 'hero-gold-dots hero-gold-dots-right', variants: itemVariants }),

        h(motion.div, {
          className: 'hero-content-fading-wrapper',
          style: { opacity: heroContentOpacity, width: '100%', height: '100%', position: 'absolute', pointerEvents: 'none' }
        },
          h(motion.img, {
            src: `${A}hero-ornament-heart.png`,
            className: 'hero-layer hero-heart-ornament',
            variants: itemVariants,
            style: { y: namesY, mixBlendMode: 'multiply' }
          }),

          h(motion.img, {
            src: `${A}hero-names-img.png`,
            className: 'hero-layer hero-names-image',
            variants: itemVariants,
            style: { y: namesY, mixBlendMode: 'multiply' }
          }),

          h(
            motion.div,
            {
              className: 'hero-main-content',
              variants: itemVariants,
              style: { y: contentY }
            },
            h(
              motion.p,
              { className: 'hero-invite', variants: itemVariants },
              'Together with our families,',
              h('br'),
              'we invite you to celebrate our wedding day'
            ),
            h(motion.div, { className: 'hero-date-wrapper', variants: itemVariants },
              h(motion.img, { src: `${A}date-side-ornament.png`, className: 'hero-date-ornament', style: { mixBlendMode: 'multiply' } }),
              h('div', { className: 'hero-date' }, '09.01.27'),
              h(motion.img, { src: `${A}date-side-ornament.png`, className: 'hero-date-ornament hero-mirror', style: { mixBlendMode: 'multiply' } })
            )
          ),

          h(motion.img, {
            src: `${A}gold-line.png.png`,
            className: 'hero-layer hero-gold-line',
            variants: itemVariants,
            style: { mixBlendMode: 'multiply' }
          })
        ),

        // Hero Video - Moved out of wrapper to fix Blend Mode
        h(motion.div, {
          className: 'hero-layer hero-floral-arch-video-container',
          variants: itemVariants,
          onAnimationComplete: () => setCanScroll(true),
          style: { opacity: heroContentOpacity, y: contentY, mixBlendMode: 'multiply' }
        },
          h('video', {
            src: `${A}Floral_arch_animation_gentle_breeze_202605031322.mp4`,
            className: 'hero-floral-arch-video',
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            style: { mixBlendMode: 'multiply' }
          })
        ),

        h(motion.img, {
          src: `${A}watercolor-shadow-left.png`,
          className: 'hero-layer hero-shadow hero-shadow-left',
          variants: itemVariants,
          style: { opacity: 1, mixBlendMode: 'multiply' },
          animate: { scale: [1, 1.03, 1], opacity: [0.6, 0.75, 0.6] },
          transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
        }),
        h(motion.img, {
          src: `${A}watercolor-shadow-right.png`,
          className: 'hero-layer hero-shadow hero-shadow-right',
          variants: itemVariants,
          style: { opacity: 1, mixBlendMode: 'multiply' },
          animate: { scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] },
          transition: { duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }
        })
      ),

      // NEW: Our Story Side Shadows (Focused on Text Area - Anchored to Bottom)
      h(motion.img, {
        src: `${S}ourstory-watercolor-shadow-left.png`,
        className: 'story-shadow story-shadow-left',
        style: {
          position: 'absolute',
          bottom: 0, // Anchored to the very bottom
          left: 0,
          height: '45vh', // Slightly increased height to frame the text better from the bottom
          width: 'auto',
          mixBlendMode: 'multiply',
          opacity: storyOpacity,
          x: useTransform(scrollYProgress, [0.2, 0.45], ['-40%', '0%']),
          zIndex: 9
        },
      }),
      h(motion.img, {
        src: `${S}ourstory-watercolor-shadow-right.png`,
        className: 'story-shadow story-shadow-right',
        style: {
          position: 'absolute',
          bottom: 0, // Anchored to the very bottom
          right: 0,
          height: '45vh', // Slightly increased height to frame the text better from the bottom
          width: 'auto',
          mixBlendMode: 'multiply',
          opacity: storyOpacity,
          x: useTransform(scrollYProgress, [0.2, 0.45], ['40%', '0%']),
          zIndex: 9
        },
      }),

      // Integrated Our Story content inside the same sticky div
      h(
        motion.div,
        {
          className: 'our-story-integrated-wrapper',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            y: storyY,
            scale: storyScale,
            filter: `blur(${storyBlur})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            mixBlendMode: 'multiply'
          }
        },

        h(motion.img, {
          src: `${S}ourstory-ornament-top.png`,
          className: 'story-ornament story-ornament-top',
          style: { mixBlendMode: 'multiply', opacity: titleOpacity, y: titleY },
        }),
        h(motion.img, {
          src: `${S}ourstory-title.png`,
          className: 'story-title',
          style: { mixBlendMode: 'multiply', opacity: titleOpacity, y: titleY },
        }),
        h(motion.img, {
          src: `${S}ourstory-ornament-middle.png`,
          className: 'story-ornament story-ornament-mid',
          style: { mixBlendMode: 'multiply', opacity: titleOpacity, y: titleY },
        }),

        h(motion.div, {
          className: 'story-video-container-wide',
          style: { mixBlendMode: 'multiply', y: videoY }
        },
          h(motion.video, {
            src: `${S}0503 (1).mp4`,
            className: 'story-video',
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            style: { mixBlendMode: 'multiply', opacity: storyVideoOpacity }
          })
        ),

        h(
          motion.div,
          { className: 'story-text-container', style: { opacity: textOpacity, y: textY } },
          h('p', null, 'จากวันแรกที่เราได้พบกัน'),
          h('p', null, 'เรื่องราวของเราค่อย ๆ เติบโต'),
          h('p', null, 'เต็มไปด้วยรอยยิ้ม ความอบอุ่น'),
          h('p', null, 'และวันนี้ เราพร้อมเริ่มต้นบทใหม่ไปด้วยกัน')
        ),

        h(motion.img, {
          src: `${S}ourstory-ornament-bottom.png`,
          className: 'story-ornament story-ornament-bottom-divider',
          style: { mixBlendMode: 'multiply', opacity: textOpacity, y: textY },
        })
      ),

      // SCHEDULE SECTION
      h(
        motion.div,
        {
          className: 'schedule-integrated-wrapper',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            y: scheduleY,
            opacity: scheduleOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            paddingTop: '10vh',
            mixBlendMode: 'multiply'
          }
        },
        // Schedule Top Ornaments
        h(motion.img, {
          src: `${S}ourstory-ornament-top.png`, // Reusing ornaments for consistency
          style: { width: '150px', mixBlendMode: 'multiply', marginBottom: '-10px' }
        }),
        // Schedule Title Image
        h(motion.img, {
          src: `${SC}schedule-title.png`,
          className: 'schedule-title-img',
          style: { width: 'min(75vw, 380px)', marginTop: '10px' }
        }),
        h(motion.img, {
          src: `${S}ourstory-ornament-middle.png`,
          style: { width: '120px', mixBlendMode: 'multiply', margin: '5px 0' }
        }),
        h('div', { 
          className: 'schedule-date',
          style: { 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'min(7vw, 28px)', 
            letterSpacing: '0.2em',
            margin: '5px 0 25px'
          }
        }, '09.01.27'),

        // Side Flowers (Align with Title)
        h(motion.img, {
          src: `${SC}schedule-flower-left.png`,
          className: 'schedule-side-flower left',
          style: { 
            position: 'absolute', 
            left: '-15%', 
            top: '10vh', 
            width: 'min(50vw, 360px)', 
            x: useTransform(scrollYProgress, [0.42, 0.52, 1], ['-60%', '0%', '0%']),
            opacity: scheduleFlowerOpacity,
            zIndex: 1
          }
        }),
        h(motion.img, {
          src: `${SC}schedule-flower-right.png`,
          className: 'schedule-side-flower right',
          style: { 
            position: 'absolute', 
            right: '-18%', 
            top: '10vh', 
            width: 'min(50vw, 360px)', 
            x: useTransform(scrollYProgress, [0.42, 0.52, 1], ['60%', '0%', '0%']),
            opacity: scheduleFlowerOpacity,
            zIndex: 1
          }
        }),

        // Schedule List
        h(motion.div, {
          className: 'schedule-list',
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: true, amount: 0.2 },
          variants: {
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          },
          style: { 
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '380px',
            marginTop: '20px',
            marginLeft: '-35px',
            zIndex: 5
          }
        },
          [
            { time: '07.00 น.', event: 'พิธีสงฆ์' },
            { time: '08.00 น.', event: 'พิธีแห่ขันหมาก' },
            { time: '09.09 น.', event: 'พิธีปูสินสอด / พิธีหมั้น' },
            { time: '09.30 น.', event: 'พิธีผูกมือ' },
            { time: '10.00 น.', event: 'รับประทานอาหาร' }
          ].map((item, idx) => 
            h(motion.div, { 
              key: idx,
              className: 'schedule-row',
              variants: {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              },
              transition: { duration: 0.6, ease: 'easeOut' },
              style: { 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '15px', 
                width: '100%' 
              }
            },
              h('div', { 
                className: 'schedule-time',
                style: { 
                  flex: '1', 
                  textAlign: 'right',
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '14px',
                  color: 'var(--clr-text-main)',
                  opacity: 0.8
                }
              }, item.time),
              h('div', { 
                className: 'schedule-divider',
                style: { 
                  width: '1.5px', 
                  height: '20px', 
                  backgroundColor: 'rgba(194, 163, 107, 0.8)' 
                }
              }),
              h('div', { 
                className: 'schedule-event',
                style: { 
                  flex: '1', 
                  textAlign: 'left',
                  fontFamily: 'var(--font-thai)', 
                  fontSize: '14px',
                  color: 'var(--clr-text-main)'
                }
              }, item.event)
            )
          )
        ),

        // Donut Stack Image
        h(motion.img, {
          src: donutImage,
          className: 'schedule-donut-stack',
          style: { 
            width: 'min(85vw, 420px)', 
            marginTop: '0vh', 
            y: scheduleDonutY,
            position: 'relative',
            zIndex: 2,
            display: 'block',
            filter: 'contrast(1.05) brightness(1.05)'
          }
        })
      ),

      // LOCATION SECTION
      h(
        motion.div,
        {
          className: 'location-integrated-wrapper',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            y: locationY,
            opacity: locationOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '8vh',
            zIndex: 20,
            backgroundColor: 'transparent'
          }
        },
        // Location Title (Image from components)
        h(motion.img, {
          src: `${LC}01_location_title_white.png`,
          style: { width: 'min(75vw, 420px)', marginBottom: '20px', mixBlendMode: 'multiply', y: locationContentY }
        }),

        // Photo Wrap (Decorative vaulted frame)
        h('div', { 
          className: 'location-photo-wrap',
          style: { 
            position: 'relative', 
            width: '86%', 
            maxWidth: '500px',
            aspectRatio: '900/980',
            marginTop: '-2vh',
            zIndex: 11
          }
        },
          // 1. Masked Photo Container
          h(motion.div, {
            className: 'photo-mask-inner',
            style: {
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              WebkitMaskImage: `url(${LC}10_photo_mask.svg)`,
              maskImage: `url(${LC}10_photo_mask.svg)`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              opacity: locationPhotoOpacity,
              scale: locationPhotoScale
            }
          },
            h(motion.img, {
              src: `${LC}bg.png`,
              className: 'location-photo',
              style: { 
                position: 'absolute', 
                inset: '-20% 0', 
                width: '100%', 
                height: '140%', 
                objectFit: 'cover',
                objectPosition: 'center 80%',
                y: locationPhotoY
              }
            })
          ),
          // 2. Gold Frame (On top and unclipped)
          h(motion.img, {
            src: `${LC}10_photo_frame_gold.svg`,
            style: { 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none',
              opacity: locationPhotoOpacity
            }
          }),
          // Decorative Flowers
          h(motion.img, {
            src: `${LC}04_left_sunflower_cluster_white.png`,
            style: { 
              position: 'absolute', 
              left: '-3%', 
              top: '-1%', 
              width: '40%', 
              mixBlendMode: 'multiply',
              scale: 1,
              originX: 0,
              originY: 0
            }
          }),
          h(motion.img, {
            src: `${LC}05_right_sunflower_cluster_white.png`,
            style: { 
              position: 'absolute', 
              right: '-12%', 
              bottom: '-8%', 
              width: '40%', 
              mixBlendMode: 'multiply', 
              zIndex: 12,
              scale: 1,
              originX: 1,
              originY: 1
            }
          })
        ),

        // Label Section (Bottom info frame) - Moving it up to overlap the photo
        h(motion.div, {
          className: 'location-label-wrap',
          style: { 
            position: 'relative', 
            width: '70%',
            maxWidth: '340px', 
            marginTop: '-25px',
            zIndex: 10,
            y: locationLabelY,
            opacity: locationLabelOpacity
          }
        },
          h('img', {
            src: `${LC}11_location_label_frame_gold.svg`,
            style: { width: '100%', display: 'block' }
          }),
          h('div', {
            className: 'location-label-content',
            style: { 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#55705a',
              paddingTop: '0%',
              paddingBottom: '1%'
            }
          },
            h('p', { style: { margin: '2px 0', fontSize: 'min(4.5vw, 18px)', letterSpacing: '0.1em' } }, 'Sa Kaeo'),
            h('img', { src: `${S}ourstory-ornament-middle.png`, style: { width: '100px', margin: '5px 0', mixBlendMode: 'multiply' } }),
            h('a', { 
              href: 'https://maps.app.goo.gl/3fFvS6kU3M2P9z8o8', 
              target: '_blank',
              style: { 
                color: '#c99c52', 
                textDecoration: 'none', 
                fontSize: 'min(3.8vw, 15px)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic'
              } 
            }, 
              h(motion.span, { 
                className: 'material-symbols-outlined', 
                style: { fontSize: '20px' },
                animate: { y: [0, -4, 0] },
                transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }, 'location_on'),
              'Tap for Directions'
            )
          )
        )
      ),

      // DRESS CODE SECTION
      h(
        motion.div,
        {
          className: 'dress-code-integrated-wrapper',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            y: dressCodeY,
            opacity: dressCodeOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '6vh',
            zIndex: 25,
            backgroundColor: 'transparent'
          }
        },
        // Background Ribbon
        h(motion.img, {
          src: `${DC}12_pink_ribbon_back.png`,
          style: { 
            position: 'absolute', 
            top: '5%', 
            width: '100%', 
            mixBlendMode: 'multiply', 
            zIndex: -1,
            opacity: 0.6
          }
        }),

        // Title
        h('div', { 
          style: { 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '15px', 
            width: '90%', 
            marginBottom: '10px',
            y: dressCodeContentY,
            position: 'relative',
            zIndex: 2
          } 
        },
          h(motion.img, { src: `${DCP}01_gold_flourish_left.png`, style: { width: '60px', mixBlendMode: 'multiply' } }),
          h(motion.img, { src: `${DC}01b_title_dress_code_text.png`, style: { width: 'min(50vw, 240px)', mixBlendMode: 'multiply' } }),
          h(motion.img, { src: `${DCP}02_gold_flourish_right.png`, style: { width: '60px', mixBlendMode: 'multiply' } })
        ),

        // Dress Visuals Wrap with Gold Arch Frame
        h('div', {
          className: 'dc-visuals-wrap',
          style: {
            position: 'relative',
            width: '85%',
            maxWidth: '420px',
            marginTop: '-1vh',
            marginBottom: '1vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        },
          // Flowers framing the dresses (Moved from bottom)
          h(motion.img, {
            src: `${DC}06_floral_left_lower.png`,
            style: { position: 'absolute', bottom: '-5%', left: '-12%', width: '45%', mixBlendMode: 'multiply', zIndex: 3 }
          }),
          h(motion.img, {
            src: `${DC}07_floral_right_lower_with_gold_flourish.png`,
            style: { position: 'absolute', bottom: '-8%', right: '-15%', width: '55%', mixBlendMode: 'multiply', zIndex: 3 }
          }),
          // Arch Frame
          h(motion.img, {
            src: `${DC}11_gold_arch_frame.png`,
            style: {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              zIndex: 1
            }
          }),
          // Dresses Row
          h('div', { 
            className: 'dc-visuals-row',
            style: { 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'flex-end', 
              gap: '5px',
              width: '80%',
              padding: '20px 0',
              position: 'relative',
              zIndex: 2
            }
          },
            h(motion.img, {
              src: `${DC}02_bride_dress.png`,
              style: { width: '48%', mixBlendMode: 'multiply' }
            }),
            h(motion.img, {
              src: `${DC}03_groom_suit_dark_green.png`,
              style: { width: '48%', mixBlendMode: 'multiply' }
            })
          )
        ),

        // Color Palette
        h('div', { className: 'dc-palette-container', style: { width: '90%', marginBottom: '2vh' } },
          h('div', { className: 'dc-palette-list' },
            [
              { src: '03_sage_green_texture_1x1.png', label: 'Sage' },
              { src: '04_ivory_texture_1x1.png', label: 'Ivory' },
              { src: '05_beige_texture_1x1.png', label: 'Beige' },
              { src: '06_dusty_pink_texture_1x1.png', label: 'Pink' },
              { src: '07_soft_peach_texture_1x1.png', label: 'Peach' },
              { src: '08_light_brown_texture_1x1.png', label: 'Brown' }
            ].map((c, idx) => 
              h('div', { key: idx, className: 'dc-palette-item' },
                h('img', { src: `${DCP}${c.src}`, className: 'dc-swatch', style: { mixBlendMode: 'multiply' } }),
                h('span', null, c.label)
              )
            )
          )
        ),

        // Ladies & Gentlemen Section
        h('div', { className: 'dc-lg-section', style: { width: '90%', marginBottom: '2vh' } },
          h('div', { className: 'dc-lg-item' },
            h('img', { src: `${DCLG}01_icon_ladies_dress.png`, className: 'dc-lg-icon', style: { mixBlendMode: 'multiply' } }),
            h('div', { className: 'dc-lg-text' },
              h('h4', null, 'LADIES'),
              h('p', null, 'Dresses in soft tones,', h('br'), 'satin, or light fabrics.')
            )
          ),
          h('img', { src: `${DCLG}03_vertical_divider_gold.png`, className: 'dc-lg-divider', style: { mixBlendMode: 'multiply' } }),
          h('div', { className: 'dc-lg-item' },
            h('img', { src: `${DCLG}02_icon_gentlemen_suit.png`, className: 'dc-lg-icon', style: { mixBlendMode: 'multiply' } }),
            h('div', { className: 'dc-lg-text' },
              h('h4', null, 'GENTLEMEN'),
              h('p', null, 'Suits or shirts in neutral', h('br'), 'or earthy tones.')
            )
          )
        ),

        // Venue Note Section
        h('div', { className: 'dc-venue-note', style: { width: '85%', position: 'relative' } },
          h('img', { src: `${DCVN}01_venue_note_outer_frame.png`, className: 'dc-vn-frame', style: { width: '100%', mixBlendMode: 'multiply' } }),
          h('div', { className: 'dc-vn-content' },
            h('img', { src: `${DCVN}02_high_heel_icon.png`, className: 'dc-vn-icon', style: { mixBlendMode: 'multiply' } }),
            h('div', { className: 'dc-vn-text' },
              h('h5', null, 'VENUE NOTE'),
              h('p', null, 'Outdoor garden venue with grass.', h('br'), 'Block heels or flats are recommended.')
            )
          ),
          h('img', { src: `${DCVN}03_bottom_flourish_divider.png`, className: 'dc-vn-bottom-divider', style: { mixBlendMode: 'multiply' } })
        )
      ),



      /* h(
        'nav',
        { className: 'top-nav' },
        h(
          motion.button,
          {
            className: `icon-btn music-btn ${isPlaying ? 'playing' : ''}`,
            onClick: toggleMusic,
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          },
          h('span', { className: 'material-symbols-outlined' }, isPlaying ? 'music_note' : 'music_off')
        )
      ) */
    )
  );
}

export default function App() {
  return h(
    'div',
    { className: 'card-container', style: { height: '1000vh' } },
    h(GlobalFrame),
    h(Petals),
    h(Hero)
  );
}
