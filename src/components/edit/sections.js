// src/components/profile/sections.js
import SkillsSection from "./sections/SkillsSection";
//import ContactsSection from "./ContactsSection";
//import ProjectsSection from "./ProjectsSection";
//import TestimonialsSection from "./TestimonialsSection";
//import ServicesSection from "./ServicesSection";
//import ContactTextSection from "./ContactTextSection";

export const OPTIONAL_SECTIONS = [
    { key: 'contacts', label: 'Contacts', defaultValue: [] },
    { key: 'skills', label: 'Skills', defaultValue: [], Component: SkillsSection},
    { key: 'projects', label: 'Projects', defaultValue: [] },
    { key: 'testimonials', label: 'Testimonials', defaultValue: [] },
    { key: 'services', label: 'Services', defaultValue: [] },
    { key: 'contactText', label: 'Contact Text', defaultValue: '' }
];
