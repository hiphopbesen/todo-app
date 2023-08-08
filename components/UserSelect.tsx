import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

//@ts-ignore//
import pb from 'src/lib/pocketbase'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
interface Props {
    table: string,
    filter: string,
    placeholder?: string,
    multiselected?: any,
    val?: any,
    set: any
}

export default function UserSelect(props: Props) {
    console.log(props)
    const [selected, setSelected] = useState<any>(props.val ? props.val : { id: 0, name: '...' })
    const [selectable, setSelectable] = useState([])
    const multiselected = props.multiselected ? props.multiselected : [];


    const handlechange = (value: any) => {
        console.log(value)
        if (value.name === '') {
            setSelected({ id: 0, name: '...' })
            props.set({ id: 0, name: '...' })
            return
        }
        setSelected(value)
        props.set(value)
    }



    //get data 
    async function getdata() {
        const record = await pb.collection(props.table).getFullList(200, {
            filter: props.filter,
        }) as any;
        setSelectable(record);
        // console.log(record)
    }
    useEffect(() => {
        getdata();
    }, []);


    if (props.val === 'Selbsteintragen') {
        return (
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={props.placeholder}
                    onBlur={(e) => handlechange({ table: props.table, name: e.target.value })}
                />
            </div>
        )
    }

    return (
        <Listbox value={selected} onChange={handlechange}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{props.multiselected ? "+ Hinzufügen" : selected.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {selectable.map((option: any) => (
                                    <Listbox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            classNames(
                                                active  ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                multiselected.find((g: any) => g.id === option.id) ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'

                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {option.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                                
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
