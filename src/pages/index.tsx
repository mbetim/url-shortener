import type { NextPage } from "next";
import Head from "next/head";
import { ListUrls } from "../components/ListUrls";
import { UrlForm } from "../components/UrlForm";

const HomeContent: NextPage = () => {
  return (
    <main className="sm:container mx-auto p-4 sm:px-0">
      <h1 className="text-3xl font-bold text-center pb-2">URL Shortener</h1>

      <UrlForm />

      <hr className="my-6" />

      <ListUrls />
    </main>
  );
};

const Home: NextPage = () => (
  <div>
    <Head>
      <title>URL Shortener</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <HomeContent />
  </div>
);

export default Home;
