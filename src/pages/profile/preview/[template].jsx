import TemplateProfessionalProfile from "@components/templates/TemplateProfessionalProfile"
import TemplateWeb from "@components/templates/TemplateWebProfile"

const templates = {
    classic: TemplateProfessionalProfile,
    web: TemplateWeb,
    // Add more templates: modern, minimal, etc.
}

export default function PreviewPage({ data, template }) {
    if (!data) return <div className="p-8">Profile not found.</div>;
    const Template = templates[template] || TemplateProfessionalProfile; // fallback to classic
    return <Template data={data} />
}

export async function getServerSideProps(context) {
    const { template } = context.params;
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}/profile.json`)

    if (!res.ok) {
        return { notFound: true }; // show 404 if user doesn't exist
    }

    const data = await res.json();

    return {
        props: {
            data,
            template
        }
    }
}