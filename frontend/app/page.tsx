"use client";

import { useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        location: "airoli",
        area_sqft: "1000",
        bhk: "2",
        bathrooms: "2",
        floor: "5",
        total_floors: "10",
        age_of_property: "5",
        parking: "1",
        lift: "1",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const locations = [
        "airoli", "ulwe", "panvel", "kharghar", "ghansoli",
        "nerul", "belapur", "cbd belapur", "vashi"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";
            const payload = {
                location: formData.location,
                area_sqft: Number(formData.area_sqft),
                bhk: Number(formData.bhk),
                bathrooms: Number(formData.bathrooms),
                floor: Number(formData.floor),
                total_floors: Number(formData.total_floors),
                age_of_property: Number(formData.age_of_property),
                parking: Number(formData.parking),
                lift: Number(formData.lift)
            };

            const response = await fetch(`${backendUrl}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Unable to reach prediction server.");
            }

            const data = await response.json();
            setResult(data.predicted_price);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Decorative background vectors */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 z-0 mix-blend-multiply pointer-events-none"></div>

            <div className="max-w-3xl w-full z-10 relative">
                <div className="bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">

                    <div className="px-8 py-10 sm:p-12 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 text-center">
                            Navi Mumbai Property Valuation
                        </h1>
                        <p className="text-slate-500 text-center max-w-xl mx-auto text-base">
                            Enter your property dimensions and details to instantly receive a machine-learning powered market estimate.
                        </p>
                    </div>

                    <div className="p-8 sm:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Primary Location
                                </label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors bg-white shadow-sm"
                                >
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Carpet Area (sqft)
                                    </label>
                                    <input
                                        type="number"
                                        name="area_sqft"
                                        value={formData.area_sqft}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 1000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        BHK Config
                                    </label>
                                    <input
                                        type="number"
                                        name="bhk"
                                        value={formData.bhk}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="bathrooms"
                                        step="0.5"
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Age of Property (Years)
                                    </label>
                                    <input
                                        type="number"
                                        name="age_of_property"
                                        step="0.1"
                                        value={formData.age_of_property}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 5"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Floor Level
                                    </label>
                                    <input
                                        type="number"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 4"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Total Floors in Building
                                    </label>
                                    <input
                                        type="number"
                                        name="total_floors"
                                        value={formData.total_floors}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                        placeholder="e.g. 15"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 pt-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Parking Availability
                                    </label>
                                    <select
                                        name="parking"
                                        value={formData.parking}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                    >
                                        <option value="1">Available</option>
                                        <option value="0">None</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        Elevator / Lift
                                    </label>
                                    <select
                                        name="lift"
                                        value={formData.lift}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-xl border border-slate-300 py-3.5 px-4 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-medium transition-colors shadow-sm bg-white"
                                    >
                                        <option value="1">Available</option>
                                        <option value="0">None</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                                >
                                    {loading ? (
                                        <div className="flex items-center space-x-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Analyzing Market Data...</span>
                                        </div>
                                    ) : (
                                        "CALCULATE VALUATION"
                                    )}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium flex items-center space-x-2">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {result !== null && (
                            <div className="mt-10 p-8 bg-blue-50 border border-blue-200 rounded-2xl shadow-inner relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                <h3 className="text-center text-sm font-semibold text-blue-800 uppercase tracking-widest mb-6">Valuation Range</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Minimum Price</p>
                                        <p className="text-xl sm:text-2xl font-bold text-slate-700">₹{(result * 0.90).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 ring-1 ring-blue-500/10 transform md:scale-105 z-10">
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Average Estimated</p>
                                        <p className="text-2xl sm:text-3xl font-black text-blue-900">₹{result.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Maximum Price</p>
                                        <p className="text-xl sm:text-2xl font-bold text-slate-700">₹{(result * 1.10).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                                    </div>
                                </div>
                                <p className="mt-6 text-center text-xs text-blue-600/70 font-medium">
                                    * Estimated range based on a ±10% margin of the foundational ML prediction pattern
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
