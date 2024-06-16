import { FunctionComponent } from "preact";
import { Icon } from "@iconify-icon/react";

const Loading: FunctionComponent = () => (
  <div className="text-5xl text-center p-5">
    <Icon icon="line-md:loading-loop" />
  </div>
);

export default Loading;
