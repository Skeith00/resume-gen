import TemplateClassic from "@components/templates/TemplateClassic"
import TemplateWeb from "@components/templates/TemplateWeb"

const templates = {
    classic: TemplateClassic,
    web: TemplateWeb,
    // Add more templates: modern, minimal, etc.
}

export default function ResumePage({ data, template }) {
    const Template = templates[template] || TemplateClassic; // fallback to classic
    return <Template data={data} />
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.REACT_APP_PUBLIC_BASE_URL}/resume.json`)
    const data = await res.json()

    const template = context.params.template

    return {
        props: {
            data,
            template
        }
    }
}