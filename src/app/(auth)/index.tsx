import {  KeyboardAvoidingView, Platform, ScrollView, Text, View, TextInput, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '@/assets/styles/AuthScreen.styles'
import {LinearGradient} from 'expo-linear-gradient'
import { Colors } from '../../../constants/Colors'
import {SvgXml} from 'react-native-svg'
import {Ionicons} from '@react-native-vector-icons/ionicons'



type Mode = 'login' | 'register'

export default function AuthScreen() {
    const [mode, setMode] = useState<Mode>('register')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [handle, setHandle] = useState('')
    const [verificationCode, setVerificationCode]= useState('')
    const [loading, setLoading]= useState(false)
    const [verifying, setVerifying]= useState(false)
    const router = useRouter()
    const svgMarkup = `<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35.003" cy="35.005" r="14.001" fill="#fff"/><path d="M35.906.012A34.84 34.84 0 0 1 56.85 7.655c-4.245 2.367-7.243 6.7-7.765 11.766A20.93 20.93 0 0 0 35.003 14C23.403 14 14 23.403 14 35.003s9.404 21.003 21.003 21.003 21.003-9.404 21.003-21.003q-.001-.594-.034-1.18a15.2 15.2 0 0 0 8.306 2.455c2.025 0 3.957-.396 5.725-1.111l-.009.74c-.48 18.913-15.962 34.099-34.991 34.099l-.903-.012C15.486 69.523.483 54.52.012 35.906L0 35.003C0 15.67 15.671 0 35.003 0z" fill="#fff"/></svg>`



    const handleSubmit = async()=>{
         setLoading(true)
         setTimeout(()=>{
            setLoading(false)
            setVerifying(true)
         }, 1500)
    };

    const handleVerify = async () => {
        setLoading(true)
         setTimeout(()=>{
            setLoading(false)
             router.replace("/(tabs)")
         }, 1500)
        
    }

    if(verifying){
        return (
            <SafeAreaView  style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios'? 'padding' : undefined}>
        {/*Managing the keyboard when it appears on the screen is crucial in mobile app. Above a component that automatically adjusts a view's height, position, or bottom padding based on the keyboard height to remain visible while it is displayed. */}
        {/* keyboardshouldpersittaps: Determines when the keyboard should stay visible after a tap.
'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor) */}
        <ScrollView contentContainerStyle={styles.scroll}  keyboardShouldPersistTaps='handled'>
            {/* logo */}
            <View style={styles.logoRow}>
                <LinearGradient  colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
                    <SvgXml  xml={svgMarkup} width='50%' height='50%'/>
                </LinearGradient>
                <Text style={styles.appName}>Social Chat App</Text>
            </View>
            {/* Hero Text */}
            <Text style={styles.heading}>Verify Email</Text>
            <Text style={styles.subheading}>We have sent a 6-digit verification to your {email}</Text>
            {/* form */}
            <View style={styles.form}>
               

                <View  style={styles.field}>
                    <Text style={styles.fieldLabel}>Verification Code</Text>
                    <TextInput  style={styles.input} value={verificationCode} onChangeText={setVerificationCode} placeholder='Your email' placeholderTextColor={Colors.outlineVariant} autoCapitalize='none' keyboardType='number-pad'/>
                </View>

               {/* Back to sign up link */}
               <View  style={styles.toggleRow}>
                <Text style={styles.toggleText}>
                    Did not receive a code
                </Text>
                <Pressable  onPress={()=>setVerifying(false)}>
                    <Text style={styles.toggleLink}>Go Back</Text>
                </Pressable>

               </View>
                {/* Submit */}
                <TouchableOpacity onPress={handleVerify} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper}>
                    <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} start={{x:0, y:0}} end={{x:1, y: 1}} style={styles.btn}>
                        {loading ? (
                            <ActivityIndicator color={Colors.onPrimary} size='small'/>
                        ) : (
                            <>
                            <Text style={styles.btnText}>Verify Code</Text>
                            <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary}/>
                            </>
                        )}
                    </LinearGradient>
                    
                </TouchableOpacity>
                
            </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
        )
    }
  return (
    <SafeAreaView  style={styles.safe}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios'? 'padding' : undefined}>
        {/*Managing the keyboard when it appears on the screen is crucial in mobile app. Above a component that automatically adjusts a view's height, position, or bottom padding based on the keyboard height to remain visible while it is displayed. */}
        {/* keyboardshouldpersittaps: Determines when the keyboard should stay visible after a tap.
'never' (the default), tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When this happens, children won't receive the tap.
'always', the keyboard will not dismiss automatically, and the scroll view will not catch taps, but children of the scroll view can catch taps.
'handled', the keyboard will not dismiss automatically when the tap was handled by a children, (or captured by an ancestor) */}
        <ScrollView contentContainerStyle={styles.scroll}  keyboardShouldPersistTaps='handled'>
            {/* logo */}
            <View style={styles.logoRow}>
                <LinearGradient  colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>
                    <SvgXml  xml={svgMarkup} width='50%' height='50%'/>
                </LinearGradient>
                <Text style={styles.appName}>Social Chat App</Text>
            </View>
            {/* Hero Text */}
            <Text style={styles.heading}>{mode === 'login' ? 'Welcome back  ' : 'Create account'}</Text>
            <Text style={styles.subheading}>{mode === 'login' ? 'Sign in to continue chatting  ' : 'Fill in your details to get started'}</Text>
            {/* form */}
            <View style={styles.form}>
                {mode === 'register' && (<>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <TextInput  style={styles.input} value={name} onChangeText={setName} placeholder='Your name' placeholderTextColor={Colors.outlineVariant} autoCapitalize='words'/>
                </View>
                <View  style={styles.field}>
                    <Text style={styles.fieldLabel}>Username Handle</Text>
                    <View  style={styles.handleRow}>
                        <Text style={styles.atSign}>@</Text>
                        <TextInput style={[styles.input,styles.handleInput]} value={handle} onChangeText={(v)=>setHandle(v.toLowerCase().replace(/\s/g, ''))} placeholder='username' placeholderTextColor={Colors.outlineVariant} autoCapitalize='none'/>
                            {/* It's a regular expression where the \s means "match whitespace" and the g is a flag which means "global", i.e. match all whitespace, not just the first. */}

                    </View>

                </View>
                </>) }

                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput  style={styles.input} value={email} onChangeText={setEmail} placeholder='Your email' placeholderTextColor={Colors.outlineVariant} autoCapitalize='none' keyboardType='email-address'/>
                </View>

                <View>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <TextInput  style={styles.input} value={password} onChangeText={setPassword} placeholder='......' placeholderTextColor={Colors.outlineVariant} secureTextEntry/>
                </View>
                {/* toggle mode */}
                <View style={styles.toggleRow}>
                    <Text style={styles.toggleText}> {mode === "login"? "Don't have an account?": "Already have an account?"}</Text>
                    <Pressable onPress={()=>setMode(mode === 'login'? 'register': 'login')}>
                        <Text style={styles.toggleLink}>{mode === 'login'? 'Sign Up': 'Sign In'}</Text>
                    </Pressable>
                </View>
                {/* Submit */}
                <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper}>
                    <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} start={{x:0, y:0}} end={{x:1, y: 1}} style={styles.btn}>
                        {loading ? (
                            <ActivityIndicator color={Colors.onPrimary} size='small'/>
                        ) : (
                            <>
                            <Text style={styles.btnText}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Text>
                            <Ionicons name='arrow-forward' size={18} color={Colors.onPrimary}/>
                            </>
                        )}
                    </LinearGradient>
                    
                </TouchableOpacity>
                
            </View>

        </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}