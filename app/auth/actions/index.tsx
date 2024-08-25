"use server";

import { createSupbaseServerClient } from "@/utils/supaone";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

export async function signUpWithEmailAndPassword(data: {
        email: string;
        password: string;
        confirm: string;
}) {
        const supabase = await createSupbaseServerClient();

        const result = await supabase.auth.signUp(data);
        return JSON.stringify(result);


}

export async function loginWithEmailAndPassword(data: {
        email: string;
        password: string;
}) {
        const supabase = await createSupbaseServerClient();

        const result = await supabase.auth.signInWithPassword(data);
        return JSON.stringify(result);
}

export async function signInWithGoogle() {

     const supabase = await createSupbaseServerClient();  

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem('oauth_provider_token', session.provider_token)
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token')
    window.localStorage.removeItem('oauth_provider_refresh_token')
  }
})
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
       redirectTo: '/auth/callback',
    },
  })

if (data.url) {
  redirect(data.url)
 }
}

export async function signInWithGithub() {

     const supabase = await createSupbaseServerClient();  

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem('oauth_provider_token', session.provider_token)
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token')
    window.localStorage.removeItem('oauth_provider_refresh_token')
  }
})
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
       redirectTo: '/auth/callback',
    },
  })

if (data.url) {
  redirect(data.url)
 }
}
export async function logout() {
        const supabase = await createSupbaseServerClient();
        await supabase.auth.signOut();
        redirect("/auth");
}