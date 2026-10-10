import { useEffect, useState } from "react";

type State<T> = { key: string; data?: T; error?: Error };

export function useAsync<T>(key: string, fn: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ key: "" });

  useEffect(() => {
    let cancelled = false;
    fn()
      .then((data) => !cancelled && setState({ key, data }))
      .catch((error: Error) => !cancelled && setState({ key, error }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data: state.data, error: state.error, loading: state.key !== key };
}