import { url as gravatarUrl } from "npm:gravatar";

export default function Home() {
  return (
    <section className="px-4 py-8 mx-auto bg-purple-700 text-white">
      <div className="mx-auto flex flex-col items-center justify-center">
        <img
          className="my-6 rounded-full"
          src={gravatarUrl("forsureitsme@gmail.com", { s: 128 })}
          width="128"
          height="128"
        />
        <h1 className="text-4xl font-bold">Tierfy</h1>
        <p className="my-4">
          Tierlists made by Pedro Cardoso da Silva (@forsureitsme)
        </p>
      </div>
    </section>
  );
}
