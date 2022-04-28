import { GetServerSideProps } from "next";
import React from "react";
import { prisma } from "../shared/prisma";

export const Slug: React.FC = () => null;

export default Slug;

export const getServerSideProps: GetServerSideProps<{}, { slug: string }> = async (ctx) => {
  if (!ctx.params?.slug)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  const url = await prisma.url.findFirst({ where: { slug: ctx.params.slug } });

  if (!url)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  return {
    redirect: {
      destination: url.fullUrl,
      permanent: true,
    },
  };
};
