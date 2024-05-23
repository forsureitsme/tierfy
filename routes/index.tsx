import { getGravatarUrl } from "../services/gravatar.ts";

export default function Home() {
  return (
    <section class="px-4 py-8 mx-auto bg-purple-700 text-white">
      <div class="mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6 rounded-full"
          src={getGravatarUrl()}
          width="128"
          height="128"
        />
        <h1 class="text-4xl font-bold">Tierfy</h1>
        <p class="my-4">
          Tierlists made by Pedro Cardoso da Silva (@forsureitsme)
        </p>
      </div>
    </section>
  );
}
