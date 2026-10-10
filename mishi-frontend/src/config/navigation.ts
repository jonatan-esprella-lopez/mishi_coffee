import {
  Calendar,
  ChartNoAxesColumn,
  Coffee,
  Compass,
  LayoutGrid,
  MessageSquareText,
  PawPrint,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
};

export const publicNav: NavItem[] = [
  { label: "Explorar", to: "/", icon: Compass, end: true },
  { label: "Menú", to: "/menu", icon: Coffee },
  { label: "Michis", to: "/michis", icon: PawPrint },
  { label: "Reservas", to: "/reservas", icon: Calendar },
];

export const adminNav: NavItem[] = [
  { label: "Adopción", to: "/admin/adopcion", icon: PawPrint },
  { label: "Michis", to: "/admin/michis", icon: LayoutGrid },
  { label: "Panel Bs", to: "/admin/panel", icon: ChartNoAxesColumn },
  { label: "Seguimiento", to: "/admin/seguimiento", icon: MessageSquareText },
];