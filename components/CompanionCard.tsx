'use client'

import { createBookmark, deleteBookmark, getBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    isSignedIn: boolean;
}

const CompanionCard = ({ id, name, topic, subject, duration, color, isSignedIn }: CompanionCardProps) => {
    const [marked, setMarked] = useState(false)

    const handleBookmarkClick = async () => {
        if (!isSignedIn) {
            redirect("/sign-in")
        }
        if(marked){
            setMarked(!marked);
            const res = await deleteBookmark(id);
            if (!res) {
                setMarked(!marked);
            }
        } else {
            setMarked(!marked);
            const res = await createBookmark(id);
            if (!res) {
                setMarked(!marked);
            }
        }
    }

    useEffect(() => {
        const fetchBookmarks = async () => {
            const res = await getBookmark(id)
            if (res !== null && res !== undefined) {
                setMarked(true)
            } else {
                setMarked(false)
            }
        }
        fetchBookmarks()
    }, [])

    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark" onClick={handleBookmarkClick}>
                    <Image src={marked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"} alt="bookmark" width={12.5} height={15} />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">{topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
                <p className="text-sm">{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard
