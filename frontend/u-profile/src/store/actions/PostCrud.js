import {GET_POST_START, GET_POST_SUCCESS, SHARE_POST_SUCCESS} from './ActionTypes'
import axios from 'axios'


export const GetPostStart = () =>({
    type:GET_POST_START
})
export const GetPostSuccess = (posts) =>({
    type:GET_POST_SUCCESS,
    posts:posts
})
export const SharePostSuccess = (shareInfo) =>(
    console.log(shareInfo,'helloooo'),
    {
    
    type:SHARE_POST_SUCCESS,
    shareInfo:shareInfo
}
)




export const GetPostList = (config) => async dispatch => {

    try{
        dispatch(GetPostStart)
        axios.get('http://127.0.0.1:8000/post/list',config).then(res =>{
                
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

export const LikePost = (id, config) => async dispatch =>{

    try{
        axios.get(`http://127.0.0.1:8000/post/like/${id}`, config).then(res =>{
           
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

export const CommentPost = (id, data, config) => async dispatch =>{
    console.log(id, data.get('comment'), config);
    try{
        axios.post(`http://127.0.0.1:8000/post/comment/${id}`, data, config).then(res =>{
           
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

export const CommentUpdate = (id, data, config) => async dispatch =>{
    console.log(id, data.get('comment'), config);
    try{
        axios.put(`http://127.0.0.1:8000/post/comment/rud/${id}`, data, config).then(res =>{
            
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
export const CommentDelete = (id, config) => async dispatch =>{
    try{
        axios.delete(`http://127.0.0.1:8000/post/comment/rud/${id}`, config).then(res =>{
            
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



export const ChangePrivacy = (id, data, config) => async dispatch =>{
    console.log(data.get('privacy'),'privacy');
    try{
        axios.put(`http://127.0.0.1:8000/post/detail/${id}`, data, config).then(res =>{
            
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


export const SharePost = (id, data, config) => async dispatch =>{
    console.log(data.get('sharePostContent'));
    try{
        axios.post(`http://127.0.0.1:8000/post/rePost/${id}`, data, config).then(res =>{
           
            
            localStorage.setItem('RePost', res.data.RePost)
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