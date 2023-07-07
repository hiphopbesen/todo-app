'use client'
import pb from '@/lib/pocketbase'
import { FormEvent } from 'react'
import { useState } from 'react'


export default function Example() {
    const [error, setError] = useState<string>('')
    async function handlelogin(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
        const authData = await pb.collection('users').authWithPassword(
            email,
            password,
        ).then((res) => {
            //redirect to dashboard
            window.location.href = '/dashboard'
        })
        .catch((err) => {
            setError(err.data.message)
        })
    }
    return (
        <>
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="w-auto h-10 mx-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Logo"
                    />
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white">
                        Anmelden
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e)=>handlelogin(e)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email addresse
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Passwort
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                        Passwort vergessen?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Anmelden
                            </button>
                        </div>
                    </form>
                    {error && <div className="text-red-500">{error}</div>}
                </div>
            </div>
        </>
    )
}
