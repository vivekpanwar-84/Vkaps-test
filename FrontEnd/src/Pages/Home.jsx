import React from 'react'
import HomePlaces from '../components/HomePlaces'
import { useTheme } from '../context/ThemeContext'
const Home = () => {

    const { isDark } = useTheme();
    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`} >
            <div >
                <div className="pt-1">

                    <HomePlaces />
                </div>
            </div>



        </div>
    )
}

export default Home
