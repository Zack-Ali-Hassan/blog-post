import Post from "../models/post_model.js";
export const selectPosts = async (req, res) => {
  try {
    const getPosts = await Post.find({}).populate("author",[
        "username", "email"
    ]).sort({ createdAt : -1});
    return res.status(200).json(getPosts);
  } catch (error) {
    console.log("Error is :" + error);
    return res.status(400).json("Unknown error..");
  }
};
export const selectSinglePost = async (req, res) => {
  try {
    const id =req.params.id;
    const getPost = await Post.findById(id).populate("author", [
        "username", "email"
    ]);
    return res.status(200).json(getPost);
  } catch (error) {
    console.log("Error is :" + error);
    return res.status(400).json("Unknown error..");
  }
};
export const registerPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title: title,
      content: content,
      author: req.user._id,
    });
    await post.save();
    res.status(201).send({ post });
  } catch (erro) {
    console.log("Error is :" + erro);
    res.status(400).json("Unknown error..");
  }
};
export const updatePost = async (req, res) => {
    try {
      const id =req.params.id;
      const {title, content} =req.body;
      const updatedPost = await Post.findById(id);
      if(!updatedPost){
        return res.status(404).json(`This ${id} is not found`)
      }
      const currentUser = req.user._id;
      if(currentUser.toString() != updatedPost.author.toString()){
        return res.status(403).json(`only updated the original author`)
      }
      const getPost = await Post.findOneAndUpdate({_id : id}, {title,content},{new:true, runValidators:true});
      return res.status(200).json("updated successfully");
    } catch (error) {
      console.log("Error is :" + error);
      return res.status(400).json("Unknown error..");
    }
  };
export const deletePost = async (req, res) => {
    try {
      const id =req.params.id;
      const deletedUser = await Post.findById(id);
      if(!deletedUser){
        return res.status(404).json(`This ${id} is not found`)
      }
      const currentUser = req.user._id;
      if(currentUser.toString() != deletedUser.author.toString()){
        return res.status(403).json(`only deleted the original author`)
      }
      const getPost = await Post.findOneAndDelete({_id : id});
      return res.status(200).json("Deleted successfully");
    } catch (error) {
      console.log("Error is :" + error);
      return res.status(400).json("Unknown error..");
    }
  };