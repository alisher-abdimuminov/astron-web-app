import type { ISubject } from "~/types";

export const useSubjectsStore = defineStore('subjects', {
    state: () => ({
        subjects: [] as ISubject[],
    }),
    actions: {
        set(subjects: ISubject[]) {
            this.subjects = subjects;
        }
    }
});