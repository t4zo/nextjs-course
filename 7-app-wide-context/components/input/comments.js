import { useContext, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const notificationContext = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const { eventId } = props;
  // const { data, error } = useSWR(`/api/events/${eventId}/comments`, () => fetch(`/api/events/${eventId}/comments`));

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API
    // notificationContext.showNotification({ title: 'Saving', message: 'Sending message...', status: 'pending' });
    setLoading(true);

    const response = await fetch(`/api/events/${eventId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      // setLoading(false);
      // return notificationContext.showNotification({ title: 'Error', message: 'Error on sending message', status: 'error' });
    }

    setLoading(false);
    // notificationContext.showNotification({ title: 'Success', message: 'Message created', status: 'success' });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loading && <p>Loading...</p>}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
