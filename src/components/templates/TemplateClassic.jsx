export default function TemplateClassic({ data }) {
    return (
        <main className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 my-12">
            <header className="border-b pb-4 mb-6">
                <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
                <h2 className="text-xl text-gray-500">{data.title}</h2>
                <div className="flex gap-4 mt-2">
                    {data.contacts.map((contact, idx) => (
                        <a
                            key={idx}
                            href={contact.url}
                            className="text-blue-600 hover:underline text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contact.type}
                        </a>
                    ))}
                </div>
            </header>

            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">About</h3>
                <p className="text-gray-700 leading-relaxed">{data.about}</p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Experience</h3>
                <ul className="space-y-4">
                    {data.experience.map((job, idx) => (
                        <li key={idx}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{job.role} at {job.company}</span>
                                <span className="text-sm text-gray-500">{job.period}</span>
                            </div>
                            <p className="text-gray-700">{job.details}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Education</h3>
                <ul className="space-y-2">
                    {data.education.map((edu, idx) => (
                        <li key={idx}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{edu.degree} - {edu.institution}</span>
                                <span className="text-sm text-gray-500">{edu.period}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Projects</h3>
                <ul className="space-y-2">
                    {data.projects.map((project, idx) => (
                        <li key={idx}>
                            <span className="font-medium text-gray-900">{project.name}</span>
                            <p className="text-gray-700">{project.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Certifications</h3>
                <ul className="space-y-1">
                    {data.certifications.map((cert, idx) => (
                        <li key={idx}>
                            <span className="font-medium text-gray-900">{cert.name}</span> — {cert.issuer} ({cert.year})
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full border"
                        >
              {skill}
            </span>
                    ))}
                </div>
            </section>
        </main>
    )
}
