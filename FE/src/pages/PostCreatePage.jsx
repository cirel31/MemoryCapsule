import PostCreateForm from "../components/notice/PostCreateForm";

const PostCreatePage = () => {

    let pageLabel = "";

    // 관리자인지 확인 (관리자면 공지사항, 아니면 리뷰)
    function checkUserRole() {
        console.log("[checkUserRole]");
        if (true) {
            pageLabel = "notice";
        } else {
            pageLabel = "review";
        }

        console.log(pageLabel);
    }

    return (
        <>
            <div>
                <PostCreateForm pageLabel={pageLabel} />
            </div>
        </>
    )
}

export default PostCreatePage;
