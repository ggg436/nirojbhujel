import { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);
    const audioContextRef = useRef(null);

    // Initial values 0, target values defined in the effect
    const [counts, setCounts] = useState({
        years: 0,
        projects: 0,
        orgs: 0,
        commitment: 0
    });

    const playTicSound = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);

            gain.connect(ctx.destination);
            osc.connect(gain);

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            // Ignore audio errors
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !statsVisible) {
                    setStatsVisible(true);
                    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                        audioContextRef.current.resume();
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [statsVisible]);

    useEffect(() => {
        if (!statsVisible) return;

        const targets = {
            years: 11,
            projects: 50,
            orgs: 3,
            commitment: 100
        };

        const duration = 2000;
        const startTime = performance.now();
        let lastSoundTime = 0;

        const animate = (time) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const newCounts = {
                years: Math.floor(targets.years * easeProgress),
                projects: Math.floor(targets.projects * easeProgress),
                orgs: Math.floor(targets.orgs * easeProgress),
                commitment: Math.floor(targets.commitment * easeProgress)
            };

            setCounts(newCounts);

            if (progress < 1 && time - lastSoundTime > 100) {
                playTicSound();
                lastSoundTime = time;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCounts(targets);
            }
        };

        requestAnimationFrame(animate);

    }, [statsVisible]);

    return (
        <section className="about section" id="about">
            <h2 className="section-title">
                About <span>Me</span>
            </h2>
            <p className="section-subtitle">Professional Background</p>

            <div className="about-container">
                <div className="about-image">
                    <div className="about-img-wrapper">
                        <img src="/jijaji1.jpg" alt="About Niroj" />
                    </div>
                </div>

                <div className="about-content">
                    <h3 className="about-heading">Senior Electrical Engineer based in Kathmandu, Nepal</h3>
                    <p className="about-text">
                        I am a dedicated Electrical Engineer with a Bachelor's degree from the prestigious Pulchowk Campus (2009-2013).
                        Currently serving as a Senior Electrical Engineer at the National Vigilance Center since August 2019,
                        focusing on technical auditing and supervision of national projects.
                    </p>
                    <p className="about-text">
                        Previously, I worked as an Electrical Engineer at the Department of Electricity Development (4.5 years)
                        and Mahavir Shree International Pvt. Ltd. My expertise lies in hydro power, transmission lines,
                        solar & wind power projects, and licensing for power generation.
                    </p>

                    <div className="about-stats" ref={statsRef}>
                        <div className="stat-card">
                            <h4 className="stat-number">{counts.years}+</h4>
                            <p className="stat-label">Years Experience</p>
                        </div>
                        <div className="stat-card">
                            <h4 className="stat-number">{counts.projects}+</h4>
                            <p className="stat-label">Projects Supervised</p>
                        </div>
                        <div className="stat-card">
                            <h4 className="stat-number">{counts.orgs}</h4>
                            <p className="stat-label">Organizations</p>
                        </div>
                        <div className="stat-card">
                            <h4 className="stat-number">{counts.commitment}%</h4>
                            <p className="stat-label">Commitment</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
