import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Share,
    Linking,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SingleArticleScreen = ({ navigation, route }) => {
    let article = route.params.article;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: article?.web_url
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.body}>
                <Image
                    style={styles.image}
                    source={{ uri: `https://www.nytimes.com/${article?.multimedia[0]?.url}` }}
                />
                <Text style={styles.title}>
                    {article?.headline?.main}
                </Text>
                <Text style={styles.author}>
                    {article?.document_type + ' | ' + article?.byline?.original + ' | ' + article?.news_desk + ' | ' + article?.type_of_material}
                </Text>
                <Text style={styles.mainText}>
                    {article?.snippet}
                </Text>
                <Text style={styles.mainText}>
                    {article?.lead_paragraph}
                </Text>
                <TouchableOpacity onPress={async () => await Linking.openURL(article?.web_url)}>
                    <Text style={styles.link}>
                        {article?.web_url}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onShare()}style={styles.button}>
                    <FontAwesome name={'share'} size={22} color={'white'} />
                    <Text style={styles.shareText}>Share This Article</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SingleArticleScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        width: '90%',
        alignSelf: 'center',
    },
    image: {
        marginVertical: 10,
        width: '100%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5,
        color: 'black',
    },
    author: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14
    },
    mainText: {
        color: 'black',
        fontSize: 16,
        marginVertical: 10
    },
    link: {
        color: 'lightblue',
        textDecorationLine: 'underline',
        fontWeight:'bold',
        fontSize: 14
    },
    button: {
        marginVertical: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10
    },
    shareText: {
        color: 'white',
        marginLeft: 10
    }
})
