import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBreadCrumbsContext } from '../hooks/useBreadCrumbs';

const BreadCrumb = ({ navigations , titre  = "" }) => {

    const [text , setText] = useState(capitalizeFirstLetter(titre))
    
    const { breadcrumbs, dispatch } = useBreadCrumbsContext();
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        dispatch({type : 'CREATE_BREADCRUMB' , payload : navigations})
        
    }, []);


    useEffect(() => {
        let interval;
        if (index < text.length) {
            // Définir un intervalle pour ajouter des caractères un par un
            interval = setInterval(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, 100); // Affiche chaque caractère toutes les 100 ms
        } else {
            // Réinitialise l'animation toutes les 4 secondes après avoir affiché tout le texte
            const timeout = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
            }, 4000); // Attends 4 secondes avant de recommencer

            return () => clearTimeout(timeout);
        }

        return () => clearInterval(interval); // Nettoie l'intervalle lorsqu'il n'est plus nécessaire
    }, [index, text]);


    function capitalizeFirstLetter(str) {
        if (!str) return str;

        const res = str.toLowerCase()


        return res.charAt(0).toUpperCase() + res.slice(1);
    }

    return (
        <div className="sm:ml-64"> 
            <div className='flex justify-between items-center px-4 pt-4 min-h-16'>
                <div className='text-2xl text-teal-500'>
                    {displayedText}
                </div>
                <nav className="flex float-end" aria-label="Breadcrumb m-5">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        {breadcrumbs && breadcrumbs.map((item) => {
                            //console.log(item.label); // Vérifiez ici si item.label est bien une chaîne de caractères
                            return (
                                <li key={item.id}>
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <Link to={item.lien} className="ms-1 text-sm font-medium text-gray-700 hover:text-teal-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                            {typeof item.label === 'string' ? capitalizeFirstLetter(item.label) : JSON.stringify(capitalizeFirstLetter(item.label))}
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}

                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default BreadCrumb;
