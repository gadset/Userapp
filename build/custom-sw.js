self.addEventListener('push', async function (event){
  console.log(event.data);
  const data = await event.data.json();
  console.log('New notification', data);
  const options = {
    body: data.body,
  };
 await event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})