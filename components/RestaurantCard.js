import {Image, Text, TouchableOpacity, View} from "react-native";
import {LocationMarkerIcon} from "react-native-heroicons/outline";
import {urlFor} from "../sanityClient";
import {useNavigation} from "@react-navigation/native";
import {StarIcon} from "react-native-heroicons/solid";

const RestaurantCard = (props) => {
    const {_id, image, name, rating, type, address, short_description, dishes, long, lat} = props
    const navigation                                                                       = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Restaurant", props)}
            className="bg-white mr-3 shodow">
            <Image
                source={{
                    uri: urlFor(image).url()
                }}
                className="h-36 w-64 rounded-sm"/>

            <View className="px-3 pb-4">
                <Text className="font-bold text-lg pt-2">{name}</Text>
                <View className="flex-row items-center space-x-1">
                    <StarIcon color="green" opacity={0.5} size={22}/>
                    <Text>
                        <Text className="text-green-500">{rating}</Text> • {type.name}
                    </Text>
                </View>

                <View className="flex-row items-center space-x-1">
                    <LocationMarkerIcon color="gray" size={22}/>
                    <Text className="text-xs text-gray-500">Nearby • {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard
