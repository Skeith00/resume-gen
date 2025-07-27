import TemplateClassic from "@components/templates/TemplateClassic"

const templates = {
    classic: TemplateClassic,
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