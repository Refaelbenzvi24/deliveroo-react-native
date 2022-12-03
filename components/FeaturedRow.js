import {ScrollView, Text, View} from "react-native";
import {ArrowRightIcon} from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import {useEffect, useState} from "react";
import client from "../sanityClient";

const FeaturedRow = ({id, title, description}) => {
    const [restaurants, setRestaurants] = useState([])

    const getRestaurants = async () => {
        const data = await client.fetch(
            `*[_type == "featured" && _id == $id] {
            ...,   
            restaurants []->{
                ...,
                dishes []->,
                type-> {
                    name
                }
            },
        }[0]
        `, {id})
        setRestaurants(data?.restaurants)
    }

    useEffect(() => {
        (async () => await getRestaurants())()
    }, [])


    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <ArrowRightIcon color="#00CCBB"/>
            </View>

            <Text className="text-xs text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }} showsHorizontalScrollIndicator={false} className="pt-4">

                {restaurants?.map(restaurant => (
                    <RestaurantCard
                        {...restaurant}
                        key={restaurant._id}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow
