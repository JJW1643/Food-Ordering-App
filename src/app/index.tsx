import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const index = () => {

  // Access the authentication state from the AuthProvider using the useAuth hook to determine if the user is logged in or not.
  const {session, loading} = useAuth();


   // While AuthProvider is still checking Supabase for an existing session,
  // show a spinner. Without this, session is null for a split second and the
  // app wrongly redirects to sign-in even if the user is already logged in.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // No session = not logged in, send to sign-in screen
  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  // Has session = logged in, send straight to the user area.
  // Later you'll add admin role checking here to route admins differently.
  return <Redirect href={'/(user)'} />;

  // Temporary dev screen — lets you manually pick which area to test
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;