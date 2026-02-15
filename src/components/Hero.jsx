import { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = [
        "Senior Electrical Engineer",
        "Power Distribution Expert",
        "Renewable Energy Consultant",
        "Project Supervisor"
    ];

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            if (isDeleting) {
                setText(fullText.substring(0, text.length - 1));
                setTypingSpeed(100);
            } else {
                setText(fullText.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && text === fullText) {
                // Pause at the end of the word
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500); // Pause before typing next word
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    return (
        <section className="hero section" id="home">
            <div className="hero-content">
                <p className="hero-greeting">Hello, It's Me</p>
                <h1 className="hero-name">Niroj Bhujel</h1>
                <h3 className="hero-role">
                    And I'm a <span className="typing-text">{text}</span><span className="cursor">|</span>
                </h3>
                <p className="hero-description">
                    Senior Electrical Engineer at National Vigilance Center with over 11 years of experience in hydro power, transmission lines, solar, and wind power projects.
                    Specialized in project supervision, licensing, and power distribution.
                </p>
                <div className="hero-socials">
                    <a href="https://www.linkedin.com/in/niroj-bhujel-1b303498/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://www.facebook.com/niroj.bhujel.1" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/nirojbhujel/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="mailto:bhujelniroj@gmail.com" className="social-icon" aria-label="Email">
                        <FaEnvelope />
                    </a>
                </div>
                <a href="#contact" className="hero-btn">Contact Me</a>
            </div>
            <div className="hero-image">
                <div className="hero-img-wrapper">
                    <img src="/jijaji.jpg" alt="Niroj Bhujel" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
