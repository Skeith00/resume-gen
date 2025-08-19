import { useState } from "react";
import { MinusCircle, PlusCircle, X, ChevronDown, ChevronUp } from "lucide-react";

export default function OptionalSectionWrapper({sectionKey, label, children, onRemove}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="border rounded-xl p-4 mb-6 shadow-sm bg-white">
            {/* Header with collapse + remove */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{label}</h2>
                <div className="flex gap-3">
                    {/* Collapse button */}
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title={collapsed ? "Expand" : "Collapse"}
                    >
                        {collapsed ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemove(sectionKey)}
                        className="p-1 rounded-full hover:bg-red-50"
                        title="Remove"
                    >
                        <X className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {!collapsed && <div className="mt-2">{children}</div>}
        </div>
    );
}
