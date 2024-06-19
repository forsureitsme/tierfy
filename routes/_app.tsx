import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tierfy</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-screen bg-black text-white">
        <div className="bg-gray-950">
          <nav className="container mx-auto flex">
            <a href={"/tierlists"}>
              <h1 className="py-2 text-3xl font-bold tracking-tighter">
                Tierfy
              </h1>
            </a>
          </nav>
        </div>
        <div className="container mx-auto">
          <Component />
        </div>
      </body>
    </html>
  );
}
