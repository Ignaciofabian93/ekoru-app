"use client";
import { useTheme } from "@/providers/theme";

export default function ThemeDebug() {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="mt-4 p-4 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded-lg">
      <h3 className="text-sm font-semibold text-text-primary dark:text-text-inverse mb-2">Debug Info:</h3>
      <p className="text-xs text-text-muted">
        Current theme: <span className="font-mono">{theme}</span>
      </p>
      <p className="text-xs text-text-muted">
        System theme: <span className="font-mono">{systemTheme}</span>
      </p>
      <p className="text-xs text-text-muted">
        HTML class: <span className="font-mono" id="html-class"></span>
      </p>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof document !== 'undefined') {
            document.getElementById('html-class').textContent = document.documentElement.className;
          }
        `,
        }}
      />
    </div>
  );
}
