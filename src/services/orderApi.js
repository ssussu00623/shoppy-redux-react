import { axiosPost } from "./api";
import { setOrderList, setMember, setIsSaveScuccess } from '../features/order/orderSlice.js'


/**
 * 전체 주문정보 가져오기 : getOrderList
 */
export const getOrderList = () => async (dispatch) => {
    const id = localStorage.getItem("user_id"); // 호이스팅을 위해ㄴ 제일 위에~
    const url = "http://43.201.27.254:9000/order/all";
    const data = { "id": id }
    const result = await axiosPost({ url, data })
    const member = result[0]

    dispatch(setOrderList({ result }));
    dispatch(setMember({ member }));
    // console.log('order list-->', result);
    // calculateTotalPrice(result.data);

    // return result.data;
}

/**
 * 카카오페이 결제 요청 : paymentKakaoPay
 */
export const paymentKakaoPay = (totalPrice, orderList) => async (dispatch) => {
    const id = localStorage.getItem("user_id");
    const pname = orderList[0].pname.concat(" 외");
    const type = "KAKAO_PAY";

    const url = "http://43.201.27.254:9000/payment/qr";
    const data = {
        id: id,
        item_name: pname,
        total_amount: totalPrice, // 결제 금액 (KRW)
        formData: {
            id: id,
            type: type,
            totalPrice: totalPrice,
            orderList: orderList
        }
    }

    const response = await axiosPost({ url, data })

    if (response.next_redirect_pc_url) {
        response.tid && localStorage.setItem("tid", response.tid);
        window.location.href = response.next_redirect_pc_url;
    }

}//paymentKakaoPay

    /**
     * 결제 완료 후 주문테이블 저장 : saveToOrder
     */
    export const saveToOrder = (orderList, totalPrice)=> async(dispatch) => { 
        const id = localStorage.getItem("user_id"); 
        const tid = localStorage.getItem("tid"); 
        const type = "KAKAO_PAY";  
        let result_rows = 0;
        const url = "http://43.201.27.254:9000/order/add"
        const data = {  
                id: id,  
                tid: tid,
                type: type,
                totalPrice:totalPrice, 
                orderList:orderList
        };

        try {
            const result = await axiosPost({url, data});

            if (result.result_rows) { 
                const result_rows = result.result_rows;
                console.log('주문테이블 저장 성공!!');
                dispatch(setIsSaveScuccess({result_rows}))
            }
        } catch (error) {
            console.error("주문테이블 저장 실패:", error);
        } 
    }//saveToOrder