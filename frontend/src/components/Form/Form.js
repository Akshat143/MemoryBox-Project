import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import Axios from "axios";

const Form = ({ currentId, setCurrentId }) => {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleImageChange = (e) => {
    if (e.target?.files[0]) {
      // console.log("image: ", e.target?.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      const uploadRes = await Axios.post(
        process.env.REACT_APP_CLOUDINARY_API,
        data
      );

      const cloudURL = uploadRes.data.url;
      // console.log("cloudinary url: ", cloudURL);

      const payload = {
        ...postData,
        selectedFile: cloudURL,
        name: user?.result?.name,
      };

      // console.log({ payload });

      if (currentId === 0) {
        dispatch(createPost(payload, history));
        clear();
      } else {
        dispatch(
          updatePost(currentId, {
            ...postData,
            img: cloudURL,
            name: user?.result?.name,
          })
        );
        clear();
      }
    } catch (error) {
      setError("*Select Image File");
      console.log(error);
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6" align="center">
          Sign in for memory creation and appreciation.
        </Typography>
      </Paper>
    );
  }

  const handleAdd = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDelete = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className={classes.paper} elevation={5}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAdd(chip)}
            onDelete={(chip) => handleDelete(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <input type="file" multiple={false} onChange={handleImageChange} />
        </div>

        {error && <div className={classes.errorMsg}>{error}</div>}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
