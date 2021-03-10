import {GET_POST_START, GET_POST_SUCCESS} from './ActionTypes'
import axios from 'axios'


export const GetPostStart = () =>({
    type:GET_POST_START
})
export const GetPostSuccess = (posts) =>({
    type:GET_POST_SUCCESS,
    posts:posts
})




export const GetPostList = (config) => async dispatch => {

    try{
        dispatch(GetPostStart)
        axios.get('http://127.0.0.1:8000/post/list',config).then(res =>{
                console.log(res.data);
                dispatch(GetPostSuccess(res.data))
        }
        )
    }catch(err){
        console.log(err);
    }

}

export const CreatePost = (data, config) => async dispatch =>{

    try{
        axios.post('http://127.0.0.1:8000/post/create/',data, config).then(res =>{
            console.log(res.data);
            dispatch(GetPostList(config))
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data.detail);
            }
        })
    }catch(e){
        console.log(e);
    }
}