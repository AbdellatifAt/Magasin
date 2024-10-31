import React, { useEffect, useState } from 'react';
import { API_BACKEND } from '../../API/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DoughnutChart from '../../components/chartComponents/DoughnutChart';
import PieChart from '../../components/chartComponents/PieChart ';
import BarChart from '../../components/chartComponents/BarChart';
import { PiGarageBold } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import MixedChart from '../../components/chartComponents/MixedChart';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
    const { user } = useAuthContext();
    const [stat, setStat] = useState(null);

    const [dataEspaceVide , setDataEspaceVide] = useState(null)

    const [dataEspaceVidePerDepot , setDataEspaceVidePerDepot] = useState(null)
    const [articlesPerDepot , setArticlesPerDepot] = useState(null)

    const fetchStatistique = async () => {
        try {
            const response = await fetch(API_BACKEND + '/statistique/', {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setStat(result.data.stat);
            setDataEspaceVidePerDepot(result.data.espaceVideParDepot)

            setDataEspaceVide(result.data.dataEspaceVide)
            setArticlesPerDepot(result.data.articlesParDepot)
            console.log("statistique", result);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchStatistique();
        const intervalId = setInterval(fetchStatistique, 10000); // 10 secondes
        return () => clearInterval(intervalId);
    }, [user.token]);


    


   



    return (

        <>
        
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 bg-white min-h-96">
                    {/* part 1 */}
                    <div className="m-6">
                        <div className="flex flex-wrap -mx-6">
                            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-green-500">
                                    <div className="p-3 rounded-full bg-white">
                                        <IoPersonSharp  className="h-8 w-8 text-green-500" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 id="courrierR" className="text-2xl font-semibold text-white">{stat?.totalUser || 0}</h4>
                                        <div className="text-white">Total Employees</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-blue-500">
                                    <div className="p-3 rounded-full bg-white">
                                       
                                        <PiGarageBold  className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 id="courrierR" className="text-2xl font-semibold text-white">{stat?.totalDepot || 0}</h4>
                                        <div className="text-white">Total Depots</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-yellow-500">
                                    <div className="p-3 rounded-full bg-white">
                                       

                                        <MdOutlineSpaceDashboard className="h-8 w-8 text-yellow-500" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 id="courrierR" className="text-2xl font-semibold text-white">{stat?.totalCellule || 0}</h4>
                                        <div className="text-white">Total Cellules</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-red-500">
                                    <div className="p-3 rounded-full bg-white">
                                        <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                        </svg>
                                    </div>
                                    <div className="mx-5">
                                        <h4 id="courrierR" className="text-2xl font-semibold text-white">{stat?.totalArticle || 0}</h4>
                                        <div className="text-white">Total Articles</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* part 2: Charts */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    <div className="flex items-center justify-center h-full dark:bg-gray-800">
                        <div className="flex items-center justify-center bg-white p-6 rounded-lg border-2 border-gray-500 w-full h-full">
                        <PieChart dataClient={dataEspaceVide} title="Espaces disponibles dans les cellules " />
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-full dark:bg-gray-800">
                        <div className="flex items-center justify-center bg-white p-6 rounded-lg border-2 border-gray-500 w-full h-full">
                            <MixedChart dataClient={dataEspaceVidePerDepot} title="Nombres Cellules Vide Par Dépot" />
                        </div>
                    </div>


 
                    </div>

                    {/* part 3  */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">

                    <div className="flex items-center justify-center h-full dark:bg-gray-800">
                        <div className="flex items-center justify-center bg-white p-6 rounded-lg border-2 border-gray-500 w-full h-full">
                        <BarChart dataClient={articlesPerDepot} title="Nombre Articles par depot" />
                       
                        </div>
                    </div>

                    


                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Home;
