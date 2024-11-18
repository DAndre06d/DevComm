import ROUTES from "@/constants/routes";
import { Badge } from "../ui/badge";
import Link from "next/link";
import React from "react";
import { getDevIconClassname } from "@/lib/utils";
import Image from "next/image";
interface Props {
    _id: string;
    name: string;
    questions?: number;
    showCount?: boolean;
    compact?: boolean;
    remove?: boolean;
    isButton?: boolean;
    handleRemove?: () => void;
}

const TagCard = ({
    _id,
    name,
    questions,
    showCount,
    compact,
    remove,
    isButton,
    handleRemove,
}: Props) => {
    const iconClass = getDevIconClassname(name);
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };
    const content = (
        <>
            <Badge className="background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase fle flex-row gap-2">
                <div className="flex-center space-x-2">
                    <i className={`${iconClass} text-sm`}></i>
                    <span>{name}</span>
                </div>
                {remove && (
                    <Image
                        src={"/icons/close.svg"}
                        width={12}
                        height={12}
                        alt="close button"
                        className="cursor-pointer object-contain invert-0 dark:invert"
                        onClick={handleRemove}
                    />
                )}
            </Badge>
            {showCount && (
                <p className="small-medium text-dark500_light700">
                    {questions}
                </p>
            )}
        </>
    );
    if (compact) {
        return isButton ? (
            <button
                onClick={handleClick}
                className="flex justify-between gap-2"
            >
                {content}
            </button>
        ) : (
            <Link
                href={ROUTES.TAGS(_id)}
                className="flex justify-between gap-2"
            >
                {content}
            </Link>
        );
    }
};

export default TagCard;
