"use client";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Title } from "../text/title";
import Link from "next/link";

// Generic interface for items that can be displayed in columns
export interface MenuItem<T = unknown> {
  id: number;
  title: string;
  data?: T;
  href?: string;
}

interface MegaMenuColumnProps<T> {
  icon: LucideIcon;
  title: string;
  items: MenuItem<T>[];
  selectedId: number | null;
  onSelectItem: (id: number) => void;
  onClose?: () => void;
  className?: string;
}

export function MegaMenuColumn<T>({
  icon: Icon,
  title,
  items,
  selectedId,
  onSelectItem,
  onClose,
  className = "",
}: MegaMenuColumnProps<T>) {
  return (
    <div className={`w-80 border-r border-neutral/20 bg-neutral-light/30 ${className}`}>
      <div className="p-4">
        <Title variant="h4" className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon className="h-5 w-5 mr-2 text-primary" />
          {title}
        </Title>
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="relative">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => onSelectItem(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                    selectedId === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-text-primary hover:bg-white hover:text-primary"
                  }`}
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                </Link>
              ) : (
                <button
                  onMouseEnter={() => onSelectItem(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                    selectedId === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-text-primary hover:bg-white hover:text-primary"
                  }`}
                >
                  <span className="font-medium">{item.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SecondaryColumnProps<T> {
  title: string;
  items: MenuItem<T>[];
  selectedId: number | null;
  onSelectItem: (id: number) => void;
  onClose?: () => void;
}

export function SecondaryColumn<T>({ title, items, selectedId, onSelectItem, onClose }: SecondaryColumnProps<T>) {
  return (
    <div className="w-80 border-r border-neutral/20">
      <div className="p-4">
        <h4 className="text-md font-semibold text-text-primary mb-4">{title}</h4>
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="relative">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => onSelectItem(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                    selectedId === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-neutral-light hover:text-primary"
                  }`}
                >
                  <span>{item.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                </Link>
              ) : (
                <button
                  onMouseEnter={() => onSelectItem(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between group ${
                    selectedId === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-neutral-light hover:text-primary"
                  }`}
                >
                  <span>{item.title}</span>
                  <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LeafColumnProps {
  title: string;
  items: { id: number; title: string; href: string }[];
  onClose: () => void;
}

export function LeafColumn({ title, items, onClose }: LeafColumnProps) {
  return (
    <div className="w-80">
      <div className="p-4">
        <h4 className="text-md font-semibold text-text-primary mb-4">{title}</h4>
        <div className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="block px-3 py-2 rounded-lg text-text-secondary hover:bg-neutral-light hover:text-primary transition-colors duration-200"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
