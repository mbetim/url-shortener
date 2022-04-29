import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { trpc } from "../shared/trpc";

interface FormData {
  slug: string;
  fullUrl: string;
}

const initialValues: FormData = {
  slug: "",
  fullUrl: "",
};

export const UrlForm: React.FC = () => {
  const { refetch } = trpc.useQuery(["get-all-url"]);
  const { mutate, isLoading, error } = trpc.useMutation("create-url");

  const handleSubmit = (formData: FormData, formHelpers: FormikHelpers<FormData>) => {
    mutate(formData, {
      onSuccess: () => {
        refetch();
        formHelpers.resetForm();
      },
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
  );
};
