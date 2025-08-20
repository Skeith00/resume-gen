export default function TemplateProfessionalProfile({ data }) {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            {/* Hero */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <img
                        src={data.photo || "/profile.jpg"}
                        alt={data.name}
                        className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg"
                    />
                    <h1 className="text-4xl font-bold mt-4">{data.name}</h1>
                    <p className="text-xl mt-2">{data.headline}</p>
                    <div className="flex justify-center gap-4 mt-4">
                        {data.contacts.map((c, idx) => (
                            <a
                                key={idx}
                                href={c.url}
                                className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
                            >
                                {c.type}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="max-w-4xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                <p className="leading-relaxed">{data.about}</p>
            </section>
            {/* Skills */}
            {data.skills?.length > 0 && (
                <section className="bg-white py-12 shadow-inner">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {data.skills?.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
                                >{skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* Projects */}
            <section className="max-w-4xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {data.projects?.map((project, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-4">
                            <h3 className="font-medium">{project.name}</h3>
                            <p className="text-gray-700">{project.description}</p>
                            {project.link && (
                                <a
                                    href={project.link}
                                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                                >
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p>{data.contactText}</p>
                    <a
                        href={`mailto:${data.email}`}
                        className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100"
                    >
                        Email Me
                    </a>
                </div>
            </section>
        </div>
    );
}
