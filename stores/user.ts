import { defineStore } from 'pinia'


export const useUserStore = defineStore("user", {
    state: (): { token: string, id: string | number, balance: string } => ({ 
        token: '',
        id: '',
        balance: ''
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setId(id: string | number) {
            this.id = id
        },
        setBalance(value: string) {
            this.balance = value;
        }
    }
});
