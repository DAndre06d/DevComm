import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

const UserAvatar = ({
    name,
    imageUrl,
    id,
    classname = "h-9 w-9",
}: {
    name: string;
    imageUrl?: string;
    id: string;
    classname: string;
}) => {
    const initials = name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    return (
        <Link href={ROUTES.PROFILE(id)}>
            <Avatar className={classname}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="object-cover"
                        width={36}
                        height={36}
                        quality={100}
                    />
                ) : (
                    <AvatarFallback className="primary-gradient font-bold-grotesk font-bold tracking-wider text-white">
                        {initials}
                    </AvatarFallback>
                )}
            </Avatar>
        </Link>
    );
};

export default UserAvatar;
