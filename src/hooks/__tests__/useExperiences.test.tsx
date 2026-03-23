import { renderHook, waitFor } from "@testing-library/react";
import { useExperiences } from "../useExperiences";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client= { queryClient } > { children } </QueryClientProvider>
);

describe("useExperiences", () => {
    beforeEach(() => {
        queryClient.clear();
        vi.stubGlobal("fetch", vi.fn());
    });

    it("fetches experiences successfully", async () => {
        const mockData = [{ company: "Test Co", role: "Dev", rank: 1 }];
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const { result } = renderHook(() => useExperiences(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockData);
    });

    it("handles fetch errors", async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            json: async () => ({ message: "Server Error" }),
        });

        const { result } = renderHook(() => useExperiences(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe("Server Error");
    });
});
