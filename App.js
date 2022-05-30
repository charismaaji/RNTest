import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const ListData = [
  {
    like: 0,
    image:
      'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    like: 0,
    image:
      'https://images.pexels.com/photos/1428169/pexels-photo-1428169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    like: 0,
    image:
      'https://images.pexels.com/photos/3473569/pexels-photo-3473569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function App() {
  const widthMobileUI = 414;

  const [data, setData] = useState(ListData);

  const responsiveWidth = width => {
    return (Dimensions.get('window').width * width) / widthMobileUI;
  };

  const handleLike = index => {
    let dummy = [...data];
    dummy[index].like += 1;
    setData(dummy);
  };

  const handleDislike = index => {
    let dummy = [...data];
    dummy[index].like -= 1;
    if (dummy[index].like <= 0) {
      dummy[index].like = 0;
    }
    setData(dummy);
  };

  const handleLikeAll = () => {
    let dummy = [...data];
    dummy.forEach(e => {
      e.like += 1;
    });
    setData(dummy);
  };

  const handleDislikeAll = () => {
    let dummy = [...data];
    dummy.forEach(e => {
      e.like -= 1;
      if (e.like <= 0) {
        e.like = 0;
      }
    });
    setData(dummy);
  };

  const handleResetAll = () => {
    let dummy = [...data];
    dummy.forEach(e => {
      e.like = 0;
    });
    setData(dummy);
  };

  const ButtonCustom = ({
    title,
    backgroundColor,
    textDark,
    buttonSmall,
    onPress,
  }) => {
    if (buttonSmall) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            {
              width: 80,
              padding: 5,
              backgroundColor: backgroundColor,
            },
            styles.buttonCustom,
            styles.shadow,
          ]}>
          <Text style={{color: textDark ? '#000' : '#fff'}}>{title}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            width: responsiveWidth(110),
            padding: 10,
            backgroundColor: backgroundColor,
          },
          styles.buttonCustom,
          styles.shadow,
        ]}>
        <Text style={{color: textDark ? '#000' : '#fff'}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const CardImage = ({image, like, onPressLike, onPressDislike}) => {
    return (
      <View style={[styles.shadow, {marginBottom: 15}]}>
        <View style={styles.wrapperCardImage}>
          <Image
            source={{uri: image}}
            style={{width: '100%', height: responsiveWidth(200)}}
          />
          <View style={styles.wrapperCardButton}>
            <ButtonCustom
              buttonSmall
              backgroundColor="#fff"
              textDark
              title={`${like} Like`}
            />
            <View style={{flexDirection: 'row'}}>
              <ButtonCustom
                buttonSmall
                backgroundColor="#4071BF"
                title="Like"
                onPress={onPressLike}
              />
              <View style={{width: 10}} />
              <ButtonCustom
                buttonSmall
                backgroundColor="#C93F36"
                title="Dislike"
                onPress={onPressDislike}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <ButtonCustom
            title={'Like All'}
            backgroundColor="#4071BF"
            onPress={handleLikeAll}
          />
          <ButtonCustom
            title={'Reset All'}
            backgroundColor="#fff"
            textDark
            onPress={handleResetAll}
          />
          <ButtonCustom
            title={'Dislike All'}
            backgroundColor="#C93F36"
            onPress={handleDislikeAll}
          />
        </View>
        {data.map((value, index) => {
          return (
            <CardImage
              key={index}
              image={value.image}
              like={value.like}
              onPressDislike={() => handleDislike(index)}
              onPressLike={() => handleLike(index)}
            />
          );
        })}
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  container: {
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonCustom: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  wrapperCardImage: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapperCardButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
