// pages/profile/[username]/edit.jsx
import { useState } from "react";
import { useRouter } from 'next/router';
import { profilePropType } from '@propTypes/profilePropTypes';

export default function EditProfile({ data, username }) {
    const router = useRouter();
    const [profile, setProfile] = useState(data || {
        contacts: [],
        skills: [],
        projects: [],
        testimonials: [],
        services: [],
    });
    const [saving, setSaving] = useState(false);

    function handleChange(field, value) {
        setProfile({ ...profile, [field]: value });
    }

    function handleArrayChange(field, index, subField, value) {
        const arr = [...profile[field]];
        if (typeof arr[index] === 'object') {
            arr[index] = { ...arr[index], [subField]: value };
        } else {
            arr[index] = value;
        }
        setProfile({ ...profile, [field]: arr });
    }

    function handleAddArrayItem(field, defaultValue) {
        setProfile({ ...profile, [field]: [...profile[field], defaultValue] });
    }

    function handleRemoveArrayItem(field, index) {
        setProfile({ ...profile, [field]: profile[field].filter((_, i) => i !== index) });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const res = await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });

        setSaving(false);

        if (res.ok) {
            await router.push(`/profile/${username}/view`);
        } else {
            alert('Failed to save profile');
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>
            <form onSubmit={handleSave} className="space-y-6">

                {/* BASIC INFO */}
                <div>
                    <label className="block font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700">Tagline</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.tagline}
                        onChange={(e) => handleChange('tagline', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.photo}
                        onChange={(e) => handleChange('photo', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700">About</label>
                    <textarea
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.about}
                        onChange={(e) => handleChange('about', e.target.value)}
                    />
                </div>

                {/* CONTACTS */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-2">Contacts</h2>
                    {profile.contacts.map((contact, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Type"
                                className="border rounded px-2 py-1 flex-1"
                                value={contact.type}
                                onChange={(e) => handleArrayChange('contacts', i, 'type', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="URL"
                                className="border rounded px-2 py-1 flex-2"
                                value={contact.url}
                                onChange={(e) => handleArrayChange('contacts', i, 'url', e.target.value)}
                            />
                            <button
                                type="button"
                                className="text-red-500 font-semibold"
                                onClick={() => handleRemoveArrayItem('contacts', i)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-blue-500 font-semibold mt-1"
                        onClick={() => handleAddArrayItem('contacts', { type: '', url: '' })}
                    >
                        + Add Contact
                    </button>
                </div>

                {/* SKILLS */}
                <div>
                    <h2 className="font-semibold text-gray-800 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {profile.skills.map((skill, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <input
                                    type="text"
                                    className="border rounded px-2 py-1"
                                    value={skill}
                                    onChange={(e) => handleArrayChange('skills', i, null, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="text-red-500 font-semibold"
                                    onClick={() => handleRemoveArrayItem('skills', i)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="text-blue-500 font-semibold"
                            onClick={() => handleAddArrayItem('skills', '')}
                        >
                            + Add Skill
                        </button>
                    </div>
                </div>

                {/* Other sections (Projects, Testimonials, Services) can follow the same pattern with Tailwind styling */}
                {/* CONTACT TEXT & EMAIL */}
                <div>
                    <label className="block font-semibold text-gray-700">Contact Text</label>
                    <textarea
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.contactText}
                        onChange={(e) => handleChange('contactText', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
}

EditProfile.propTypes = {
    data: profilePropType.isRequired
}

export async function getServerSideProps(context) {
    const { username } = context.params;
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/profile/${username}`);

    if (!res.ok) {
        return {
            props: {
                username,
            }
        }
    }

    const data = await res.json();

    return {
        props: {
            data,
            username,
        }
    }
}
