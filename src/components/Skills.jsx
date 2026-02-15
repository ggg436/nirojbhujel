import { useState, useEffect, useRef } from 'react';
import { FaBolt, FaSolarPanel, FaIndustry, FaProjectDiagram } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
    const sectionRef = useRef(null);
    const audioContextRef = useRef(null);
    const [progressValues, setProgressValues] = useState({});
    const [hasAnimated, setHasAnimated] = useState(false);

    const skills = [
        { name: 'Electrical Engineering', percent: 95 },
        { name: 'Power Distribution', percent: 90 },
        { name: 'Project Supervision', percent: 85 },
        { name: 'AutoCAD / Design', percent: 80 },
        { name: 'Renewable Energy (Solar/Wind)', percent: 85 },
        { name: 'Technical Auditing', percent: 90 },
    ];

    const services = [
        {
            icon: <FaBolt />,
            title: 'Power Systems',
            desc: 'Analysis and design of electrical power systems and distribution networks.',
        },
        {
            icon: <FaSolarPanel />,
            title: 'Renewable Energy',
            desc: 'Expertise in Solar and Wind power project planning and licensing.',
        },
        {
            icon: <FaIndustry />,
            title: 'Hydro Power',
            desc: 'Supervision and technical auditing of hydro power generation projects.',
        },
        {
            icon: <FaProjectDiagram />,
            title: 'Project Management',
            desc: 'Leading engineering teams and ensuring project compliance and quality.',
        },
    ];

    const playTicSound = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            // Higher pitch "tic" sound
            osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);

            gain.connect(ctx.destination);
            osc.connect(gain);

            // Very short envelope
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.error("Audio playback error:", e);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    // Resume audio context if suspended (needed for some browsers)
                    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                        audioContextRef.current.resume();
                    }
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();
        let lastSoundTime = 0;

        const animate = (time) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic function for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const newValues = {};

            skills.forEach(skill => {
                newValues[skill.name] = Math.floor(skill.percent * easeProgress);
            });

            setProgressValues(newValues);

            // Play sound effect periodically during animation
            if (progress < 1 && time - lastSoundTime > 80) { // Throttle sound to avoid buzzing
                playTicSound();
                lastSoundTime = time;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure final values are set exactly
                const finalValues = {};
                skills.forEach(skill => {
                    finalValues[skill.name] = skill.percent;
                });
                setProgressValues(finalValues);
            }
        };

        requestAnimationFrame(animate);

    }, [hasAnimated]);

    return (
        <section className="skills section" id="skills" ref={sectionRef}>
            <h2 className="section-title">
                My <span>Skills</span>
            </h2>
            <p className="section-subtitle">Technical Expertise & Services</p>

            <div className="skills-bars">
                {skills.map((skill, index) => (
                    <div className="skill-item" key={index}>
                        <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percent">{progressValues[skill.name] || 0}%</span>
                        </div>
                        <div className="skill-bar">
                            <div
                                className="skill-progress"
                                style={{ width: `${progressValues[skill.name] || 0}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-icon">{service.icon}</div>
                        <h4 className="service-title">{service.title}</h4>
                        <p className="service-desc">{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
