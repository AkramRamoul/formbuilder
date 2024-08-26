import React from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
function PublishFormButton() {
  return (
    <Button
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-rose-400"
      variant={"outline"}
    >
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
}

export default PublishFormButton;
