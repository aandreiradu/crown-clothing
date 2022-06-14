import {createContext,useState,useEffect} from 'react';
// import SHOP_DATA from '../shop-data';
import {getCategoriesAndDocuments,addCollectionAndDocument} from '../utils/firebase/firebase.utils';


const defaultProducts = {
    categoriesMap: []
};


export const CategoriesContext = createContext({
    defaultProducts
});



const CategoriesProvider = (props) => {
    const [categoriesMap,setCategoriesMap] = useState({});


    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log('categoryMap effect',categoryMap);

            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    },[]);

    // one off thing
    // useEffect(() => {
    //         addCollectionAndDocument('categories',SHOP_DATA);
    // },[]);

    const value = {
        categoriesMap
    }

    return (
    <CategoriesContext.Provider value={value}>
        {props.children}
    </CategoriesContext.Provider>
    )
};



export default CategoriesProvider;