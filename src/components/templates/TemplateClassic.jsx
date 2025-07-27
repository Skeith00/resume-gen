export default function TemplateClassic({ data }) {
    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-8">
            <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{data.title}</p>
            <p className="text-gray-700 mb-6">{data.about}</p>

            <h2 className="font-semibold text-lg mt-6">Experience</h2>
            {data.experience.map((job, i) => (
                <div key={i} className="mt-2">
                    <p className="font-medium">{job.role} at {job.company} ({job.period})</p>
                    <p className="text-gray-600">{job.details}</p>
                </div>
            ))}

            <h2 className="font-semibold text-lg mt-6">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
                {data.skills.map((skill, i) => (
                    <span key={i} className="bg-gray-200 px-2 py-1 rounded">{skill}</span>
                ))}
            </div>

            <h2 className="font-semibold text-lg mt-6">Contact</h2>
            <div className="flex gap-4 mt-2">
                {data.contacts.map((contact, i) => (
                    <a key={i} href={contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {contact.type}
                    </a>
                ))}
            </div>
        </div>
    )
}
