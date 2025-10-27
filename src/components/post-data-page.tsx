import PostDataHeader from "@/components/post-data-header"
import PostDataFooter from "./post-data-footer";
import PostDataBody from "./post-data-body";

function PostDataPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <PostDataHeader />
      <PostDataBody />
      <PostDataFooter />
    </div>
  );
}

export default PostDataPage
