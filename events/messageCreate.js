module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const request = require('request');

    config = require('../config');

    var url = 'https://raw.githubusercontent.com/DevSpen/scam-links/master/src/links.txt';

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const test1 = body.split('\n');
          if (message.content) {
            const fuckingbot = !!test1.find((word) => {
              const regex = new RegExp(`\\b${word}\\b`, 'i'); 
              return regex.test(message.content);
            });
            if (fuckingbot) {
                message.delete().catch(e => console.error(`Couldn't delete message: ${message} from ${message.author.id}`));
                client.channels.cache.get(config.app.channelid).send(`Removed message: ${message} from ${message.author.id}`);
            }
        } else { }
        }
      });
}