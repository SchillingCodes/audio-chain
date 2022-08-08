import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '../src/utils/supabaseClient'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  const getBuckets = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase
      .storage
      .from('audio')
      .list();
    console.log(data);
    console.log(error);
  }

  const uploadFile = async (e: any) => {
    e.preventDefault();
    const file = (document.getElementById('myFile') as HTMLInputElement).files[0];
    (document.getElementById('myFile') as HTMLInputElement).value = null;
    const { data, error } = await supabase
      .storage
      .from('audio')
      .upload('test', file, {
        cacheControl: '3600',
        upsert: false
      });
    console.log(data);
    console.log(error);
  }

  return (
    <div className={styles.container}>
      <button onClick={(e) => getBuckets(e)}>test</button>
      <div>
        <input type="file" id="myFile" name="filename"></input>
      </div>
      <div>
        <button onClick={(e) => uploadFile(e)}>Submit</button>
      </div>
    </div>
  )
}

export default Home
