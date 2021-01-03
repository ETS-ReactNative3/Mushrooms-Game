import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableWithoutFeedback,Button, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';

import { images } from '../constants/imagesFungi';
import Colors from '../constants/colors';
// import { getBasketMushrooms } from '../engine';

const basketImg = require('../assets/images/basket.png');
const {height, width} = Dimensions.get('window');
const { edibility: edibilityConst } = require('../constants/constants');

const BasketMushroom  = ( { mushroom, index, showMushroomInfo, name }) => {
    const onPress = () => showMushroomInfo(mushroom.id); 
        
    return (
        < TouchableWithoutFeedback onPress={onPress} >
            <View style={styles.mushroom}>
                <Image key={index}  style={styles.mushroomImg} source={images[mushroom.id]} />
                {(name === mushroom.name) ? (
                    <View style={styles.mushroomDetails}>
                        {/* // Generated by https://iconmonstr.com/info-7-svg/ xmlns="http://www.w3.org/2000/svg"" */}
                        <Svg  width="24" height="24" viewBox="0 0 24 24" vertical-align="top">
                            <G id="info" stroke="none" strokeWidth="1" fill="black" fillRule="evenodd">
                                <Path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z"/>
                            </G>
                        </Svg>
                        <Text style={styles.mushroomName}>{name}</Text>
                    </View>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );        
};

const BasketScreen = ({ navigation }) => {    
    const  mushroomsBasket = navigation.state.params.mushroomsBasket;
    const zeroEdible = mushroomsBasket.findIndex((m) => m.edibility === edibilityConst.EDIBLE ) === -1 ? true : false;
    const  zeroPoisonous = mushroomsBasket.findIndex((m) => m.edibility === edibilityConst.POISONOUS ) === -1 ? true : false;   
    const edibleMushrooms = mushroomsBasket.filter((m) => m.edibility === edibilityConst.EDIBLE);
    const poisonousMushrooms = mushroomsBasket.filter((m) => m.edibility === edibilityConst.POISONOUS);
    const [name, setName] = useState('');
    const infoRef = useRef();
    useEffect(() => {
        infoRef.current = name
    }, [name]);
    
    const showMushroomInfo = (id) => {
        mushroomsBasket.map((mushroom) =>{
            if(id === mushroom.id) {
                setName(name === mushroom.name || infoRef.current !== name ? '' : mushroom.name);
            }
        });
        
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent' />         
            <View style={styles.containerMushrooms}>                           
                <View style={styles.edibleMushrooms}>                     
                    <Text style={styles.mushroomsHeader}>Edible</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }}/>                     
                    {zeroEdible ? (
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>No Edible Mushrooms. Try Again!</Text>
                        </View>)
                        : edibleMushrooms.map((m, index) => (
                            <BasketMushroom 
                                key={index}
                                index={index}
                                mushroom={m}
                                showMushroomInfo={showMushroomInfo}
                                name={name}
                            />
                        ))}            
                </View>              
                <View style={styles.poisonousMushrooms}>                    
                    <Text style={styles.mushroomsHeader}>Poisonous</Text>
                    {zeroPoisonous ? (
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>No Poisonous Mushrooms!</Text>
                            <Text style={styles.text}>Well done!</Text>
                        </View>)                                     
                        :   poisonousMushrooms.map((m, index) => (
                            <BasketMushroom 
                                key={index}
                                index={index}
                                mushroom={m}
                                showMushroomInfo={showMushroomInfo}
                                name={name}
                            />
                        ))}         
                </View>                
            </View> 
            <View style={styles.button}>
                <Button
                    title="Back" 
                    onPress={() => navigation.navigate('StartGame')}
                    color={Colors.gameButton}                    
                />
            </View>  
            <Image
                source={basketImg}                         
                pointerEvents={'none'}
                style={styles.basketImg}
                // style={StyleSheet.absoluteFillObject}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',       
        flexDirection: 'row',
        justifyContent: 'center',       
        // marginLeft: 100,
        height: height,
        width: width,        
    },
    containerMushrooms: {        
        // flexBasis: '85%',
        flexDirection: 'row',
        justifyContent: 'center',     
        height: height,
        // borderColor: 'red',
        // borderWidth: 2,              
    },
    edibleMushrooms: {
        flexBasis: '50%',
        justifyContent: 'flex-start',
        backgroundColor: Colors.backGround,
    },
    poisonousMushrooms: {
        flexBasis: '50%',
        justifyContent: 'flex-start',
        backgroundColor: Colors.poisonousRed,
    },    
    mushroom: {
        alignItems:'center',
        flexBasis: "20%",              
        // height: "33.33%",
        justifyContent: 'center',
        // width: "33.33%",
        zIndex: 100,
        flexShrink: 3,
        display: 'flex',
        flexDirection: 'row',
    },
    mushroomsHeader: {
        textAlign: 'center',
        padding: '5%',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Colors.white,
        textDecorationLine: 'underline',
    },
    mushroomDetails: {
        flexDirection: 'row',
        justifyContent: 'center',     
    },
    mushroomName: {
        textAlign: 'center',
        color: Colors.white,
        paddingLeft: '2%',
    },
    text: {
        textAlign: 'center',
        // paddingTop: "2%",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        // color: Colors.black,              
        padding:'10%',    
    },
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }, 
    basketImg: {
        position: 'absolute',
        height: '25%',
        width: '25%',      
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        // marginBottom: '5%',               
    },
    mushroomImg: {
        height: 70,
        resizeMode: 'contain',
        width: 70,
        zIndex: 101,           
    },
    button: {
        width: '10%',
        position: 'absolute',
        height: '20%',
        //width: '20%',      
        //resizeMode: 'contain',
        alignSelf: 'flex-end',        
        marginBottom: '-5%',
        opacity: 0.7,
        zIndex: 50,
        
    },   
});

BasketScreen.propTypes = {
    navigation: PropTypes.object.isRequired,   
};

BasketMushroom.propTypes = {
    mushroom: PropTypes.object.isRequired,        
    index: PropTypes.number.isRequired,
    showMushroomInfo: PropTypes.func.isRequired,
    name: PropTypes.string,     
};

BasketMushroom.defaultProps = {
    name: '',
};
export default BasketScreen;
