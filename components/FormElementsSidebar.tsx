import React from "react";
import SideBarBtnElement from "./SideBarBtnElement";
import { FormElements } from "./FormElements";

function FormElementsSideBar() {
  return (
    <div>
      Elements
      <SideBarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FormElementsSideBar;
