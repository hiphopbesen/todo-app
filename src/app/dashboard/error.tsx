'use client' // Error components must be Client Components
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <div className="p-4 rounded-md bg-red-50">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <button
                            onClick={
                                // Attempt to recover by trying to re-render the segment
                                () => reset()
                            }
                        >
                            Erneut versuchen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}