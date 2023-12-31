'use client'
import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import pb from '@/lib/pocketbase'
import getLink from '@/lib/getLink'
import UserSelect from '../../../../components/UserSelect'

const team = [
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leonard Krasner',
        email: 'leonard.krasner@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Floyd Miles',
        email: 'floyd.miles@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Emily Selman',
        email: 'emily.selman@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

interface Props {
    lists: any[],
    setLists: any,
}

export default function Addlist(props: Props) {
    const { lists, setLists } = props;
    const [open, setOpen] = useState(false)
    const [privacyValue, setPrivacyValue] = useState('public');
    const [team, setTeam] = useState<any>({})
    const [usercollection, setUsercollection] = useState<any>([])
    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        let editorids: any = [];
        usercollection.forEach((item: any) => {
            editorids.push(item.id)
        })
        const formdata = {
            creator: pb?.authStore?.model?.id,
            coauthors: editorids,
            public: privacyValue === 'public' ? true : false,
            name: data.get('project-name'),
            description: data.get('description'),
            privacy: privacyValue,
        }
        let created = await pb.collection('lists').create(formdata,{
            expand: 'creator'
        });
        setLists([...lists, created ])
        setOpen(false)
    }


    if (Object.keys(team).length > 0) {
        if (!usercollection.find((g: any) => g.id === team.id)) {
            setUsercollection([...usercollection, team]);
        }
        setTeam({});
    }
    const remove = (item: any) => {
        setUsercollection(usercollection.filter((g: any) => g.id !== item.id));
    }
    return (
        <>
        <button
            type="button"
            className="inline-flex items-center px-3 py-2 mt-5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpen(true)}
        >
            <PlusIcon className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>Neue Liste</span>
        </button>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                                    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col h-full bg-gray-900 divide-y divide-gray-600 shadow-xl">
                                        <div className="flex-1 h-0 overflow-y-auto">
                                            <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                        Neue Liste erstellen
                                                    </Dialog.Title>
                                                    <div className="flex items-center ml-3 h-7">
                                                        <button
                                                            type="button"
                                                            className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-sm text-indigo-300">
                                                        Erstellen sie ein Projekt und fügen sie anschließend Teilnehmer hinzu.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between flex-1">
                                                <div className="px-4 divide-y divide-gray-200 sm:px-6">
                                                    <div className="pt-6 pb-5 space-y-6">
                                                        <div>
                                                            <label
                                                                htmlFor="project-name"
                                                                className="block text-sm font-medium leading-6 text-gray-400"
                                                            >
                                                                Projektname
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="text"
                                                                    name="project-name"
                                                                    id="project-name"
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="description"
                                                                className="block text-sm font-medium leading-6 text-gray-400"
                                                            >
                                                                Beschreibung
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    rows={4}
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    defaultValue={''}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Editoren */}
                                                        {
                                                            privacyValue === 'closed' &&
                                                        <div>
                                                            <h3 className="text-sm font-medium leading-6 text-gray-400">Editoren</h3>
                                                            <div className="mt-2">
                                                                <div>
                                                                    <div>
                                                                        {usercollection.map((item: any) => (
                                                                            <span key={item.id} className="inline-flex mr-2 mb-2 items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                                {item.name}
                                                                                <button
                                                                                    onClick={() => {
                                                                                        remove(item);
                                                                                    }}
                                                                                    type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">

                                                                                    <span className="sr-only">Remove</span>
                                                                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                                                                        <path d="M4 4l6 6m0-6l-6 6" />
                                                                                    </svg>
                                                                                    <span className="absolute -inset-1" />
                                                                                </button>
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    <UserSelect table='users' filter='' placeholder='Nutzer' multiselected={usercollection} set={setTeam} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        }

                                                        <fieldset>
                                                            <legend className="text-sm font-medium leading-6 text-gray-400">Privatsphäre</legend>
                                                            <div className="mt-2 space-y-4">
                                                                <div className="relative flex items-start">
                                                                    <div className="absolute flex items-center h-6">
                                                                        <input
                                                                            id="privacy-public"
                                                                            name="privacy"
                                                                            aria-describedby="privacy-public-description"
                                                                            type="radio"
                                                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                                            defaultChecked
                                                                            onChange={(e) => {
                                                                                //if this is checked, set the privacy value to public
                                                                                if(e.currentTarget.checked) setPrivacyValue('public')
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="text-sm leading-6 pl-7">
                                                                        <label htmlFor="privacy-public" className="font-medium text-gray-400">
                                                                            Öffentlich
                                                                        </label>
                                                                        <p id="privacy-public-description" className="text-gray-500">
                                                                            Jeder kann dieses Projekt sehen.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="relative flex items-start">
                                                                        <div className="absolute flex items-center h-6">
                                                                            <input
                                                                                id="privacy-private-to-project"
                                                                                name="privacy"
                                                                                aria-describedby="privacy-private-to-project-description"
                                                                                type="radio"
                                                                                onChange={(e) => {
                                                                                    //if this is checked, set the privacy value to public
                                                                                    if(e.currentTarget.checked) setPrivacyValue('closed')
                                                                                }}
                                                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                                            />
                                                                        </div>
                                                                        <div className="text-sm leading-6 pl-7">
                                                                            <label htmlFor="privacy-private-to-project" className="font-medium text-gray-400">
                                                                                Privat für Projektmitglieder
                                                                            </label>
                                                                            <p id="privacy-private-to-project-description" className="text-gray-500">
                                                                                Nur Projektmitglieder können auf dieses Projekt zugreifen.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="relative flex items-start">
                                                                        <div className="absolute flex items-center h-6">
                                                                            <input
                                                                                id="privacy-private"
                                                                                name="privacy"
                                                                                aria-describedby="privacy-private-to-project-description"
                                                                                type="radio"
                                                                                onChange={(e) => {
                                                                                    //if this is checked, set the privacy value to public
                                                                                    if(e.currentTarget.checked) setPrivacyValue('private')
                                                                                }}
                                                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                                                            />
                                                                        </div>
                                                                        <div className="text-sm leading-6 pl-7">
                                                                            <label htmlFor="privacy-private" className="font-medium text-gray-400">
                                                                                Privat für mich
                                                                            </label>
                                                                            <p id="privacy-private-description" className="text-gray-500">
                                                                                Du bist der einzige, der auf dieses Projekt zugreifen kann.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end flex-shrink-0 px-4 py-4">
                                            <button
                                                type="button"
                                                className="px-3 py-2 text-sm font-semibold text-gray-400 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-3 py-2 ml-4 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </>
    )
}
