import { createHash } from "node:crypto";

export function getGravatarUrl(): string {
  const hash = createHash("sha256").update('forsureitsme@gmail.com').digest("hex");
  return `https://gravatar.com/avatar/${hash}?s=128`;
}
