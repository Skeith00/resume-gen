// pages/profile/[username]/edit.jsx
import { useState } from "react";
import { useRouter } from 'next/router';
import { profilePropType } from '@propTypes/profilePropTypes';
import AddSectionDropdown from "@components/edit/AddSectionDropdown";
import OptionalSectionWrapper from "@components/edit/OptionalSectionWrapper";
import {OPTIONAL_SECTIONS} from "@components/edit/sections";

export default function EditProfile({ data, username }) {
    const router = useRouter();
    const [profile, setProfile] = useState(data || {
        name: '',
        headline: '',
        photo: '',
        about: '',
        email: '',
        //contacts: [],
        //skills: [],
        //projects: [],
        //testimonials: [],
        //services: [],
    });

    const [saving, setSaving] = useState(false);

    function handleChange(key, value) {
        setProfile({ ...profile, [key]: value });
    }

    function handleRemoveSection(key) {
        const updated = { ...profile };
        delete updated[key]; // remove data
        setProfile(updated);
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
                {/* Mandatory fields */}
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
                    <label className="block font-semibold text-gray-700">headline</label>
                    <input
                        type="text"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.headline}
                        onChange={(e) => handleChange('headline', e.target.value)}
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

                <div>
                    <label className="block font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full border rounded px-3 py-2"
                        value={profile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>

                {/* Dynamically load optional sections */}
                {OPTIONAL_SECTIONS.map(({ key, label, Component }) =>
                    profile[key] && Component ? (
                        <OptionalSectionWrapper
                            key={key}
                            sectionKey={key}
                            label={label}
                            onRemove={handleRemoveSection}
                        >
                            {Component && (
                                <Component
                                    data={profile[key]}
                                    onChange={(val) => handleChange(key, val)}
                                />
                            )}
                        </OptionalSectionWrapper>
                    ) : null
                )}

                {/* Add section dropdown */}
                <AddSectionDropdown
                    profile={profile}
                    onAdd={(section) => handleChange(section.key, section.defaultValue)}
                />

                {/* Save button */}
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
