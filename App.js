import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import StarRating from 'react-native-star-rating';
 
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class App extends React.Component{
    constructor(props){
    super(props);
    this.state={
      isLoading: true,
      dataSource: null,
    }
  }

componentDidMount () {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=43236c9b4ffaa78012ee092b4e4f74d8&language=en-US&query=john&page=1&include_adult=false')
  .then((response)=>response.json())
  .then((responseJSON)=>{
    this.setState({
      isLoading: false,
      dataSource: responseJSON.results,
    })
  }).catch((err)=>{console.log(err)});
}

newFun(name){
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=43236c9b4ffaa78012ee092b4e4f74d8&language=en-US&query='+ name +'&page=1&include_adult=false')
  .then((response)=>response.json())
  .then((responseJSON)=>{
    this.setState({
      isLoading: false,
      dataSource: responseJSON.results,
    })
  }).catch((err)=>{console.log(err)});
}

render(){
  if(this.state.isLoading){
    return(
      <View style={{justifyContent: "center", alignItems:"center", alignContent:'center'}}>
            <ActivityIndicator/>
      </View>
    );
  }
  else{
    
    var Movies = this.state.dataSource.map((val, key)=>{
      if(val.poster_path==null){
        return(
          <View key={key}>
            {/* <Text>{val.title}</Text> */}
            <View style={Styles.card}>
              
                <View style={Styles.space} ></View>
                <View style={Styles.col}>
                  <Text style={{marginTop:10, fontWeight:'bold'}}>{val.original_title}</Text>
                  <Text style={{maxHeight: 50, width: screenWidth/1.8, flex: 1, flexWrap: 'wrap', marginTop:10, marginBottom:10,}}>{val.overview}</Text>
                  <Text style={Styles.rating}>{val.vote_average}</Text>
                </View>
              </View>
          </View>
        );
      }
      else{
      return(
        <View key={key}>
          {/* <Text>{val.title}</Text> */}
          <View style={Styles.card}>
            <Image source={{uri:"https://image.tmdb.org/t/p/w500/" + val.poster_path.toString()}} style={Styles.image}></Image>
              <View style={Styles.space} ></View>
              <View style={Styles.col}>
                <Text style={{marginTop:10, fontWeight:'bold'}}>{val.original_title}</Text>
                <Text style={{maxHeight: 50, width: screenWidth/1.8, flex: 1, flexWrap: 'wrap', marginTop:10, marginBottom:10,}}>{val.overview}</Text>
                <Text style={Styles.rating}>{val.vote_average}</Text>
              </View>
            </View>
        </View>
      );
    }
    });
      return(
        <View>
      <TextInput style={{ height: 50, borderColor: 'gray', borderWidth: 1 , margin: 10}} onChangeText={(text)=>{
          if(text==""){
            this.newFun("undefine")
          }else{
            this.newFun(text)
          }
        }}></TextInput>
          <ScrollView>
            {/* <View style={Styles.card}><Image source={{uri:"https://image.tmdb.org/t/p/w500/rRnc3XUGFLeQScHiMmdqqsyPpT9.jpg"}} style={Styles.image}></Image>
              <View style={Styles.space} ></View>
              <View style={Styles.col}>
                <Text style={{marginTop:10, fontWeight:'bold'}}>John Carter</Text>
                <Text style={{maxHeight: 50, width: screenWidth/1.8, flex: 1, flexWrap: 'wrap', marginTop:10, marginBottom:10,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                <Text style={Styles.rating}>7.8</Text>
              </View>
            </View> */}
            {Movies}
            <View style={{height:100}}></View>
          </ScrollView>
    </View>
      );
    }
  } 
}
const Styles = StyleSheet.create({
text:{
  color: 'blue'
},
card:{margin: 30,
  width: screenWidth/1.08,
  justifyContent: 'flex-start',
  borderRadius: 15,
  alignSelf: 'center',
  height: 130,
  shadowColor: '#000',
  shadowOffset: { width: 10, height: 20 },
  shadowOpacity: 0.8,
  shadowRadius: 20, 
  flexDirection: 'row',
  elevation: 10,
  backgroundColor: 'white'
},
rating:{
  color: 'blue',
  fontWeight: 'bold',
  fontSize: 18
},
col:{
  flexDirection:'column'
},
image:{
  position: 'absolute', 
  backgroundColor: 'black', 
  width: 100,
  left: screenWidth/50,
  bottom: screenWidth / 50,
  borderRadius:15, 
  height: 150,
  paddingBottom:10,
  zIndex: 10,
  
},
space:{
  width: screenWidth/2.9,
}
});

