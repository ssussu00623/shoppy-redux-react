import { setCartCount, clearCartCount, setCartList, 
    clearListReset, setTotalPrice, setIsAdded,
    setIsAddedReset } from "../features/cart/cartSlice";
import { axiosPost, axiosPut, axiosDelete } from "./api";
/**
 * 장바구니 전체 카운트 조회
 */
export const getCount = () => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = 'http://43.201.27.254:9000/cart/count';
    const data = { "id": id };

    const result = await axiosPost({ url, data })
    const resultCount = result.count;
    dispatch(setCartCount({ resultCount }));
};

/**
 * 장바구니 카운트 초기화
 */
export const clearCount = () => (dispatch) => {
    dispatch(clearCartCount())
};

/**
 * 카트리스트 전체 조회
 */

export const getCartList = () => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://43.201.27.254:9000/cart/items";
    const data = { "id": id };

    const result = await axiosPost({ url, data })
    dispatch(setCartList({ result })); // {result : result}
    dispatch(setTotalPrice({ result }));
    // setCartCount(result.data.length);
    // calculateTotalPrice(result.data);
}

/**
 * 카트리스트 초기화
*/

export const clearCartList = () => async (dispatch) => {
    dispatch(clearListReset())
};

/** 
 * 장바구니 아이템 수량 업데이트
 */
export const updateCartList = (cid, type) => async (dispatch) => {
    const url = "http://43.201.27.254:9000/cart/updateQty";
    const data = { "cid": cid, "type": type }

    const result = await axiosPut({ url, data }); //수량이 업데이트 성공 => 카트리스트 다시 가져오기
    // qty 증가
    result.result_rows && dispatch(getCartList());
};

/** 
 * 장바구니 새로운 아이템 저장
 */
export const saveToCartList = (cartItem) => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://43.201.27.254:9000/cart/add";
    const data = { id: id, cartList: [cartItem] };

    const result = await axiosPost({ url, data });
    if (result.result_rows) {
        const result_rows = result.result_rows;
        dispatch(getCount());
        dispatch(getCartList());
        dispatch(setIsAdded({ result_rows }));
    }
};


/**
 * 장바구니 아이템 삭제
 */
export const deleteCartItem = (cid) => async (dispatch) => {
    const url = "http://43.201.27.254:9000/cart/deleteItem";
    const data = { "cid": cid }
    const result = await axiosDelete({ url, data });

    if (result.result_rows) {
        dispatch(getCartList());
        dispatch(getCount())
    };
}

export const clearAdded = ()=> (dispatch)=>{
    dispatch(setIsAddedReset());
}

/*************************
 * 장바구니 전체삭제
 *************************/
export const clearCart = ()=> async(dispatch) => {
    const id = localStorage.getItem("user_id");
    const url = "http://43.201.27.254:9000/cart/clear";
    const data = {"id": id}
    const result = await axiosDelete({url, data});

    result.result_rows && dispatch(getCount());
}