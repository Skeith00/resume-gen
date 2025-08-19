import { OPTIONAL_SECTIONS } from "@components/edit/sections";
import { PlusCircle } from "lucide-react";
import {useState} from "react";

export default function AddSectionDropdown({ profile, onAdd }) {
    const [selected, setSelected] = useState("");

    const availableSections = OPTIONAL_SECTIONS.filter(section =>
        !profile[section.key] && section.Component != null
    );

    if (availableSections.length === 0) return null;

    const handleAdd = () => {
        if (!selected) return;
        const section = OPTIONAL_SECTIONS.find((s) => s.key === selected);
        onAdd(section);
        setSelected("");
    };

    return (
        <div className="my-6 flex gap-2 items-center">
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border p-2 rounded-lg"
            >
                <option value="">Add a section...</option>
                {availableSections.map((s) => (
                    <option key={s.key} value={s.key}>
                        {s.label}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={handleAdd}
                disabled={!selected}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
                <PlusCircle className="w-4 h-4" />
                Add
            </button>
        </div>
    );
}
