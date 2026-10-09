"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

// Reducer for managing favorite product IDs
export function favoritesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return Array.isArray(action.payload)
        ? action.payload.map((id) => Number(id))
        : [];
    case "ADD": {
      const idToAdd = Number(action.payload);
      if (state.includes(idToAdd)) return state;
      return [...state, idToAdd];
    }
    case "REMOVE": {
      const idToRemove = Number(action.payload);
      return state.filter((id) => id !== idToRemove);
    }
    default:
      return state;
  }
}

export const FavoritesContext = createContext({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: async () => {},
});

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();
  const router = useRouter();

  // Synchronize favorites with Supabase when user logs in or out
  useEffect(() => {
    let isCurrent = true;

    async function syncFavorites() {
      if (!user) {
        dispatch({ type: "SET", payload: [] });
        return;
      }

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching favorites:", error.message);
          return;
        }

        if (isCurrent && data) {
          const ids = data.map((item) => Number(item.product_id));
          dispatch({ type: "SET", payload: ids });
        }
      } catch (err) {
        console.error("Failed to load user favorites:", err);
      }
    }

    syncFavorites();

    return () => {
      isCurrent = false;
    };
  }, [user]);

  const isFavorite = (id) => {
    return favorites.includes(Number(id));
  };

  const toggleFavorite = async (id) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const numericId = Number(id);
    const currentlyFav = favorites.includes(numericId);

    if (currentlyFav) {
      // 1. Optimistic remove
      dispatch({ type: "REMOVE", payload: numericId });

      try {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", numericId);

        if (error) {
          console.error("Supabase remove favorite error, rolling back:", error.message);
          dispatch({ type: "ADD", payload: numericId });
        }
      } catch (err) {
        console.error("Failed to remove favorite, rolling back:", err);
        dispatch({ type: "ADD", payload: numericId });
      }
    } else {
      // 1. Optimistic add
      dispatch({ type: "ADD", payload: numericId });

      try {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: numericId });

        if (error) {
          console.error("Supabase add favorite error, rolling back:", error.message);
          dispatch({ type: "REMOVE", payload: numericId });
        }
      } catch (err) {
        console.error("Failed to add favorite, rolling back:", err);
        dispatch({ type: "REMOVE", payload: numericId });
      }
    }
  };

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export default FavoritesContext;
