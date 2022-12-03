import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {selectRestaurant} from "../features/restaurantSlice";
import {XIcon} from "react-native-heroicons/outline";
import * as Progress from "react-native-progress"
import MapView, {Marker} from "react-native-maps";

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

    return (
        <View className="bg-[#00CCBB] flex-1">
            <SafeAreaView className="z-50">
                <View className="flex-row justify-between items-center p-5">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XIcon color="white" size={30}/>
                    </TouchableOpacity>
                    <Text className="font-light text-white text-lg">Order Help</Text>
                </View>

                <View className="relative items-center pb-24 ">
                    <View className="bg-white my-2 rounded-md p-5 z-50 shadow-md absolute">
                        <View className="flex-row justify-between">
                            <View>
                                <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                                <Text className="text-4xl font-bold">44-55 Minutes</Text>
                            </View>
                            <Image
                                source={{
                                    uri: 'https://links.papareact.com/fls'
                                }}
                                className="h-20 w-20"/>
                        </View>

                        <Progress.Bar size={30} color="#00CCBB" indeterminate/>

                        <Text className="mt-3 text-gray-500">
                            Your order at {restaurant.name} is being prepared.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude:       restaurant.lat,
                    longitude:      restaurant.long,
                    latitudeDelta:  0.005,
                    longitudeDelta: 0.005
                }}
                className="flex-1 mt-10 z-0"
                mapType="mutedStandard">
                <Marker
                    coordinate={{
                        latitude:  restaurant.lat,
                        longitude: restaurant.long
                    }}
                    title={restaurant.name}
                    description={restaurant.short_description}
                    identifier="origin"
                    pinColor="#00CCBB"/>
            </MapView>

            <SafeAreaView className="bg-white">
                <View className="flex-row items-center space-x-5 pt-2">
                    <Image
                        source={{
                            uri: "https://links.papareact.com/wru"
                        }}
                        className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"/>

                    <View className="flex-1">
                        <Text className="text-lg">Refael Ben Zvi</Text>
                        <Text className="text-gray-400">Your Rider</Text>
                    </View>

                    <Text className="text-[#00CCBB] text-lg mr-5">Call</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen
