module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const fetch = require('node-fetch');

    const request = require('request');

    config = require('../config');

    var url = 'https://raw.githubusercontent.com/DevSpen/scam-links/master/src/links.txt';

    var url2 = 'https://raw.githubusercontent.com/DevSpen/scam-links/master/src/malicious-terms.txt';

    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const test1 = body.split('\n');
            if (message.content) {
                const fuckingbot = !!test1.find((word) => {
                    const regex = new RegExp(`\\b${word}\\b`, 'i');
                    return regex.test(message.content);
                });
                if (fuckingbot) {
                    message.delete().catch(e => console.error(`Couldn't delete message: ${message} from ${message.author.id} in ${message.guild.name}`));
                    var params = {
                        embeds: [
                            {
                                "title": `__${message.guild.name}__`,
                                "color": 16711684,
                                "fields": [
                                    {
                                        "name": "Message",
                                        "value": `${message}`,
                                        "inline": false
                                    },
                                    {
                                        "name": "User",
                                        "value": `${message.author.id} / <@${message.author.id}> `,
                                        "inline": false
                                    }
                                ]
                            }
                        ]
                    }
                    fetch(config.app.webhook, {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    }).then(res => {
                        console.log(res);
                    })
                } else {
                    request(url2, (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            const test1 = body.split('\n');
                            if (message.content) {
                                const fuckingbot = !!test1.find((word) => {
                                    const regex = new RegExp(`\\b${word}\\b`, 'i');
                                    return regex.test(message.content);
                                });
                                if (fuckingbot) {
                                    message.delete().catch(e => console.error(`Couldn't delete message: ${message} from ${message.author.id} in ${message.guild.name}`));
                                    var params = {
                                        embeds: [
                                            {
                                                "title": `__${message.guild.name}__`,
                                                "color": 16711684,
                                                "fields": [
                                                    {
                                                        "name": "Message",
                                                        "value": `${message}`,
                                                        "inline": false
                                                    },
                                                    {
                                                        "name": "User",
                                                        "value": `${message.author.id} / <@${message.author.id}> `,
                                                        "inline": false
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                    fetch(config.app.webhook, {
                                        method: "POST",
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        body: JSON.stringify(params)
                                    }).then(res => {
                                        console.log(res);
                                    })
                                }
                            }
                        }
                    }
                    );
                }
            }
        }
    });
}
