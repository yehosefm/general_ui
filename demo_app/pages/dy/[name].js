import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'

import Layout from '../../components/layout';
 
export default function DynamicPage() {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>Dynamic page</title>
      </Head>
      <h1>Dynamic page</h1>
      <p>Name: {router.query.name}</p>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
  );
}