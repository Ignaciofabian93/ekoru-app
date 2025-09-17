import clsx from "clsx";
import { motion } from "motion/react";

type Props = React.HTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  placeholder?: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  minLength?: number;
};

export default function TextArea({
  label,
  placeholder,
  value,
  name,
  onChange,
  maxLength,
  minLength,
  ...props
}: Props) {
  return (
    <div className={clsx("space-y-2 w-full")}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <motion.div
          initial={false}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            // onFocus={() => setFocusedField("password")}
            // onBlur={() => setFocusedField(null)}
            required
            minLength={minLength}
            maxLength={maxLength}
            className={clsx(
              "w-full pl-3 pr-12 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white",
              "placeholder:text-gray-400",
              "resize-none h-32"
            )}
            placeholder={placeholder}
            {...props}
          />
        </motion.div>
      </div>
    </div>
  );
}
