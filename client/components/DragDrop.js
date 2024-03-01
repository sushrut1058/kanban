import React, {useState, useRef, useEffect} from "react";
import { StyleSheet, Pressable } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from "react-native-reanimated";

export const DragDrop = ({ children, onDrop, position }) => {
    // console.log("drag",position[0]);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    if(position){
        translateX.value = position[0]; 
        translateY.value = position[1];
    }
    const isDragging = useSharedValue(false); // Use a shared value for dragging state

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, context) => {
            isDragging.value = true;
            context.startX = translateX.value;
            context.startY = translateY.value;
        },
        onActive: (event, context) => {
            // isDragging.value = true; // Set dragging to true using shared value
            translateX.value = context.startX + event.translationX;
            translateY.value = context.startY + event.translationY;
        },
        onEnd: (event) => {
            isDragging.value = false;
            onDrop && runOnJS(onDrop)({ x: event.absoluteX, y: event.absoluteY }); // Call onDrop prop with drop coordinates    
        },

    });

    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isDragging.value ? 50 : 1;
        return {
            zIndex,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
            // backgroundColor: isDragging.value ? 'blue': 'yellow'
        };
    });

    return (
        // <Pressable onLongPress={()=>{console.warn(1);}}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[
                animatedStyle,
                styles.card
                ]}>
                {children}
            </Animated.View>
        </PanGestureHandler>
        // </Pressable>
    );

};

const styles = StyleSheet.create({
    // card: {
    //     // Define your card styles here
    //     width: 60, // example width
    //     height: 60, // example height
    //     backgroundColor: 'blue', // example background color
    //     justifyContent: 'center', // example alignment
    //     alignItems: 'center', // example alignment
    // },
    // dragging: {
    //     zIndex: 999, // Ensure the dragged item is in the foreground
    //     elevation: 999, // For Android elevation
    //     backgroundColor: 'blue'
    //     // Add any other styles to indicate dragging (like shadow, border, etc.)
    // },
    
    // ... other styles ...
});
