'use client'
import { Fragment, useState, useEffect, FormEvent } from "react"
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import Image from "next/image"
import pb from '@/lib/pocketbase'
import getLink from '@/lib/getLink'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


export default function Page(pageprops: any) {
    const id = pageprops.params.id
    const [tabs, setTabs] = useState<any>([
        { name: 'Alle', href: '#', current: true },
        { name: 'Unerledigt', href: '#', current: false },
        { name: 'Erledigt', href: '#', current: false },
    ])
    const currentTab = tabs.find((tab: any) => tab.current).name
    const [list, setList] = useState<any>([])
    console.log(list)
    const filteredlist = list.expand?.todos?.filter((todo: any) => {
        if(currentTab === 'Alle') return true
        if(currentTab === 'Unerledigt') return todo.done === false
        if(currentTab === 'Erledigt') return todo.done === true
    })
    const listids = list.expand?.todos?.length >0 ? list.expand?.todos.map((todo: any) => todo.id) : []
    useEffect(() => {
        async function getLists() {
            const record = await pb.collection('lists').getOne(id, {
                expand: 'todos.user,todos.assigned,coauthors,creator',
            });
            setList(record)
        }
        getLists()
    }, [])



    if(list.length <= 0) return <div>loading...</div>
    return (
        <>
            <h1 className="my-5 text-3xl font-bold ">{list.name}</h1>
            <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                Select a tab
                </label>
                <select
                onChange={(event) => {
                    const value = event.target.value
                    setTabs(
                        tabs.map((tab: any) => ({
                            ...tab,
                            current: tab.name === value,
                        }))
                    )
                }}
                id="tabs"
                name="tabs"
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab:any) => tab.current).name}
                >
                {tabs.map((tab:any) => (
                    <option key={tab.name}>{tab.name}</option>
                ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-600">
                <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                    {tabs.map((tab:any) => (
                    <a
                        onClick={(event) => {
                            const value = tab.name
                            setTabs(
                                tabs.map((tab: any) => ({
                                    ...tab,
                                    current: tab.name === value,
                                }))
                            )
                        }}
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                        tab.current
                            ? 'border-gray-50 text-gray-50'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                    >
                        {tab.name}
                    </a>
                    ))}
                </nav>
                </div>
            </div>
            </div>
            {filteredlist.length > 0 && filteredlist.map((todo: any) => (
                //get current tab
                <div key={todo.id} className="p-3 my-4 bg-gray-900 border border-gray-600 rounded-lg shadow-sm">
                    <div className="grid sm:grid-cols-[0.1fr_2fr_1fr]">
                        <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            onChange={async (e) => {
                                const res = await pb.collection('todos').update(todo.id, {done: e.target.checked,})
                                //update list in state
                                setList((list: any) => {
                                    const updatedList = { ...list };
                                    updatedList.expand.todos = updatedList.expand.todos.map((todo:any) => {
                                        if (todo.id === res.id) {
                                            todo.done = res.done;
                                        }
                                        return todo;
                                    });
                                    return updatedList;
                                });
                            }}
                            defaultChecked={todo.done}
                            className="w-4 h-4 m-auto ml-0 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                        />
                        <div className="font-medium text-gray-400 ">
                            <h2 className="text-xl">{todo.title}</h2>
                        </div>
                        <div className="flex justify-between">
                        {todo.expand.assigned ?
                        <a href="#" className="flex-shrink-0 block group">
                        <div className="flex items-center">
                            <div>
                            <img
                                className="inline-block rounded-full h-9 w-9"
                                src={getLink(todo.expand?.assigned?.collectionId, todo.expand.assigned.id, todo.expand.assigned.avatar)}
                                alt=""
                            />
                            </div>
                            <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{todo.expand.assigned.username}</p>
                            </div>
                        </div>
                        </a>
                        :
                        <div className="flex-shrink-0 block group">
                        <div className="flex items-center">
                            <div>
                            <UserCircleIcon className="inline-block rounded-full h-9 w-9" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Unassigned</p>
                            </div>
                        </div>
                        </div>
                        }
                        <p className="text-sm text-gray-400">
                            {todo.dated && 
                                <>
                                <p>Fällig bis</p>
                                {new Date(todo.dated).toLocaleDateString('de-DE', {})}
                                </>
                            }
                        </p>
                        </div>
                    </div>
                    <div className="flex pt-3 mt-3 border-t border-gray-600">
                        {todo.image && 
                            <Image
                                src={getLink(todo.collectionId, todo.id, todo.image)}
                                alt=""
                                width={200}
                                height={200}
                            />
                        }
                        <p className="pl-10 text-sm text-gray-400">{todo.text}</p>
                    </div>
                </div>
            ))}
            <AddTodo authors={list.expand.coauthors} id={id} listids={listids} setLists={setList}/>
        </>
    )
}




const AddTodo = (props: any) => {
    console.log(props)
    let assignees = [
        { name: 'Unassigned', avatar: "", value: null },
    ]
    //add coauthors to assignees
    
    if(props.authors.length > 0){
        props.authors.map((author: any) => {
            assignees.push({ name: author.name, avatar: getLink( author.collectionId,author.id, author.avatar), value: author.id })
        })
    }
    const labels = [
        { name: 'Unlabelled', value: null },
        { name: 'hohe Priorität', value: 'highprio' },
        // More items...
    ]
    const dueDates = [
        { name: 'Kein Fälligkeitsdatum', value: null },
        { name: 'Heute', value: 'today' },
        { name: 'Morgen', value: 'tomorrow' },
        { name: 'diese Woche', value: 'week' },
        // More items...
    ]

    function classNames(...classes:any[]) {
        return classes.filter(Boolean).join(' ')
    }
    const [assigned, setAssigned] = useState(assignees[0])
    const [labelled, setLabelled] = useState(labels[0])
    const [dated, setDated] = useState(dueDates[0])

    async function handleaddtodo(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const image = data.get('attachment') as File;
        let until: Date|null = new Date()
        if(dated.value === 'tomorrow'){
            until.setDate(until.getDate() + 1)
        }else if(dated.value === 'week'){
            until.setDate(until.getDate() + 7)
        }else{
            until = null
        }

        data.append("user",  pb?.authStore?.model?.id as string)
        data.append("done",  "false",)
        data.append("title",  title,)
        data.append("text",  description,)
        data.append("assigned",  assigned.value as unknown as string)
        data.append("labelled",  labelled.value as string)
        data.append("dated",  until as unknown as string)
        data.append("image",  image)
        console.log(data)
        let tmpids = props.listids
        if(pb?.authStore?.model?.id === null) return
        const record = await pb.collection('todos').create(data)
        tmpids.push(record.id)
        const updatedlist = await pb.collection('lists').update(props.id, {todos: tmpids,},{
            expand: 'todos.user,todos.assigned,coauthors,creator',
        })
        props.setLists(updatedlist)
    }
    return (
        <form onSubmit={(e)=>handleaddtodo(e)} className="relative bg-gray-900">
            <div className="overflow-hidden border border-gray-600 rounded-lg shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="title" className="sr-only">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full border-0 pt-2.5 text-lg font-medium bg-gray-900 placeholder:text-gray-400 focus:ring-0"
                    placeholder="Title"
                />
                <label htmlFor="description" className="sr-only">
                    Description
                </label>
                <textarea
                    rows={2}
                    name="description"
                    id="description"
                    className="block w-full py-0 bg-gray-900 border-0 resize-none text-gray-50 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a description..."
                    defaultValue={''}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9" />
                    </div>
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-px">
                {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
                <div className="flex justify-end px-2 py-2 space-x-2 flex-nowrap sm:px-3">
                    <Listbox as="div" value={assigned} onChange={setAssigned} className="flex-shrink-0">
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Assign</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="relative inline-flex items-center px-2 py-2 text-sm font-medium bg-gray-900 rounded-full text-gray-9000 whitespace-nowrap hover:bg-gray-600 sm:px-3">
                                        {assigned.value === null ? (
                                            <UserCircleIcon className="flex-shrink-0 w-5 h-5 text-gray-50 sm:-ml-1" aria-hidden="true" />
                                        ) : (
                                            <img src={assigned.avatar} alt="" className="flex-shrink-0 w-5 h-5 rounded-full" />
                                        )}
                                        <span
                                            className={classNames(
                                                assigned.value === null ? '' : 'text-gray-50',
                                                'hidden truncate sm:ml-2 sm:block'
                                            )}
                                        >
                                            {assigned.value === null ? 'Assign' : assigned.name}
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute right-0 z-10 py-3 mt-1 overflow-auto text-base bg-gray-900 rounded-lg shadow max-h-56 w-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {assignees.map((assignee) => (
                                                <Listbox.Option
                                                    key={assignee.value}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-600' : 'bg-gray-900',
                                                            'relative cursor-default select-none px-3 py-2'
                                                        )
                                                    }
                                                    value={assignee}
                                                >
                                                    <div className="flex items-center">
                                                        {assignee.avatar ? (
                                                            <img src={assignee.avatar} alt="" className="flex-shrink-0 w-5 h-5 rounded-full" />
                                                        ) : (
                                                            <UserCircleIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                                                        )}
                                                        <span className="block ml-3 font-medium truncate">{assignee.name}</span>
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="relative inline-flex items-center px-2 py-2 text-sm font-medium bg-gray-900 rounded-full text-gray-9000 whitespace-nowrap hover:bg-gray-600 sm:px-3">
                                        <TagIcon
                                            className={classNames(
                                                labelled.value === null ? 'text-gray-600' : 'text-gray-9000',
                                                'h-5 w-5 flex-shrink-0 sm:-ml-1'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={classNames(
                                                labelled.value === null ? '' : 'text-gray-50',
                                                'hidden truncate sm:ml-2 sm:block'
                                            )}
                                        >
                                            {labelled.value === null ? 'Label' : labelled.name}
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute right-0 z-10 py-3 mt-1 overflow-auto text-base bg-gray-900 rounded-lg shadow max-h-56 w-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {labels.map((label) => (
                                                <Listbox.Option
                                                    key={label.value}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-600' : 'bg-gray-900',
                                                            'relative cursor-default select-none px-3 py-2'
                                                        )
                                                    }
                                                    value={label}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="block font-medium truncate">{label.name}</span>
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Fälligkeitsdatum</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button className="relative inline-flex items-center px-2 py-2 text-sm font-medium bg-gray-900 rounded-full text-gray-9000 whitespace-nowrap hover:bg-gray-600 sm:px-3">
                                        <CalendarIcon
                                            className={classNames(
                                                dated.value === null ? 'text-gray-600' : 'text-gray-9000',
                                                'h-5 w-5 flex-shrink-0 sm:-ml-1'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={classNames(
                                                dated.value === null ? '' : 'text-gray-50',
                                                'hidden truncate sm:ml-2 sm:block'
                                            )}
                                        >
                                            {dated.value === null ? 'Fälligkeitsdatum' : dated.name}
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute right-0 z-10 py-3 mt-1 overflow-auto text-base bg-gray-900 rounded-lg shadow max-h-56 w-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {dueDates.map((dueDate) => (
                                                <Listbox.Option
                                                    key={dueDate.value}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-600' : 'bg-gray-900',
                                                            'relative cursor-default select-none px-3 py-2'
                                                        )
                                                    }
                                                    value={dueDate}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="block font-medium truncate">{dueDate.name}</span>
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
                <div className="flex items-center justify-between px-2 py-2 space-x-3 border-t border-gray-200 sm:px-3">
                    <div className="flex">
                        <div
                            className="inline-flex items-center px-3 py-2 -my-2 -ml-2 text-left text-gray-400 rounded-full group"
                        >
                            
                            <PaperClipIcon className="w-5 h-5 mr-2 -ml-1 group-hover:text-gray-9000" aria-hidden="true" />
                            <input type="file" name="attachment" id="attachment" className="" />
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}