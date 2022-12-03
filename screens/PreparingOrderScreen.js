import {SafeAreaView} from "react-native";
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 3000)
    }, [])

    return (
        <SafeAreaView className="bg-[#74dcd4] flex-1 justify-center items-center">
            <Animatable.Image
                source={require("../assets/orderLoading.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-80 w-80"/>

            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-md my-12 text-white font-bold text-center">
                Waiting for Restaurant to accept your order!
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate color="white"/>
        </SafeAreaView>
    )
}

export default PreparingOrderScreen

