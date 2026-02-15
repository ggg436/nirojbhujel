import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-copy">
                    © 2026 Niroj Bhujel. All Rights Reserved.
                </p>
                <div className="footer-links">
                    <span className="footer-designed">
                        <a href="https://www.linkedin.com/in/niroj-bhujel-1b303498/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                        <a href="https://www.facebook.com/niroj.bhujel.1" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>Facebook</a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
