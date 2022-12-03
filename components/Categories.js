import {ScrollView} from "react-native";
import CategoryCard from "./CategoryCard";
import {useEffect, useState} from "react";
import client from "../sanityClient";

const Categories = () => {
    const [categoriesList, setCategoriesList] = useState([]);

    const getCategoriesList = async () => {
        const data = await client.fetch(`*[_type == "category"]`)
        setCategoriesList(data)
    }

    useEffect(() => {
        (async () => await getCategoriesList())()
    }, [])

    return (
        <ScrollView horizontal
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop:        10
                    }}
                    showsHorizontalScrollIndicator={false}>

            {categoriesList?.map(category => (
                <CategoryCard
                    {...category}
                    key={category._id}/>
            ))}
        </ScrollView>
    )
}

export default Categories
