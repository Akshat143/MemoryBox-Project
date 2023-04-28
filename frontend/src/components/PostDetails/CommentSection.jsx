import React, {useState, useRef} from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from './styles.js';
import { commentPost } from '../../actions/posts.js';

const CommentSection = ({ post }) => {
    //console.log(post);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
	  if (!user) {
        alert('Sign in to share your comment.');
     	history.push('/auth');
      	return;
   	 }
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <div className={classes.commentsInnerContainer}>
                            <Typography gutterBottom variant="h6">Comments</Typography>
                            {comments.map((c,i)=>(
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                            ))}
                            <div ref={commentsRef} />
                        </div>
                    </Grid>
                    {/* {user?.result?.name && (
                        <div style={{ width: '70%' }} disabled={!user}>
                            <Typography gutterBottom variant="h6">Write a comment</Typography>
                            <TextField fullWidth minRows={4} variant="outlined" abel="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                            <br />
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
                        </div>
                    )} */}
                    <Grid item xs={12} sm={4}>
                        <div style={{ width: '70%' }} disabled={!user}>
                            <Typography gutterBottom variant="h6">Write a comment</Typography>
                            <TextField fullWidth minRows={4} variant="outlined" abel="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                            <br />
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleClick}>Comment</Button>
                        </div>
                    </Grid>
                    </Grid>
            </div>
        </div>
    );
};

export default CommentSection;