import React from "react";
import { trpc } from "../shared/trpc";

export const ListUrls: React.FC = () => {
  const { data, isLoading } = trpc.useQuery(["get-all-url"]);

  if (isLoading) return <p className="rounded p-3 text-blue-600 bg-blue-200">Loading URLs...</p>;

  return (
    <div className="grid grid-cols-1 gap-y-5 md:grid-cols-4 md:gap-x-5 mt-10">
      {data?.map((url) => (
        <a key={url.slug} href={url.fullUrl} target="_blank" rel="noreferrer">
          <div className="shadow hover:shadow-md ease-linear duration-150 rounded p-3">
            <h1 className="text-lg font-bold">{url.slug}</h1>

            <p className="text-sm text-black/50 break-words">{url.fullUrl}</p>
            <p className="text-sm text-black/50">Created on {url.createdAt.toDateString()}</p>
          </div>
        </a>
      ))}
    </div>
  );
};
