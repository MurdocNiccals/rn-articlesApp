import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const ArticleComponent = ({article,navigation}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={()=>navigation.navigate('SingleArticleScreen',{article:article})}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{uri:`https://www.nytimes.com/${article?.multimedia[0]?.url}`}}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.author}>
                    {article?.byline?.original?.slice(0,21).toString()}{article?.byline?.original?.length > 20 ? '...':''}
                </Text>
            </View>
            <View style={styles.titleAndDescription}>
                <Text style={styles.title}>
                    {article?.headline?.main.slice(0,100).toString()}{article?.headline?.main?.length > 50 ? '...' :''}
                </Text>
                <Text style={styles.article}>
                {article?.abstract?.slice(0,100).toString()}{article?.abstract?.length > 100 ? '...':''}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ArticleComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        width:'95%',
        alignSelf:'center',
    },
    image:{
        width:150,
        height:100,
        borderRadius:10,
    },
    titleAndDescription:{
        width:'60%',
        marginHorizontal:'2%'
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        color:'black'
    },
    imageContainer:{
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    author:{
        width:100,
        fontSize:12,
        textAlign:'center'
    }
})
