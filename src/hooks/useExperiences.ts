import { useQuery } from "@tanstack/react-query";

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
    rank: number;
}

export const useExperiences = () => {
    return useQuery<Experience[]>({
        queryKey: ["experiences"],
        queryFn: async () => {
            const res = await fetch("/api/experience");
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Failed to fetch experiences");
            }
            return res.json();
        },
    });
};
