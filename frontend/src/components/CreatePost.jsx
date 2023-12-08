import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/posts/", {
        title,
        content,
      });
      toast.success('post created successfully.....')
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error created post : " + error);
    }
  };
  return (
    <div className="mt-3 mx-3">
      <h4>Create Post</h4>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter content" onChange={(event) => setContent(event.target.value)}/>
        </Form.Group>
        <Button variant="secondary" type="submit">
          Create post
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
