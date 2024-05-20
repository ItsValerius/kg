import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const FallbackCard = () => {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Skeleton className="h-32 animate-pulse"></Skeleton>
      </CardContent>
    </Card>
  );
};

export default FallbackCard;
