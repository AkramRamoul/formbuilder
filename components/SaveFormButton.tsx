import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSave } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";
function SaveFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();

  const { elements } = useDesigner();
  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Succes",
        description: "Your form is saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSave className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin " />}
    </Button>
  );
}
export default SaveFormButton;
