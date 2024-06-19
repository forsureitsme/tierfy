import { UseQueryResult } from "@tanstack/react-query";
import { FunctionComponent } from "preact";

const Error: FunctionComponent<{ error: UseQueryResult["error"] }> = (
  { error },
) => (
  <div
    className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
    role="alert"
  >
    <p className="font-bold">Error</p>
    <p>{error?.message}</p>
  </div>
);

export default Error;
