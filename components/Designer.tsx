"use client";

import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { generateId } from "@/lib/generateId";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    removeElement,
    setSelectedElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerBtnElement;

      const isOverDesignerEl = over.data?.current?.isDesignerDropArea;

      // Dropping sidebat btn overover desinger drop area
      if (isDesignerButtonElement && isOverDesignerEl) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );
        addElement(elements.length, newElement);
        return;
      }
      const isDroppingOverDsnElTopHalf = over.data?.current?.isTopHalf;
      const isDroppingOverDsnElBottomHalf = over.data?.current?.isBottomHalf;

      const isDroppingOverDsnEL =
        isDroppingOverDsnElTopHalf || isDroppingOverDsnElBottomHalf;

      const DroppingSideBarBtnOverDsnEl =
        isDesignerButtonElement && isDroppingOverDsnEL;

      //dropping new element over design element
      if (DroppingSideBarBtnOverDsnEl) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );
        const overId = over.data?.current?.elementId;
        const overElIndex = elements.findIndex((el) => el.id === overId);
        if (overElIndex === -1) {
          throw new Error("element not found");
        }
        let indexForNewEl = overElIndex;

        if (isDroppingOverDsnElBottomHalf) {
          indexForNewEl = overElIndex + 1;
        }
        addElement(indexForNewEl, newElement);
        return;
      }

      //dropping a desing element over another design element
      const isDraggingDesignEL = active.data?.current?.isDesignerElement;
      const draggingElOverAnother = isDroppingOverDsnEL && isDraggingDesignEL;
      if (draggingElOverAnother) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElIndex = elements.findIndex((el) => el.id === activeId);
        const overElIndex = elements.findIndex((el) => el.id === overId);

        if (activeElIndex === -1 || overElIndex === -1) {
          throw new Error("element not found");
        }
        const activeEl = { ...elements[activeElIndex] };
        removeElement(activeId);

        let indexForNewEl = overElIndex;

        if (isDroppingOverDsnElBottomHalf) {
          indexForNewEl = overElIndex + 1;
        }
        addElement(indexForNewEl, activeEl);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          selectedElement && setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3-xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalf: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalf: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;
  console.log("SELE", selectedElement);
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground
    cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full ">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              className="h-full flex justify-center border rounded-md rounded-l-none 
            bg-red-500"
              variant={"outline"}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary" />
      )}

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
