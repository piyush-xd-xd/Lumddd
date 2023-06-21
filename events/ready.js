module.exports = async (client) => {
  const presenceMessages = [
    `&help | @arbor`,
    `In ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`
  ];

  let currentIndex = 0;

  client.on("ready", async () => {
    client.logger.log(`Client ${client.user.username} Launched with ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`, "ready");

    // Set initial presence
    setPresence();

    // Interval to update presence every 10 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % presenceMessages.length;
      setPresence();
    }, 10000);
  });

  function setPresence() {
    client.user.setPresence({
      activities: [{
        name: presenceMessages[currentIndex],
        type: "WATCHING"
      }],
      status: "dnd"
    });
  }
};
