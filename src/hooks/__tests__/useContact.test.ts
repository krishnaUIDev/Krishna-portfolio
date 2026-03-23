import { renderHook, act } from "@testing-library/react";
import { useContact } from "../useContact";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { toast } from "sonner";

// Mock dependencies
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock("sonner", () => ({
    toast: {
        promise: vi.fn(),
    },
}));

describe("useContact", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
        vi.clearAllMocks();
    });

    it("sends a message successfully", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        const { result } = renderHook(() => useContact());
        const data = { name: "Test", email: "test@example.com", message: "Hi" };

        let response;
        await act(async () => {
            response = await result.current.sendMessage(data);
        });

        expect(fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
            method: "POST",
            body: JSON.stringify(data),
        }));
        expect(toast.promise).toHaveBeenCalled();
        expect(response.success).toBe(true);
    });

    it("handles submission failure", async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            json: async () => ({ error: "Failed" }),
        });

        const { result } = renderHook(() => useContact());

        let response;
        await act(async () => {
            response = await result.current.sendMessage({ name: "T", email: "e", message: "m" });
        });

        expect(response.success).toBe(false);
    });
});
