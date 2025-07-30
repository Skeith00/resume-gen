export default function TemplateWebCV({ data }) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            {/* Header */}
            <header className="bg-white shadow-md p-6 text-center">
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <h2 className="text-lg text-gray-600">{data.title}</h2>
                <div className="flex justify-center gap-4 mt-2">
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

            <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {/* About */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">About</h3>
                    <p className="leading-relaxed">{data.about}</p>
                </section>

                {/* Experience */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">Experience</h3>
                    <div className="space-y-4">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="bg-white p-4 rounded shadow">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{job.role} at {job.company}</span>
                                    <span className="text-sm text-gray-500">{job.period}</span>
                                </div>
                                <p className="text-gray-700">{job.details}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">Education</h3>
                    <div className="space-y-2">
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="flex justify-between">
                                <span>{edu.degree} – {edu.institution}</span>
                                <span className="text-sm text-gray-500">{edu.period}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">Projects</h3>
                    <div className="space-y-2">
                        {data.projects.map((project, idx) => (
                            <div key={idx}>
                                <span className="font-medium">{project.name}</span>
                                <p className="text-gray-700">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">Certifications</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {data.certifications.map((cert, idx) => (
                            <li key={idx}>
                                <span className="font-medium">{cert.name}</span> — {cert.issuer} ({cert.year})
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-xl font-semibold mb-2 border-b pb-1">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
