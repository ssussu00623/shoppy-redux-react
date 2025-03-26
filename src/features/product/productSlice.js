import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //useState가 하는 일을 한다. 값이 바뀌면 자동으로 브로드 캐스팅으로 업데이트.
    productList : [],
    product: {},
    imglist: [],
    detailImg: [],
    size : 'xs'
}

export const proudctSlice = createSlice({
    name: 'proudct',
    initialState,
    reducers: {
        setProductList(state, action){
            state.productList = action.payload.result
        }, 
        setProduct(state, action){
            state.product = action.payload.product
        },
        setImgList(state, action){ 
            state.imglist = action.payload.imgList
        },
        setDetailImgList(state, action){
            state.detailImg = action.payload.detailImgList
        },
        setSize(state, action){
            state.size = action.payload.size
        }

        }
})

export const { setProductList, setProduct, setImgList, setDetailImgList, setSize } = proudctSlice.actions
export default proudctSlice.reducer
