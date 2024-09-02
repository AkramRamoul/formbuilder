import React from "react";
import { GetFormByUrl } from "../../../actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComp from "@/components/FormSubmitComp";
async function Submit({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormByUrl(params.formUrl);
  if (!form) {
    throw new Error("form not found");
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComp formUrl={params.formUrl} content={formContent} />;
}

export default Submit;
