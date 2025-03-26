import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //useState가 하는 일을 한다. 값이 바뀌면 자동으로 브로드 캐스팅으로 업데이트.
    orderList: [],
    orderPrice: 0,
    member: {},
    isSaved : false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderList(state, action) {
            state.orderList = action.payload.result;
        },
        setMember(state, action) {
            state.member = action.payload.member;
        },
        setIsSaveScuccess(state, action){
            if(action.payload.result_rows) state.isSaved = true;
        }
    }
})

export const { setOrderList, setMember, setIsSaveScuccess } = orderSlice.actions
export default orderSlice.reducer
