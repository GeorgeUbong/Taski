// FILE: src/hooks/useProfile.ts
import { useProfileContext } from "../context/ProfileContent";

export const useProfile = () => {
    return useProfileContext();
};
