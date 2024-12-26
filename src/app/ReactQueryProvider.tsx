
"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface ReactQueryProviderProps {
    children: ReactNode
}


export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
