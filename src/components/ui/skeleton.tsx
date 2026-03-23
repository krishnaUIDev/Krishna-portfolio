import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted/40 backdrop-blur-sm",
                className
            )}
            {...props}
        />
    );
};
