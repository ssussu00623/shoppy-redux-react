import { setProductList, setProduct, setImgList, setDetailImgList, setSize } from '../features/product/productSlice.js'
import { axiosPost, axiosPut, axiosDelete, axiosGet } from "./api";

/*********************************
 * 상품 전체 리스트
*********************************/
export const getProductList = () => async (dispatch) => {
    const url = 'http://43.201.27.254:9000/product/all'
    const data = null;
    const result = await axiosGet({ data, url });
    dispatch(setProductList({ result }));
}
/*********************************
 * 상품 상세 
*********************************/
export const getProduct = (pid) => async (dispatch) => {
    const url = "http://43.201.27.254:9000/product/detail";
    const data = { "pid": pid }
    
    const result = await axiosPost({ url, data })
    console.log('result_api', result);
    const product = result;
    const imgList = result.imgList;
    const detailImgList = result.detailImgList
    console.log(product);
    
    dispatch(setProduct({product}));
    dispatch(setImgList({imgList}));
    dispatch(setDetailImgList({detailImgList}));
};

/*********************************
 * 상품 사이즈 변경
 **********************************/
export const getSize =(size)=> (dispatch)=> {
    dispatch(setSize({size}))
}