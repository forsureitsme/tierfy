import Kpopping from "@/services/kpopping.ts";

await Kpopping.makeTierlistWithGroupSlug(Deno.args[0]);