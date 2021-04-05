import useSWR from 'swr';
import { useRouter } from 'next/router';
import classes from './comment-list.module.css';

function CommentList() {
  const router = useRouter();
  const { data, error } = useSWR(`/api/events/${router.query.id}/comments`);

  if(error) {
    return <p>Error.</p>
  }

  if(!data) {
    return <p>Not Found!</p>
  }

  console.log(data)

  return (
    <ul className={classes.comments}>
      {data.map(comment => (
        <li key={comment.id}>
          <p>{comment.text} - {comment.email}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
