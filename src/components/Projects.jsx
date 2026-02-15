import { useState } from 'react';
import { FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            category: 'Game Development / C++',
            title: 'Mario Game',
            description: 'This project is based on C++ using graphic library SDL. Associated with Pulchowk Engineering College. (Sep 2011 – Present)',
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
        },
        {
            category: 'Embedded Systems',
            title: 'Maximum Power Point Tracking (MPPT)',
            description: 'MPPT embedded in the solar charge controller to track maximum power at given radiation and temperature. Implemented Perturb and Observe algorithm for economy and reliability. Associated with Pulchowk Engineering College. (Sep 2012 – Sep 2013)',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
        },
    ];

    return (
        <section className="projects section" id="projects">
            <h2 className="section-title">
                Key <span>Projects</span>
            </h2>
            <p className="section-subtitle">Highlights from my work</p>

            <div className="projects-grid" style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '30px'
            }}>
                {projects.map((project, index) => (
                    <div className="project-card" key={index} style={{
                        flex: '0 0 320px',
                        maxWidth: '350px'
                    }}>
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                            <div className="project-overlay">
                                <div className="project-nav-arrows">
                                    <span className="arrow-btn"><FaChevronLeft /></span>
                                    <span className="arrow-btn"><FaChevronRight /></span>
                                </div>
                            </div>
                        </div>
                        <div className="project-info">
                            <span className="project-category">{project.category}</span>
                            <h4 className="project-title">{project.title}</h4>
                            {/* Description hidden in main view */}
                            <button
                                className="project-link"
                                onClick={() => setSelectedProject(project)}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: '10px' }}
                            >
                                View Details <FaExternalLinkAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                            <FaTimes />
                        </button>
                        <div className="modal-image-wrapper">
                            <img src={selectedProject.image} alt={selectedProject.title} />
                        </div>
                        <div className="modal-info-content">
                            <span className="project-category">{selectedProject.category}</span>
                            <h3 className="modal-title">{selectedProject.title}</h3>
                            <p className="modal-desc">{selectedProject.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
