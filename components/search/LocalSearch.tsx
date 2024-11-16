"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
interface LocalSearchProps {
    route: string;
    imgSrc: string;
    placeHolder: string;
    otherClass: string;
}

const LocalSearch = ({
    route,
    imgSrc,
    placeHolder,
    otherClass,
}: LocalSearchProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [searchQuery, setSearchQuery] = useState(query);
    useEffect(() => {
        const delayDebouncedfn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "query",
                    value: searchQuery,
                });
                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["query"],
                    });
                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebouncedfn);
    }, [searchQuery, router, route, searchParams, pathname]);
    return (
        <div
            className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClass}`}
        >
            <Image
                src={imgSrc}
                width={24}
                height={24}
                alt="search logo"
                className="cursor-pointer"
            />
            <Input
                type="text"
                placeholder={placeHolder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
            />
        </div>
    );
};

export default LocalSearch;
