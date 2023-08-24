'use client'
import { FormEvent, useState, useEffect } from 'react'
import pb from '@/lib/pocketbase'
import getLink from '@/lib/getLink'

export default function Example() {
    const [image, setImage] = useState<any>(null)

    const user = pb?.authStore?.model as any
    //console.log(user)

    function updateprofile(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        const form = e.currentTarget
        const data = {
            name: form['first-name'].value,
            username: form['last-name'].value,
        }
        pb.collection('users').update(user?.id, data)
    }
    async function headerupload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const form = new FormData();
        console.log(e.target.files)
        const file = e.target.files;
        if (file) {
            form.append('avatar', file[0]);
            let x = await pb.collection('users').update(user?.id, form)
            setImage(x)
        }
    }
    return (
        <>
            <main>
                <div className="divide-y divide-white/5">
                    <div className="grid grid-cols-1 px-4 py-16 max-w-7xl gap-x-8 gap-y-10 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-white">Nutzerprofil</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Aktualisiere dein Nutzerprofil.
                            </p>
                        </div>
                        <form className="md:col-span-2" onSubmit={(e) => updateprofile(e)}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="flex items-center col-span-full gap-x-8">
                                    <img
                                        src={!image ? getLink(user?.collectionId, user?.id, user?.avatar) : getLink(image?.collectionId, image?.id, image?.avatar)}
                                        alt=""
                                        className="flex-none object-cover w-24 h-24 bg-gray-800 rounded-lg"
                                    />
                                    <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                                        <div className="text-center">
                                            <div className="flex mt-4 text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-white/10 hover:bg-white/20"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        onChange={(e) => { headerupload(e) }}
                                                        id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            defaultValue={user?.name}
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                        Nutzername
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            defaultValue={user?.username}
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={user?.email}
                                            autoComplete="email"
                                            disabled
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-8">
                                <button
                                    type="submit"
                                    className="px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
