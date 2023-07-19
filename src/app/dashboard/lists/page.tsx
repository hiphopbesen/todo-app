'use client'
import Addlist from './addlist'
import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase'
import getLink from '@/lib/getLink'
import Link from 'next/link'
const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]

export default function Example() {
    const [lists, setLists] = useState<any[]>([])
    
    useEffect(() => {
        async function getLists() {
            const records = await pb.collection('lists').getFullList({
                sort: '-created',
                expand: 'creator'
            });
            setLists(records)
        }
        getLists()
    }, [])

    if(lists.length <= 0) return <div>loading...</div>
    return (
        <>
        <ul role="list" className="divide-y divide-gray-400">
            {lists.map((list) => (
                <Link href={`/dashboard/lists/${list.id}`} key={list.id}>
                <li className="flex justify-between py-5 duration-300 cursor-pointer gap-x-6 hover:scale-[1.01]">
                    <div className="flex gap-x-4">
                        <img className="flex-none w-12 h-12 rounded-full bg-gray-50" src={getLink(list.collectionId, list.id, list.image+'?thumb=100x300')} alt="" />
                        <div className="flex-auto min-w-0">
                            <p className="text-sm font-semibold leading-6 text-gray-400">{list.name}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{list.expand.creator.name}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-400">{list.role}</p>
                        {list.updated ? (
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Letztes Update <time dateTime={list.updated}>{new Date(list.updated).toLocaleString('de-DE')}</time>
                            </p>
                        ) :null}
                    </div>
                </li>
                </Link>
            ))}
        </ul>
        <Addlist></Addlist>
        </>
    )
}