import { NavLink } from "react-router";
import type { NavItem } from "../../config/navigation";

export default function BottomNav({ items }: { items: NavItem[] }) {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex items-stretch justify-around px-2 py-2">
        {items.map(({ label, to, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex flex-col items-center gap-1 font-label text-xs no-underline transition-colors ${
                  isActive ? "font-bold text-foreground" : "text-muted hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-8 w-12 place-items-center rounded-pill transition-colors ${
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "group-hover:bg-surface-alt group-active:bg-surface-alt-pressed"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}