export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = JSON.parse(req.body);
    const data = await fetch(`https://nextjs-course-ae0b3-default-rtdb.firebaseio.com/newsletter.json`, {
      method: 'POST',
      body: JSON.stringify(email),
    });

    if (data.status === 404 || data.status === 500) {
      return res.status(data.status).json();
    }

    res.status(200).json(data);
  }
}
