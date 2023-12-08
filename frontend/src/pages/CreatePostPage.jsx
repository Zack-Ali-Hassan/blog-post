import React from "react";
import CreatePost from "../components/CreatePost";
import ProtectPage from "../utill/ProtectPage";

function CreatePostPage() {
  return (
    <div>
      <ProtectPage>
        <CreatePost />
      </ProtectPage>
    </div>
  );
}

export default CreatePostPage;
