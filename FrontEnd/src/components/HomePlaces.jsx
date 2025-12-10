import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Places from "./Places";
import { useContext } from "react";
import { ThemeContext } from '../context/ThemeContext'
import { useState, useEffect } from "react";



export default function HomePlaces() {

    const { isDark, averageRating } = useTheme();
    const { demoData } = useContext(ThemeContext);
    const [latestItem, setLatestItem] = useState([]);

    useEffect(() => {
        setLatestItem(demoData);
    }, [demoData])




    return (<>
        <section
            className={`mt-10 py-12 px-8 transition-colors duration-500 ${isDark ? "bg-[#0a1120] text-white" : "bg-gray-50 text-gray-900"
                }`}
        >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {
                    latestItem.map((item, index) => (
                        <Places key={index} id={item._id} author={item.owner.name} category={item.category} title={item.name} />
                    ))
                }
            </div>
        </section>

    </>
    );
}
