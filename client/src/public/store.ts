import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Wallet } from "ethers";

export interface State {
    provider: any;
    signer: any;
    address: Wallet | null;
    network: any;
    contract: any;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        provider: null,
        signer: null,
        address: null,
        network: null,
        contract: null,
    },
    mutations:
    {
        setProvider(state, provider: any) {
            state.provider = provider;
        },
        setSigner(state, signer: any) {
            state.signer = signer;
        },
        setAddress(state, address: Wallet | null) {
            state.address = address;
        },
        setNetwork(state, network: any) {
            state.network = network;
        },
        setContract(state, contract: any) {
            state.contract = contract;
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}