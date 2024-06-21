const Discord = require('discord.js');
const fetch = require('node-fetch');
async function szukaj(name, page, limit, message) {
    if (name == '') {
        message.channel.send('Brak argumentu!');
    } else {
        let res = await fetch(
            `https://api.jikan.moe/v3/search/character?q=${name}&page=${page}&limit=${limit}`
        );
        let data = await res.json();
        if (data.results === undefined) {
            message.channel.send('Nie znaleziono postaci!');
        } else {
            const embeda = new Discord.MessageEmbed()
                .setColor('#ede72d')
                .setTitle(`${data.results[0].name}`)
                .setURL(`${data.results[0].url}`)
                .setImage(`${data.results[0].image_url}`)
                .setFooter(`Anime: ${data.results[0].anime[0].name}`);
            return message.channel.send({embeds:[embeda]});
        }
    }
}
module.exports.szukaj = szukaj;
