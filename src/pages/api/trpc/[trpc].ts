import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "../../../shared/prisma";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .mutation("create-url", {
    input: z.object({ slug: z.string().nullish(), fullUrl: z.string() }),
    async resolve({ input }) {
      let { slug } = input;

      if (slug) {
        const isSlugInUse = await prisma.url.findFirst({ where: { slug } });

        if (isSlugInUse) throw new Error("Slug already in use");
      } else {
        slug = nanoid(5);
      }

      const url = await prisma.url.create({ data: { slug, fullUrl: input.fullUrl } });

      return { url };
    },
  })
  .mutation("delete-url-by-slug", {
    input: z.object({ slug: z.string() }),
    async resolve({ input }) {
      return await prisma.url.delete({ where: { slug: input.slug } });
    },
  })
  .query("get-all-url", {
    async resolve() {
      return await prisma.url.findMany();
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
