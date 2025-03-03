import {Text} from "react-native";
import React from "react";


interface User {
    firstName: string;
}


export default function HeyUser({firstName}: User) {
    return (
        <>
            <Text className=" pl-2 mb-5 font-montserrat-semi-bold text-3xl self-start">Hey, {""}
                <Text className="text-darthmouth  self-start">{firstName}!</Text>
            </Text>

        </>
    )
}
