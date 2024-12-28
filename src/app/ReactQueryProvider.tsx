
"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });

interface ReactQueryProviderProps {
    children: ReactNode
}


export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({children}) => {
    console.log(queryClient); // Debugging queryClient

    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
