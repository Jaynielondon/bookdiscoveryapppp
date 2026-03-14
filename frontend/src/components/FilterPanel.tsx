'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { FilterGroup } from '@/types';

export function FilterPanel({
  groups,
  selected,
  onToggle
}: {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onToggle: (groupId: string, optionId: string) => void;
}) {
  const sorted = useMemo(() => groups, [groups]);

  return (
    <div className="space-y-5">
      {sorted.map((group) => (
        <details key={group.id} open className="rounded-xl border border-ink/20 bg-panel/70 p-4 shadow-soft">
          <summary className="cursor-pointer text-sm font-semibold tracking-wide text-ink/90">{group.label}</summary>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const active = selected[group.id]?.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => onToggle(group.id, option.id)}
                  type="button"
                  aria-pressed={active}
                  className={clsx(
                    'rounded-full border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80',
                    active
                      ? 'border-accent bg-accent/20 text-ink'
                      : 'border-ink/25 bg-backdrop/50 text-ink/80 hover:border-ink/60'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}
