import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ToolInput, AuditResponse } from '../types/index.js';

interface AuditStore {
  // Form state
  selectedTools: string[];
  toolInputs: Record<string, ToolInput>;
  teamSize: number;
  primaryUseCase: string;

  // Results 
  auditResult: AuditResponse | null;

  // Actions
  toggleTool: (toolId: string) => void;
  updateToolInput: (toolId: string, input: Partial<ToolInput>) => void;
  setTeamSize: (size: number) => void;
  setPrimaryUseCase: (useCase: string) => void;
  setAuditResult: (result: AuditResponse) => void;
  resetForm: () => void;
}

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      selectedTools: [],
      toolInputs: {},
      teamSize: 1,
      primaryUseCase: 'coding',
      auditResult: null,

      toggleTool: (toolId) =>
        set((state) => ({
          selectedTools: state.selectedTools.includes(toolId)
            ? state.selectedTools.filter((t) => t !== toolId)
            : [...state.selectedTools, toolId],
        })),

      updateToolInput: (toolId, input) =>
        set((state) => ({
          toolInputs: {
            ...state.toolInputs,
            [toolId]: { ...state.toolInputs[toolId], ...input },
          },
        })),

      setTeamSize: (size) => set({ teamSize: size }),
      setPrimaryUseCase: (useCase) => set({ primaryUseCase: useCase }),
      setAuditResult: (result) => set({ auditResult: result }),
      resetForm: () =>
        set({
          selectedTools: [],
          toolInputs: {},
          teamSize: 1,
          primaryUseCase: 'coding',
          auditResult: null,
        }),
    }),
    {
      name: 'audit-store', // localStorage mein persist hoga
    }
  )
);