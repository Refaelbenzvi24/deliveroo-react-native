import {Image, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useLayoutEffect, useState} from "react";
import {AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanityClient";

const HomeScreen = () => {
    const navigation                                  = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getFeaturedCategories = async () => {
        const data = await client.fetch(`*[_type == "featured"] {
                        ...,
                        restaurants []->{
                            ...,
                            dishes []->{
                                ...,
                            }
                        }
            }`
        )
        setFeaturedCategories(data)
    }

    useEffect(() => {
        (async () => await getFeaturedCategories())()
    }, [])

    return (
        <SafeAreaView className="bg-white pt-5 ">
            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
                <Image source={{
                    uri: "https://links.papareact.com/wru"
                }}
                       className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color="#00CCBB"/>
                    </Text>
                </View>
                <UserIcon size={35} color="#00CCBB"/>
            </View>

            <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
                <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
                    <SearchIcon color="gray" size={20}/>
                    <TextInput placeholder="Restaurants and cuisines"
                               keyboardType="default"/>
                </View>

                <AdjustmentsIcon size={35} color="#00CCBB"/>
            </View>

            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100
                }}>
                <Categories/>

                {featuredCategories?.map(({_id, title, shortDescription}) => (
                    <FeaturedRow
                        key={_id}
                        id={_id}
                        title={title}
                        description={shortDescription}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen
