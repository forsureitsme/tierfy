// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_tierlists_slug_index from "./routes/api/tierlists/[slug]/index.ts";
import * as $api_tierlists_slug_items_itemId_index from "./routes/api/tierlists/[slug]/items/[itemId]/index.ts";
import * as $api_tierlists_index from "./routes/api/tierlists/index.ts";
import * as $index from "./routes/index.tsx";
import * as $tierlists_slug_ from "./routes/tierlists/[slug].tsx";
import * as $tierlists_index from "./routes/tierlists/index.tsx";
import * as $DraggableItem from "./islands/DraggableItem.tsx";
import * as $Item from "./islands/Item.tsx";
import * as $ItemEdit from "./islands/ItemEdit.tsx";
import * as $ItemList from "./islands/ItemList.tsx";
import * as $Providers from "./islands/Providers.tsx";
import * as $Tier from "./islands/Tier.tsx";
import * as $Tierlist from "./islands/Tierlist.tsx";
import * as $TierlistHandlers from "./islands/TierlistHandlers.ts";
import * as $Tierlists from "./islands/Tierlists.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/tierlists/[slug]/index.ts": $api_tierlists_slug_index,
    "./routes/api/tierlists/[slug]/items/[itemId]/index.ts":
      $api_tierlists_slug_items_itemId_index,
    "./routes/api/tierlists/index.ts": $api_tierlists_index,
    "./routes/index.tsx": $index,
    "./routes/tierlists/[slug].tsx": $tierlists_slug_,
    "./routes/tierlists/index.tsx": $tierlists_index,
  },
  islands: {
    "./islands/DraggableItem.tsx": $DraggableItem,
    "./islands/Item.tsx": $Item,
    "./islands/ItemEdit.tsx": $ItemEdit,
    "./islands/ItemList.tsx": $ItemList,
    "./islands/Providers.tsx": $Providers,
    "./islands/Tier.tsx": $Tier,
    "./islands/Tierlist.tsx": $Tierlist,
    "./islands/TierlistHandlers.ts": $TierlistHandlers,
    "./islands/Tierlists.tsx": $Tierlists,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
