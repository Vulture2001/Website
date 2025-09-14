"use client";

import { cn } from "@/lib/cn";
import React from "react";

export function Card({
                         className,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("card-base", className)} {...props} />;
}


export function CardBody({
                             className,
                             ...props
                         }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6", className)} {...props} />;
}

