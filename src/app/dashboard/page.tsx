'use client'
import { Disclosure } from '@headlessui/react'
import { Suspense, useEffect, useState } from 'react'
import pb from '@/lib/pocketbase'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Was ist der Sinn dieser App?",
    answer:
      "Man kann Projekte anlegen, und diese mit seinen Kooperationspartnern bearbeiten.",
  },
  {
    question: "Wie wurde diese App erstellt?",
    answer:
      "Diese App wurde mit dem Framework NextJS erstellt. Außerdem wurde TailwindCss als CSS Framework verwendet und TailwindUI für das Design der Komponenten.",
  },
  {
    question: "Wie werden die Daten gespeichert?",
    answer:
      "Die Daten werden in einer Pocketbase instanz gespeichert.",
  },
]



export function Dash(props: any) {
  const [lists, setLists] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [todos, setTodos] = useState<any[]>([])
  const getdata = async () => {
    const records = await pb.collection('lists').getFullList({
      sort: '-created',
      expand: 'creator'
    });
    const users = await pb.collection('users').getFullList({
      sort: '-created',
    });
    const todos = await pb.collection('todos').getFullList({
      sort: '-created',
    });
    setLists(records)
    setUsers(users)
    setTodos(todos)
  }
  useEffect(() => {
    getdata()
  }, [])
  

  let done = 0;
  todos.map((todo) => {
    if(todo.done){
      done++
    }
  })
  const stats = [
    { name: 'Registrierte Nutzer', value: users.length },
    { name: 'gesamt erstellte Listen', value: lists.length, unit: 'Listen' },
    { name: 'Erstellte ToDo`s', value: todos.length },
    { name: 'Erledigte Todos', value: done },
  ]

  return (
    <div className="bg-gray-900 border border-gray-400 rounded-xl">
        <div className="mx-auto max-w-7xl ">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                <p className="flex items-baseline mt-2 gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  {stat.unit && <span className="text-sm text-gray-400">{stat.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}


export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <Dash />
      </Suspense>
      <div className="px-2 py-10 mx-auto max-w-7xl sm:py-32 lg:py-10">
        <div className="mx-auto divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Wilkommen bei der Todo App</h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex items-start justify-between w-full text-left text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="flex items-center ml-6 h-7">
                          {open ? (
                            <MinusSmallIcon className="w-6 h-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="w-6 h-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="pr-12 mt-2">
                      <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </main>
  )
}
