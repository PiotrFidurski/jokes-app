import { Joke } from "@prisma/client";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke };

export let loader: LoaderFunction = async ({ params }) => {
  const jokeId = params.jokeId;

  const joke = await db.joke.findUnique({ where: { id: jokeId } });
  if (!joke) throw new Error("Joke not found");

  const data: LoaderData = { joke };

  return data;
};

export default function JokeRoute() {
  const data = useLoaderData();

  return (
    <div>
      <p>Here's your hilarious j😆oke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
