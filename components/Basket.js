import React from 'react';
import { Button, StyleSheet, View, Image, } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';
import { getBasketMushrooms } from '../engine';

const basketImg = require('../assets/images/basket.png');


const MushroomIcon = ({ m }) => {
    
    const iconColor = m.id !== undefined ? Colors.black : Colors.orange;
    console.log('iconColor from MushroomIcon', iconColor);
    return (
        <View style={styles.basketMushroom}>
            <Svg height="100%" width="100%" viewBox="0 0 339 447" vertical-align="top">
                <G id="fungi" stroke="none" strokeWidth="1" fill={iconColor} fillRule="evenodd">
                    <Path d="M169.5,0.5 C122.828881,0.5 80.5750881,18.4667719 49.9897472,47.5183346 C19.4139572,76.5608255 0.5,116.681966 0.5,161 C0.5,187.737381 7.37133109,202.814358 19.631421,210.782052 C34.7910603,220.634131 58.0695269,219.656755 86.4022659,216.688438 C86.644367,216.663074 86.8860768,216.637644 87.1273926,216.612144 C87.0660242,216.846124 87.0009812,217.082053 86.9367022,217.317435 C81.2130778,238.276649 78.5,266.053284 78.5,302.5 C78.5,358.537881 84.9013154,394.071779 98.8146433,415.829426 C113.678786,439.073957 137.133619,446.5 170.403184,446.5 C203.928335,446.5 227.008485,440.986595 241.386475,419.238182 C254.624628,399.213905 260.5,365.515962 260.5,309.961579 C260.5,270.198901 257.481875,239.883291 250.91671,217.209469 C250.84819,216.972822 250.778898,216.735678 250.708834,216.498034 C250.952279,216.520352 251.200787,216.546803 251.4497,216.573194 C280.169337,219.618192 303.786274,220.757088 319.156323,210.919471 C331.549088,202.987469 338.5,187.891157 338.5,161 C338.5,116.681966 319.586043,76.5608255 289.010253,47.5183346 C258.424912,18.4667719 216.171119,0.5 169.5,0.5 Z" id="Combined-Shape" stroke="#979797" fill={iconColor}></Path>
                </G>
            </Svg>
        </View>
    )
};

const Basket = (props) => {
    const { mushrooms } = props;
  
        
    // const getBasketMushrooms = (mushrooms) => [...mushrooms].filter(m => m.status === statusConst.IN_BASKET).concat(basketMushrooms).slice(0, BASKET_SIZE);  
 
    return (        
        
        <View style={styles.basket}>
            { Object.values(getBasketMushrooms(mushrooms)).map( (m, i) => (< MushroomIcon key={i} m={m}/>)) }
            <View onLayout={props.onLayout} style={props.style}>
                <Image
                    style={styles.basketImg}
                    source={basketImg}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Back" 
                    onPress={() => props.navigation.navigate('StartGame')}
                    color={Colors.gameButton}                    
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    basketImg: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    basket: {
        flex:1,    
        justifyContent: 'space-between',
        padding: 25,
        alignItems:'center',
        backgroundColor: Colors.backGround,
        zIndex: 1,       
    },
    basketMushroom: {
        alignItems: "center",
        height: 25,
        width: 25,
        // borderColor: 'blue',
        // borderWidth: 2,
    },
    button: {
        width: 60,
    }, 
});

Basket.propTypes = {
    onLayout: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    
};

export default Basket;
