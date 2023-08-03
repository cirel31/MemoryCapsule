import PostCreateForm from "../components/post/PostCreateForm";
import {useEffect, useState} from "react";
import axios from "axios";

const PostCreatePage = () => {

    const API = '/notice';

    const [pageLabel, setPageLabel] = useState("");

    useEffect(() => {
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수');
        checkUserRole();
    }, []);

    /**
     * 3. 공지사항 작성 [post]
     * http://localhost:8080/notice
     *{
     *  "noticeTitle" : "테스트",
     *  "noticeContent" : "테스트content",
     *  "noticeImgurl" : null
     *}
     */

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imgurl: '',
    });

    const postNoticesDataCreateServer = (e) => {
        console.log("[postNoticesDataCreateServer]");
        e.preventDefault();

        if (checkUserRole()) {
            // 실제 배포는 8000
            // 테스트 및 개발 서버는 7000
            axios.post(`${API}/`, formData)
                .then((response) => {
                    console.log('게시글 작성 POST successful : ', response.data);
                })
                .catch((error) => {
                    console.error('게시글 작성 POST fail : ', error);
                });
        }
    }


    /**
     * 5. 공지사항 수정 [put]
     *http://localhost:8080/notice
     * {
     *  "idx" : "3",
     *  "noticeTitle" : "테스트수정",
     *  "noticeContent" : "테스트content",
     *  "noticeImgurl" : null
     * }
     */
    const putNoticesDataEditServer = (e) => {
        console.log("[putNoticesDataEditServer]");
        e.preventDefault();

        if (checkUserRole()) {
            axios.put(`${API}/`, formData)
                .then((response) => {
                    console.log('게시글 수정 PUT successful : ', response.data);
                })
                .catch((error) => {
                    console.error('게시글 수정 PUT fail : ', error);
                });
        }
    }


    // 관리자인지 확인 (관리자면 공지사항, 아니면 리뷰)
    function checkUserRole() {
        console.log("[checkUserRole]");
        if (true) {
            setPageLabel("notice");
        } else {
            setPageLabel("review");
        }
        console.log(pageLabel);
    }

    return (
        <>
            <div>
                <PostCreateForm pageDetail={formData} pageLabel={pageLabel} staus="create"/>
            </div>
        </>
    )
}

export default PostCreatePage;
