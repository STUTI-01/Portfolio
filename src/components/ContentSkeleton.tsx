import { motion } from "framer-motion";

interface ContentSkeletonProps {
  variant?: "card" | "list" | "poem";
  count?: number;
}

const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent";

const CardSkeleton = () => (
  <div className={`border border-accent/10 rounded-sm overflow-hidden ${shimmer}`} style={{ background: "hsla(30, 15%, 12%, 0.25)" }}>
    <div className="aspect-square bg-muted/20" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-muted/20 rounded w-3/4" />
      <div className="h-3 bg-muted/10 rounded w-full" />
      <div className="h-3 bg-muted/10 rounded w-1/2" />
    </div>
  </div>
);

const ListSkeleton = () => (
  <div className={`border border-accent/10 rounded-sm p-6 md:p-8 ${shimmer}`} style={{ background: "hsla(30, 15%, 12%, 0.25)" }}>
    <div className="flex gap-4">
      <div className="w-24 h-24 bg-muted/20 rounded-sm flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-muted/20 rounded w-2/3" />
        <div className="h-3 bg-muted/10 rounded w-1/3" />
        <div className="h-3 bg-muted/10 rounded w-full" />
      </div>
    </div>
  </div>
);

const PoemSkeleton = () => (
  <div className={`border border-accent/10 rounded-sm p-8 md:p-10 ${shimmer}`} style={{ background: "hsla(30, 15%, 12%, 0.25)" }}>
    <div className="space-y-3">
      <div className="h-6 bg-muted/20 rounded w-1/3" />
      <div className="h-3 bg-muted/10 rounded w-1/4" />
      <div className="w-8 h-[1px] bg-accent/20 my-4" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-muted/10 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
        ))}
      </div>
    </div>
  </div>
);

const RecruiterSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className={`glass-card p-6 ${shimmer}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-3 bg-muted/20 rounded w-16" />
            <div className="h-3 bg-muted/10 rounded w-24" />
          </div>
          <div className="h-5 bg-muted/20 rounded w-2/3" />
          <div className="h-3 bg-muted/10 rounded w-1/3" />
          <div className="flex gap-2 mt-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-5 bg-muted/10 rounded-full w-16" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const ContentSkeletonLoader = ({ variant = "card", count = 6 }: ContentSkeletonProps) => {
  const skeletons = {
    card: CardSkeleton,
    list: ListSkeleton,
    poem: PoemSkeleton,
  };
  const Skeleton = skeletons[variant];

  if (variant === "card") {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(count)].map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => <Skeleton key={i} />)}
    </div>
  );
};

export { RecruiterSkeleton };
export default ContentSkeletonLoader;
