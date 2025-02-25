import { defineStore } from 'pinia'


export const useUserStore = defineStore("user", {
    state: (): { token: string, id: string } => ({ 
        token: '',
        id: ''
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setId(id: string) {
            this.id = id
        }
    }
});
