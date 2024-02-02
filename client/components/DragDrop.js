import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from "react-native-reanimated";

export const DragDrop = ({ children, onDrop }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isDragging = useSharedValue(false); // Use a shared value for dragging state

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, context) => {
            isDragging.value = true; // Set dragging to true using shared value
            context.startX = translateX.value;
            context.startY = translateY.value;
        },
        onActive: (event, context) => {
            // isDragging.value = true;
            translateX.value = context.startX + event.translationX;
            translateY.value = context.startY + event.translationY;
            // console.log(isDragging)
        },
        onEnd: (event) => {
            isDragging.value = false;
            onDrop && runOnJS(onDrop)({ x: event.absoluteX, y: event.absoluteY }); // Call onDrop prop with drop coordinates    
        },

    });

    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isDragging.value ? 1000 : 1;
        return {
            zIndex,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
            // backgroundColor: 'yellow',
            // zIndex: isDragging.value ? 999 : 0,
            // elevation: isDragging.value ? 999 : 0,
            backgroundColor: isDragging.value ? 'blue': 'yellow'
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[
                animatedStyle,
                styles.card
                ]}>
                {children}
            </Animated.View>
        </PanGestureHandler>
    );

};

const styles = StyleSheet.create({
    card: {
        // Define your card styles here
        width: 60, // example width
        height: 60, // example height
        backgroundColor: 'blue', // example background color
        justifyContent: 'center', // example alignment
        alignItems: 'center', // example alignment
    },
    dragging: {
        zIndex: 999, // Ensure the dragged item is in the foreground
        elevation: 999, // For Android elevation
        backgroundColor: 'blue'
        // Add any other styles to indicate dragging (like shadow, border, etc.)
    },
    
    // ... other styles ...
});
