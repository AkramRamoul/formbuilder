"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitButton({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const ShareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(ShareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitButton;
