import clsx from "clsx";

export const CategoryWrapper = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <div
      className={clsx(
        {
          "border-t border-neutral-200 dark:border-neutral-600": index !== 0,
        },
        "ml-3"
      )}
    >
      {children}
    </div>
  );
};
