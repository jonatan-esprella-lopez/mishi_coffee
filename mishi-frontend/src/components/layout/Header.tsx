import { ArrowRightLeft, ShoppingBag, User } from "lucide-react";
import logo from "../../assets/react.svg"
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [cartCount, setCartCount] = useState(3);
    
    return (
        <header className="flex flex-row items-center justify-between gap-4 p-4 bg-surface">
            <div className="flex flex-row items-center justify-center gap-2">
                <img className="w-16 h-16" src={logo} alt="Logo de Mishin" />
                <div className="flex flex-col items-center">
                    <h1 className="text-primary font-heading text-3xl font-bold">
                        MISHIN
                    </h1>
                    <p className="text-xs font-heading text-foreground">El sueño de un Gato</p>
                </div>
            </div>


            <div className="flex flex-row items-center justify-center gap-2">
                <ThemeToggle />
                {isAdmin ? (
                    <button 
                        type="button"
                        onClick={() => setIsAdmin(false)}
                        className="flex flex-row items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-secondary-hover active:bg-secondary-pressed transition-colors rounded-pill px-5 py-2" 
                    >
                        <ArrowRightLeft className="size-5"/>
                        Admin
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setCartCount((c) => c + 1)}
                        aria-label={`Carrito, ${cartCount} ${cartCount === 1 ? "artículo" : "artículos"}`}
                        className="relative grid size-10 place-items-center rounded-pill text-foreground transition-colors hover:bg-secondary-container hover:text-on-secondary-container active:bg-secondary-container-pressed"
                    >
                        <ShoppingBag className="size-5" />
                        {cartCount > 0 && (
                        <span
                            aria-hidden="true"
                            className="absolute -right-0.5 -top-0.5 grid min-w-5 h-5 place-items-center rounded-pill bg-primary px-1 text-xs font-bold leading-none text-on-primary ring-2 ring-surface"
                        >
                            {cartCount > 9 ? "9+" : cartCount}
                        </span>
                        )}
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setIsAdmin((v) => !v)}
                    aria-label="Perfil"
                    className="grid size-10 place-items-center rounded-pill bg-primary text-on-primary transition-colors hover:bg-primary-hover active:bg-primary-pressed"
                    >
                    <User className="size-5" />
                    </button>
            </div>
        </header>
    );
}