import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  // const { data, error } = useSWR(`/api/events/${eventId}/comments`, () => fetch(`/api/events/${eventId}/comments`));

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    await fetch(`/api/events/${eventId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
