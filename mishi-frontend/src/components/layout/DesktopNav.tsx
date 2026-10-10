import { NavLink } from "react-router";
import type { NavItem } from "../../config/navigation";

export default function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Navegación principal" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {items.map(({ label, to, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-pill px-4 py-2 font-label text-sm font-semibold no-underline transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-muted hover:bg-secondary-container hover:text-on-secondary-container active:bg-secondary-container-pressed"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}