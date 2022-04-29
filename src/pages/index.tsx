import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { ListUrls } from "../components/ListUrls";
import { trpc } from "../shared/trpc";

const HomeContent: NextPage = () => {
  const { refetch } = trpc.useQuery(["get-all-url"]);

  const { mutate, isLoading, error } = trpc.useMutation("create-url", {
    onSuccess: () => refetch(),
  });

  return (
    <main className="sm:container mx-auto p-4 sm:px-0">
      <h1 className="text-3xl font-bold text-center pb-2">URL Shortener</h1>

      <div>
        <Formik initialValues={{ slug: "", fullUrl: "" }} onSubmit={(formData) => mutate(formData)}>
          {() => (
            <Form>
              {error && <p className="bg-red-600 text-white p-2 mb-2 rounded">{error.message}</p>}

              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <Field name="slug" placeholder="Slug" className="rounded bg-gray-100 flex-1 p-2" />

                <Field
                  name="fullUrl"
                  required
                  type="url"
                  placeholder="URL"
                  className="rounded bg-gray-100 flex-1 p-2"
                />

                <button
                  type="submit"
                  className="bg-blue-400 text-white rounded p-2"
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

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
