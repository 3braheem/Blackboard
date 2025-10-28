import PostDataHeader from "@/components/post-data-header"
import PostDataFooter from "./post-data-footer";
import PostDataBody from "./post-data-body";

function PostDataPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <PostDataHeader />
      <main className="flex-grow min-h-0 relative">
        <PostDataBody />
      </main>
      <PostDataFooter />
    </div>
  );
}

export default PostDataPage
