import { useGlobalStore } from "../providers/global-provider";

export const useGlobal = () => {
    return useGlobalStore((state) => state);
}