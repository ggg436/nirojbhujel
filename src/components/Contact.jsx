import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="contact section" id="contact">
            <h2 className="section-title">
                Contact <span>Me</span>
            </h2>
            <p className="section-subtitle">Let's discuss your project</p>

            <div className="contact-container">
                <div className="contact-info">
                    <h3 className="contact-info-title">Get in Touch</h3>

                    <div className="contact-detail">
                        <div className="contact-icon">
                            <FaEnvelope />
                        </div>
                        <div>
                            <p className="contact-label">Email</p>
                            <a href="mailto:bhujelniroj@gmail.com" className="contact-value">bhujelniroj@gmail.com</a>
                        </div>
                    </div>

                    <div className="contact-detail">
                        <div className="contact-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <p className="contact-label">Location</p>
                            <p className="contact-value">Kathmandu, Nepal</p>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <a href="https://www.linkedin.com/in/niroj-bhujel-1b303498/" target="_blank" rel="noopener noreferrer" className="contact-social-icon"><FaLinkedinIn /></a>
                        <a href="https://www.facebook.com/niroj.bhujel.1" target="_blank" rel="noopener noreferrer" className="contact-social-icon"><FaFacebookF /></a>
                        <a href="https://www.instagram.com/nirojbhujel/" target="_blank" rel="noopener noreferrer" className="contact-social-icon"><FaInstagram /></a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input type="text" placeholder="Full Name" className="form-input" />
                        <input type="email" placeholder="Email Address" className="form-input" />
                    </div>
                    <input type="text" placeholder="Subject" className="form-input full-width" />
                    <textarea placeholder="Your Message" className="form-textarea" rows="6"></textarea>
                    <button type="submit" className="form-btn">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
