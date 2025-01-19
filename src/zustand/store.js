import { create } from 'zustand'

const useMyStore = create((set) => ({

    filterByName : '',
    onChangeFilterByName : (newVal) => set({ filterByName: newVal|| '' }),
    filterByDate : '',
    onChangeFilterByDate : (newVal) => set({ filterByDate: newVal|| '' }),

    apiData: {},

    getAPIData : async ( ) => {
        try {
            const response = await axios.get('/api/data');
            set({apiData: response.data})
        }
        catch (err) {
            console.log("failed to fetch events data \n" ,err);
        }
    }


}))

export default useMyStore;