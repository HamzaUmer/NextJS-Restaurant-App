import Head from 'next/head'
import Image from 'next/image'
import BriyaniList from '../components/BriyaniList'
import Featured from '../components/Featured'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'

export default function Home({briyaniList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Briyani Maker in Pakistan</title>
        <meta name="description" content="Best Briyani Resturants in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Featured/>
        {admin && <AddButton setClose={setClose}/>}
        <BriyaniList briyaniList={briyaniList}/>
        {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN){
    admin= true;
  }
  const res = await axios.get("https://jsonplaceholder.typicode.com/api/products");
  return {
    props: {
      briyaniList: res.data,
      admin
    },
  }
}