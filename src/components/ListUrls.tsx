import React from "react";
import { trpc } from "../shared/trpc";

export const ListUrls: React.FC = () => {
  const { data, isLoading, error, refetch } = trpc.useQuery(["get-all-url"]);
  const { mutate: deleteUrl, isLoading: isLoadingMutation } = trpc.useMutation(
    ["delete-url-by-slug"],
    { onSuccess: () => refetch() }
  );

  if (isLoading || isLoadingMutation)
    return <p className="rounded p-3 text-blue-600 bg-blue-200">Loading URLs...</p>;

  if (error) return <p className="rounded p-3 text-red-600 bg-red-200">{error.message}</p>;

  const copyToClipboard = (slug: string) =>
    navigator.clipboard.writeText(window.location.href + slug);

  return (
    <div className="mt-10 grid gap-y-5 grid-cols-1 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4">
      {data?.map((url) => (
        <div key={url.slug} className="shadow ease-linear duration-150 rounded p-3">
          <a href={url.fullUrl} target="_blank" rel="noreferrer">
            <h1 className="text-lg font-bold">{url.slug}</h1>
          </a>

          <div className="my-2">
            <p className="text-sm text-black/50 break-words">{url.fullUrl}</p>
            <p className="text-sm text-black/50">Created on {url.createdAt.toDateString()}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white ease-linear duration-150"
              onClick={() => copyToClipboard(url.slug)}
            >
              Copy
            </button>

            <button
              className="flex-1 py-1 rounded bg-red-600 hover:bg-red-700 text-white ease-linear duration-150"
              onClick={() => deleteUrl({ slug: url.slug })}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
