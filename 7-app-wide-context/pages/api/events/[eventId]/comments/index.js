export default async function handler(req, res) {
  const { eventId } = req.query;

  if (req.method === 'GET') {
    const blob = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events/${eventId}/comments.json`);
    const data = await blob.json();

    if (data === null) {
      return res.status(200).json([]);
    }

    if (data.status === 404 || data.status === 500) {
      return res.status(data.status).json();
    }

    const comments = [];
    for (const key in data) {
      comments.push({
        id: key,
        ...data[key],
      });
    }

    res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const { email, name, text } = JSON.parse(req.body);
    const data = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/events/${eventId}/comments.json`, {
      method: 'POST',
      body: JSON.stringify({ email, name, text }),
    });

    if (data === null) {
      return res.status(200).json([]);
    }

    if (data?.status === 404 || data?.status === 500) {
      return res.status(data.status).json();
    }

    res.status(200).json(data);
  }
}
