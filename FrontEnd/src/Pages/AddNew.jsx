import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { toast } from 'react-toastify';


export default function AddListingForm({ token }) {
    const { isDark, getlistingData } = useTheme();
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        inStock: "",
    });



    const [charCount, setCharCount] = useState(0);

    // handle text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            console.log("Submitting data:", Object.fromEntries(formData.entries()));

            if (!token) {
                alert("Token missing! Please login again.");
                return;
            }
            const res = await axios.post(
                backendurl + "/api/product/addProdcut",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                handleReset();
                getlistingData();
                navigate("/", { replace: true });

            } else {
                toast.error(res.data.message);
            }


        } catch (err) {
            console.error("Error:", err);
            alert("Failed to add listing");
        }
    };

    // reset everything
    const handleReset = () => {
        setForm({
            name: "",
            price: "",
            category: "",
            inStock: ""
        });
    };

    return (
        <>
            <div className="w-full pt-23 py-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h1 className="text-4xl font-bold mb-2">add New prodcut</h1>

            </div>

            <section
                className={`min-h-screen  py-10 px-6 md:px-20 transition-colors duration-500 ${isDark ? "bg-[#0b1120] text-white" : "bg-gray-50 text-gray-900"
                    }`}
            >
                <div className="max-w-4xl mx-auto mb-8 flex items-center gap-3">
                    <NavLink to="/">
                        <ArrowLeft
                            size={22}
                            className="text-gray-400 hover:text-blue-400 transition"
                        />
                    </NavLink>
                    <h2 className="text-3xl font-bold">Add New Product</h2>
                </div>

                <motion.form
                    onSubmit={handleSubmit}
                    className={`relative z-10 max-w-4xl mx-auto p-8 mb-10 rounded-2xl shadow-xl border ${isDark
                        ? "bg-[#141b2a] border-[#2a3550]/40"
                        : "bg-white border-gray-200"
                        }`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block font-medium mb-1">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter the product name"
                            className={`w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 outline-none ${isDark
                                ? "bg-[#0f172a] border-gray-600 text-white focus:ring-blue-400"
                                : "bg-white border-gray-300 focus:ring-blue-500"
                                }`}
                            required
                        />
                    </div>


                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block font-medium mb-1">
                                Category <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Enter the product category"
                                className={`w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 outline-none ${isDark
                                    ? "bg-[#0f172a] border-gray-600 text-white focus:ring-blue-400"
                                    : "bg-white border-gray-300 focus:ring-blue-500"
                                    }`}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Price <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Enter the product price"
                                className={`w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 outline-none ${isDark
                                    ? "bg-[#0f172a] border-gray-600 text-white focus:ring-blue-400"
                                    : "bg-white border-gray-300 focus:ring-blue-500"
                                    }`}
                                required
                            />
                        </div>
                    </div>






                    {/* Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-gray-400 text-sm hover:text-red-400 transition"
                        >
                            ⟳ Reset Form
                        </button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                        >
                            + Add Product
                        </motion.button>
                    </div>
                </motion.form>
            </section>
        </>
    );
}
