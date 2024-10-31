
import { Article } from "../models/ArticleModel.js";
import { Cellule } from "../models/CelluleModel.js";
import { Depot } from "../models/DepotModel.js";
import { Rayon } from "../models/RayonModel.js";
import {User} from "../models/UserModel.js"

const getStatistique = async (req, res) => {
    try {
        const totalUser = await User.countUsers();
        const totalDepot = await Depot.countDepots();
        const totalCellule = await Cellule.countCellules();
        const totalArticle = await Article.countArticles();

        // espace vide
        const statcelules = await Cellule.statCellules();

        const dataEspaceVide = [
            { label: 'semi-plein', value: statcelules.semi_plein },
            { label: 'plein', value: statcelules.plein },
            { label: 'vide', value:  statcelules.vide },
        ];        

        // espace vide par depot
        const depots = await Depot.getDepots();
        const espaceVideParDepot = {
            labels : [] , 
            data1 : [] , 
            data2 : [] ,
            data3 : []
        };
        const articlesParDepot = []

        

        for (const item of depots) {
            const emptyCellulesCount = await Depot.countCellulesInDepot(item._id);
            const articleDepotCount = await Depot.countArticlesInDepot(item.id)
            // espaceVideParDepot.push({
            //     label: item.name, value: emptyCellulesCount 
            // });

            espaceVideParDepot.labels.push(item.name) 
            espaceVideParDepot.data1.push(emptyCellulesCount.celluleVide) 
            espaceVideParDepot.data2.push(emptyCellulesCount.celluleSemiVide) 
            espaceVideParDepot.data3.push(emptyCellulesCount.cellulePlein) 

            articlesParDepot.push({
                label: item.name, value: articleDepotCount 
            });
        }


        

        const data = {
            stat: {
                totalUser: totalUser,
                totalDepot: totalDepot,
                totalCellule: totalCellule,
                totalArticle: totalArticle,
            },
            dataEspaceVide: dataEspaceVide,
            espaceVideParDepot: espaceVideParDepot,
            articlesParDepot , articlesParDepot
        };

        res.status(201).json({ data: data });
    } catch (error) {
        console.error("Erreur lors du comptage des utilisateurs:", error.message);
        res.status(400).json({ error: error.message });
    }
};



export {getStatistique}