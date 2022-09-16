import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {logger} from "../utils/logger";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Macgyver</title>
        <meta name="description" content="macgyver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>
        This is the macgyver app
      </p>
    </div>
  )
}

export default Home
