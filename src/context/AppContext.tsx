"use client";

import { supabaseClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { auth } = supabaseClient();

  const fetchUser = async () => {
    const {
      data: { session },
    } = await auth.getSession();

    setUser(session?.user ?? null);
  };

  const { data: listener } = auth.onAuthStateChange((_, session) =>
    setUser(session?.user ?? null)
  );

  useEffect(() => {
    fetchUser();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const contextValues = { user, setUser };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </>
  );
};
