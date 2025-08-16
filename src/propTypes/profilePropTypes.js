import PropTypes from 'prop-types';

export const contactPropType = PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string
});

export const projectPropType = PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string
});

export const testimonialPropType = PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string
});

export const servicePropType = PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
});

export const profilePropType = PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    photo: PropTypes.string,
    about: PropTypes.string,
    contacts: PropTypes.arrayOf(contactPropType),
    skills: PropTypes.arrayOf(PropTypes.string),
    projects: PropTypes.arrayOf(projectPropType),
    testimonials: PropTypes.arrayOf(testimonialPropType),
    services: PropTypes.arrayOf(servicePropType),
    contactText: PropTypes.string,
    email: PropTypes.string
});
