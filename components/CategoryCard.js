import {Image, Text, View} from "react-native";
import {urlFor} from "../sanityClient";

const CategoryCard = ({image, name}) => {

    return (
        <View className="relative mr-2">
            <Image className="h-20 w-20 rounded" source={{uri: urlFor(image).width(200).url()}}/>

            <Text className="absolute bottom-0 left-1 text-white font-bold">
                {name}
            </Text>
        </View>
    )
}

export default CategoryCard;
