import { View, Text, FlatList, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/StoriesBar.styles'
import { UserStory } from '../../types'
import { dummyStoriesData } from '@/assets/assets'
import Ionicons from '@react-native-vector-icons/ionicons'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import Avatar from './Avatar'
interface StoriesBarProps{
    onViewStory : (us : UserStory)=>void

}

export default function StoriesBar({onViewStory} : StoriesBarProps) {
    const [uploading, setUploading] = useState(false)
    const {userStories} = {userStories: dummyStoriesData}

    const pickAndUpload = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /* Asks the user to grant permissions for accessing user's photo. This method does nothing on web.@param writeOnly — Whether to request write or read and write permissions. Defaults to false */
        if(status !== 'granted'){
            Alert.alert('Permission needed', 'Allow access to your photos to post a story');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ['images', 'videos'],
            quality: 0.8,
        })
        /* Display the system UI for choosing an image or a video from the phone's library. Requires Permissions.MEDIA_LIBRARY on iOS 10 only. On mobile web, this must be called immediately in a user interaction like a button press, otherwise the browser will block the request without a warning. */

        if(result.canceled || !result.assets[0] ) return;

        const asset = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
            uri: asset.uri,
            type: asset.mimeType  || 'image/jpeg',
            name: asset.fileName || "story/jpg "

        } as any);
        setUploading(true);
        setTimeout(()=>{
            setUploading(false)
        }, 2000)
    }
  return (
    <FlatList data={[{_addStory : true}, ...userStories] as any[]} keyExtractor={(item, i)=>(item._addStory ? 'add': item.user._id || String(i)) } horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}
    renderItem={({item})=>{
        if(item._addStory){
            return (
                <TouchableOpacity style={styles.storyItem} onPress={pickAndUpload} disabled={uploading}>
                    <View style={styles.addCircle}>
                        <Ionicons name={uploading ? 'hourglass' : 'add'} size={24} color={Colors.onSurfaceVariant}/>
                    </View>
                    <Text style={styles.label}>Your Story</Text>
                </TouchableOpacity>
            )
        }
        /* us : user story */
        const us = item as UserStory
        return (
            <Pressable  style={styles.storyItem} onPress={()=> onViewStory(us)}>
               <View style={styles.storyRing}>
                <Avatar name={us.user.name} src={us.user.avatar} size={52}/>
               </View>
               {/* 'numberOfLine' : This prop is commonly used with ellipsizeMode. */}
               <Text style={styles.label} numberOfLines={1}>{us.user.name.split(' ')[0]}</Text>
            </Pressable>
        )
    }}>
        {/* contentContainerStyle:These styles will be applied to the scroll view content container which wraps all of the child views */}
      
    </FlatList>
  )
}