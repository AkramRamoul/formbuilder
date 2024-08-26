"use client";
import { ElementsType, FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here ...",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>designerComponent</div>,
  formComponent: () => <div>formComponent</div>,
  propertiesComponent: () => <div>propertiesComponent</div>,
};