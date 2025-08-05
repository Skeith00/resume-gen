import TemplateProfessionalProfile from "@components/templates/TemplateProfessionalProfile"
import TemplateWeb from "@components/templates/TemplateWebProfile"

const templates = {
    classic: TemplateProfessionalProfile,
    web: TemplateWeb,
    // Add more templates: modern, minimal, etc.
}

export default function ProfilePage({ data, template }) {
    const Template = templates[template] || TemplateProfessionalProfile; // fallback to classic
    return <Template data={data} />
}

export async function getServerSideProps(context) {
    const host = process.env.REACT_APP_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const res = await fetch(`${host}/profile.json`);

    const data = await res.json()
    const template = context.params.template

    return {
        props: {
            data,
            template
        }
    }
}