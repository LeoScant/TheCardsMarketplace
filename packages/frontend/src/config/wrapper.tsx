import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";
import Header from "../ui/molecules/Header";
const queryClient = new QueryClient();

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Header />
                {children}
            </QueryClientProvider>
        </WagmiProvider >
    )
}