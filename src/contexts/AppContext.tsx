'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { User, Progress } from '@/types';

// State type
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  progress: Progress;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: Partial<Progress> }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  progress: {
    chooseCareer: false,
    chooseMajor: false,
    chooseSchool: false,
  },
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          ...action.payload,
        },
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (user: User, token?: string) => void;
  logout: () => void;
  updateProgress: (progress: Partial<Progress>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      const storedProgress = localStorage.getItem('progress');

      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'SET_USER', payload: user });
          
          if (storedProgress) {
            dispatch({ type: 'SET_PROGRESS', payload: JSON.parse(storedProgress) });
          }
        } catch {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          dispatch({ type: 'SET_USER', payload: null });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (user: User, token?: string) => {
    if (token) {
      localStorage.setItem('authToken', token);
    }
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('progress');
    dispatch({ type: 'LOGOUT' });
  };

  // Update progress function
  const updateProgress = (progress: Partial<Progress>) => {
    const newProgress = { ...state.progress, ...progress };
    localStorage.setItem('progress', JSON.stringify(newProgress));
    dispatch({ type: 'SET_PROGRESS', payload: progress });
  };

  const value: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    updateProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
