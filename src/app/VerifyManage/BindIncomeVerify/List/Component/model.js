/* eslint-disable */
export default {
    state: {
        showModal:false,
        modalType:'detail',
        selectValue:[],
    },
    reducers: {
        toggle(state){
            return {
                ...state,
                showModal:!state.showModal,
            }
        },
        setModalType(state,modalType,selectValue=[]){
            return{
                ...state,
                modalType,
                selectValue,
            }
        },
    },
    effects: {
        
    },
};
