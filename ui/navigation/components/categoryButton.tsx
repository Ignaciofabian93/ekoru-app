import { Text } from "@/ui/text/text";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export const CategoryButton = ({
  onClick,
  name,
  id,
  section,
}: {
  onClick: () => void;
  name: string;
  id: number;
  section: number | null;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center justify-between p-3 pl-4 text-left hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-200 group"
      )}
    >
      <Text variant="label" className="font-medium group-hover:text-primary">
        {name}
      </Text>
      <ChevronRight
        className={`h-4 w-4 text-text-500 dark:text-text-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-200 ${
          section === id ? "rotate-90" : ""
        }`}
      />
    </button>
  );
};
