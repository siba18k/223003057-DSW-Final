import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, typography, spacing, borderRadius, commonStyles } from '../constants/styles';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Find Perfect Hotels',
    description: 'Discover amazing hotels around the world with the best prices and reviews',
    image: 'https://raw.githubusercontent.com/siba18k/223003057-DSW-Final/main/Materials/01-Onboarding%20Page/Onboarding%201.png',
  },
  {
    id: 2,
    title: 'Easy Booking Process',
    description: 'Book your favorite hotels in just a few taps with secure payment options',
    image: 'https://raw.githubusercontent.com/siba18k/223003057-DSW-Final/main/Materials/01-Onboarding%20Page/Onboarding%202.png',
  },
  {
    id: 3,
    title: 'Enjoy Your Stay',
    description: 'Have the best travel experience with our carefully selected hotels',
    image: 'https://raw.githubusercontent.com/siba18k/223003057-DSW-Final/main/Materials/01-Onboarding%20Page/Onboarding%203.png',
  },
];

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? colors.primary : colors.border }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
        >
          {onboardingData.map((item) => (
            <View key={item.id} style={styles.slide}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {renderDots()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={onComplete}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={goToNext}>
            <Text style={styles.buttonText}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: '100%',
  },
  contentContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  button: {
    ...commonStyles.button,
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  skipButtonText: {
    ...commonStyles.buttonText,
    color: colors.textSecondary,
  },
});

export default OnboardingScreen;