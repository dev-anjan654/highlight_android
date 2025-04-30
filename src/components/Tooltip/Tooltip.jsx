import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

const Tooltip = () => {
  // State to show or hide the tooltip
  const [showTooltip, setShowTooltip] = useState(true);

  // Create an Animated.Value for opacity
  const opacityValue = useRef(new Animated.Value(1)).current;

  // Function to start the blinking animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0, // Fade out
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1, // Fade in
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacityValue]);

  // Function to hide the tooltip
  const handleTooltipDismiss = () => {
    setShowTooltip(false);
  };

  return (
    <View style={styles.container}>
      {showTooltip && (
        <TouchableOpacity
          style={styles.tooltipContainer}
          onPress={handleTooltipDismiss}>
          <Animated.View style={[styles.tooltip, {opacity: opacityValue}]}>
            <Text style={styles.tooltipText}>Select Gender</Text>
            <View style={styles.tooltipTriangle} />
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -25,
    left: -75,
  },
  tooltipContainer: {
    position: 'absolute',
  },
  tooltip: {
    width: 120,
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
  tooltipTriangle: {
    position: 'absolute',
    bottom: -10,
    right: '15%',
    marginLeft: -10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#444',
  },
});

export default Tooltip;
