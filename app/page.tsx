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
            // Updated to fall back to the dynamic relative URL for either Vercel or Render
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
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

            const response = await fetch(`${backendUrl}/api/predict`, {
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
        <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-purple-500/30 relative overflow-x-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8">

            {/* Background Ambient Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>

            <div className="max-w-4xl mx-auto w-full relative z-10 transition-all duration-500">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50 backdrop-blur-md shadow-lg">
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-sm font-bold uppercase tracking-widest">
                            AI-Powered PropTech
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-sm">
                        Navi Mumbai Property <br className="hidden sm:block" /> Valuation Intelligence
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        Enter property dimensions below to receive a high-fidelity market estimate powered by advanced Machine Learning algorithms.
                    </p>
                </div>

                {/* Main Glassmorphic Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden">

                    <div className="p-8 sm:p-12 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full blur-3xl -mx-10 -my-10 pointer-events-none"></div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                            {/* Primary Location */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                    Primary Location
                                </label>
                                <div className="relative">
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="appearance-none block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none cursor-pointer hover:bg-slate-800"
                                    >
                                        {locations.map((loc) => (
                                            <option key={loc} value={loc} className="bg-slate-800 text-slate-200">
                                                {loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent my-8"></div>

                            {/* Grid 1: Area & BHK */}
                            <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Carpet Area (sqft)
                                    </label>
                                    <input
                                        type="number"
                                        name="area_sqft"
                                        value={formData.area_sqft}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 1000"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        BHK Configuration
                                    </label>
                                    <input
                                        type="number"
                                        name="bhk"
                                        value={formData.bhk}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 2"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Grid 2: Baths & Age */}
                            <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Bathrooms
                                    </label>
                                    <input
                                        type="number"
                                        name="bathrooms"
                                        step="0.5"
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 2"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Age of Property (Years)
                                    </label>
                                    <input
                                        type="number"
                                        name="age_of_property"
                                        step="0.1"
                                        value={formData.age_of_property}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 5"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Grid 3: Floor & Total Floors */}
                            <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Floor Level
                                    </label>
                                    <input
                                        type="number"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 4"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Total Floors in Building
                                    </label>
                                    <input
                                        type="number"
                                        name="total_floors"
                                        value={formData.total_floors}
                                        onChange={handleChange}
                                        className="block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none hover:bg-slate-800"
                                        placeholder="e.g. 15"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Grid 4: Amenities */}
                            <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Parking Availability
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="parking"
                                            value={formData.parking}
                                            onChange={handleChange}
                                            className="appearance-none block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none cursor-pointer hover:bg-slate-800"
                                        >
                                            <option value="1" className="bg-slate-800">Available</option>
                                            <option value="0" className="bg-slate-800">None</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 transition-colors group-hover:text-purple-400">
                                        Elevator / Lift
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="lift"
                                            value={formData.lift}
                                            onChange={handleChange}
                                            className="appearance-none block w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-4 px-5 text-slate-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 sm:text-base font-medium transition-all shadow-inner outline-none cursor-pointer hover:bg-slate-800"
                                        >
                                            <option value="1" className="bg-slate-800">Available</option>
                                            <option value="0" className="bg-slate-800">None</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative overflow-hidden w-full flex justify-center items-center py-5 px-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 group"
                                >
                                    {/* Button hover light sweep effect */}
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                                    {loading ? (
                                        <div className="flex items-center space-x-3 z-10 relative">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Processing Matrix...</span>
                                        </div>
                                    ) : (
                                        <span className="z-10 relative tracking-wide">CALCULATE VALUATION</span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-8 p-5 bg-red-900/30 border border-red-500/30 text-red-400 rounded-2xl text-sm font-medium flex items-center space-x-3 animate-fade-in">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {result !== null && (
                            <div className="mt-12 animate-fade-in transform opacity-100 scale-100 transition-all duration-500 ease-out">
                                <div className="p-8 sm:p-10 bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">

                                    {/* Glow lines */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                                    <div className="text-center mb-8 relative z-10">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Estimated Market Value</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative z-10">

                                        {/* Minimum */}
                                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-inner flex flex-col justify-center">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pessimistic</p>
                                            <p className="text-2xl font-semibold text-slate-300">
                                                ₹{(result * 0.90).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>

                                        {/* Average (Center highlight) */}
                                        <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/20 transform md:scale-110 z-20 flex flex-col justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
                                            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 relative z-10">Most Likely</p>
                                            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight relative z-10">
                                                ₹{result.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>

                                        {/* Maximum */}
                                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 shadow-inner flex flex-col justify-center">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Optimistic</p>
                                            <p className="text-2xl font-semibold text-slate-300">
                                                ₹{(result * 1.10).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center relative z-10">
                                        <p className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-400 font-medium">
                                            <svg className="w-3.5 h-3.5 mr-1.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                            Margin of ±10% based on predictive variance
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Global CSS for Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shine {
                    100% { left: 125%; }
                }
                .animate-shine {
                    animation: shine 2s infinite;
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}} />
        </div>
    );
}
