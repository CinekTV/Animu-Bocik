const Discord = require('discord.js');
require('dotenv');
const fetch = require('node-fetch');
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const { MessageAttachment, MessageEmbed } = require('discord.js');
var waifu = require('./waifu');
var harmonogram = require('./schedule');
const Jikan = require('jikan-node');
const mal = new Jikan();
const jikanjs = require('jikanjs'); // Uses per default the API version 3
var waifu_s = require('./waifu_search');
var waifu_cards = require('./waifu_cards');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const dotenv = require('dotenv');
const Jimp = require('jimp');
var fs = require('fs');
const { setTimeout } = require('timers');
require('dotenv').config();
const iks_de = require('./models/data_base.js');
const { modelName } = require('./models/data_base.js');
var generator = require('./generator');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const { count } = require('console');


// const db = process.env.DB;
mongoose
    .connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err);
    });
console.log()
//const { schedule } = require('node-myanimelist/typings/methods/jikan');

/*client.once('ready',()=>{
    console.log('Ready!');
    client.channels.cache.get('809885619123126283').send('Hello here!');
})*/
let guild;
let channel;
client.on('ready', () => {
    guild = client.guilds.cache.get('805172458239164488');

    client.user.setActivity('^help for help');

    // oyasumi();
    // ohayo();
});
var d = new Date();
var nao = '2020-6-2';
console.log('Minuty: ' + d.getMinutes());
console.log(d.toLocaleDateString());
console.log(d.toLocaleTimeString());
console.log(d.getDay());
var godzina = d.toLocaleTimeString();
let dzisiaj = d.getDay();

function animeinfo() {
    console.log(godzina);
    const infoEmbed = new Discord.MessageEmbed()
        .setColor('#1cff07')
        .setAuthor('anime')
        .setTitle('Kartoteka animowa')
        .setDescription(`iks de`)
        .setThumbnail(
            'https://cdn.discordapp.com/attachments/809885619123126283/823675910443761664/unknown.png'
        );
    client.channels.cache.get('809885619123126283').send(infoEmbed);
    client.channels.cache.get('809885619123126283').send('test');
}

// function oyasumi() {
//     (function loop() {
//         var now = new Date();
//         if (now.getHours() === 2 && now.getMinutes() === 0) {
//             //vip.send("Oyasumi!");
//             anime.send('Oyasumi!');
//             anime_anime.send('Oyasumi!');
//             anime_komendy.send('Oyasumi!');
//         }
//         now = new Date(); // allow for time passing
//         var delay = 60000 - (now % 60000); // exact ms to next minute interval
//         setTimeout(loop, delay);
//         console.log(delay);
//     })();
// }
// function ohayo() {
//     (function loop() {
//         var now = new Date();
//         if (now.getHours() === 8 && now.getMinutes() === 0) {
//             //vip.send("Minna, Ohayo!");
//             anime.send('Minna, Ohayo!');
//             anime_anime.send('Minna, Ohayo!');
//             anime_komendy.send('Minna, Ohayo!');
//         }
//         now = new Date(); // allow for time passing
//         var delay = 60000 - (now % 60000); // exact ms to next minute interval
//         setTimeout(loop, delay);
//         console.log(delay);
//     })();
// }
client.on('messageCreate', async (message) => {
    waifu.biblioteka_waifu(message, process.env.prefix);

    if (
        message.content.toLowerCase() === 'ohayo' ||
        message.content.toLowerCase() === 'ohayo!'
    ) {
        message.channel.send('Ohayo gozaimasu!');
    }

    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'anime') {
        mal.search('anime', args, 'page')
            .then((info) => {
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${info.results[0].title}`)
                    .setURL(`${info.results[0].url}`)
                    .setAuthor('Znalazłem takie anime:')
                    .setDescription(`${info.results[0].synopsis}`)
                    .addFields({
                        name: 'Rating',
                        value: `${info.results[0].score}`,
                    })
                    .setImage(`${info.results[0].image_url}`)
                    .setTimestamp();
                if (info.results[0].title.toLowerCase().includes('pico')) {
                    message.channel.send({ files: ['./gify/aqua.jpg'] });
                } else {
                    message.channel.send({ content: `<@${message.author.id}>`, embeds: [exampleEmbed] });
                }
            })
            .catch((err) => console.log(err));
    }

    if (command === 'manga') {
        mal.search('manga', args, 'page')
            .then((info) => {
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${info.results[0].title}`)
                    .setURL(`${info.results[0].url}`)
                    .setAuthor('Znalazłem taką mange:')
                    .setDescription(`${info.results[0].synopsis}`)
                    .addFields({
                        name: 'Rating',
                        value: `${info.results[0].score}`,
                    })
                    .setImage(`${info.results[0].image_url}`)
                    .setTimestamp();
                if (info.results[0].title.toLowerCase().includes('pico')) {
                    message.channel.send({ files: ['./gify/aqua.jpg'] });
                } else {
                    message.channel.send({ content: `<@${message.author.id}>`, embeds: [exampleEmbed] });
                }
            })
            .catch((err) => console.log(err));
    }
    //KARTY
    // GENERATOR - DO NOT DELETE
    // if (command === 'generate') {
    //     var files = fs.readdirSync('./karty/Postaci');
    //     //console.log(files)
    //     let kanter = 0;
    //     //console.log(Math.round(cimci))
    //     //console.log(files[Math.round(cimci)])
    //     while (kanter <= 251) {
    //         let folder_name = files[kanter]
    //         let file_name = folder_name.split("_")
    //         let folder = fs.readdirSync(`./karty/Postaci/${folder_name}`)
    //         let karda = folder.find(card => card == `${file_name.join(" ")}.jpg`)
    //         generator.karta_v2(message, karda, folder_name)
    //         kanter++;
    //     }
    //     message.channel.send("Pomyślnie wygenerowano!");
    // }



    if (command === 'deck') {
        await iks_de.findOne(
            {
                userId: message.author.id,
            },
            async (err, person) => {
                if (!person) {
                    const deknt = new MessageEmbed()
                        .setColor('#0000FF')
                        .setTitle('Nie posiadasz żadnych kart!')
                        .setTimestamp()
                        message.author.send({embeds: [deknt]})
                } else {
                    const user = await iks_de.findOne({ userId: message.author.id });
                    const dek = new MessageEmbed()
                        .setColor('#0000FF')
                        .setTitle('Oto twoje karty')
                        .setTimestamp();
                    user.karta.forEach(element => {
                        dek.addFields(
                            { name: `${element.name}`, value: `Rzadkość: ${element.rarity}  Ilość: ${element.ammount}` },
                        );
                    });
                    //console.log(dek)
                    message.author.send({ embeds: [dek] });
                }
            });
    }

    if (command === 'card') {
        //  let today = new Date(new Date().toDateString());
        let user = await User.findOne({ userId: message.author.id });
        if (!user) {
            user = new User({
                userId: message.author.id
            });
        }
        if (user.commandCooldown >= Date.now()) {
            //86400000 to 24h w przeliczeniu na milisekundy
            //odpisujesz użytkownikowi że ma cooldown
            let kuldaln = new Discord.MessageEmbed()
                .setColor('#000000')
                .setDescription('<@' + message.author + '> Niedawno odebrałeś kartę, spokojnie!')
            message.channel.send({ embeds: [kuldaln] });
        } else {
            var files = fs.readdirSync('./karty/Postaci');
            let cimci = Math.random() * (251 - 0) + 0;
            let folder_name = files[Math.round(cimci)]
            let file_name = folder_name.split("_")
            let folder = fs.readdirSync(`./karty/Postaci/${folder_name}`)
            let karda = folder.find(card => card == `${file_name.join(" ")}.jpg`)
            karda = karda.replace(/\.[^/.]+$/, '');
            waifu_cards.karta_v2(message, karda, folder_name)
            if (process.env.devs.includes(message.author.id)) {
                user.commandCooldown = Date.now() + 1000 * 10
            } else {
                user.commandCooldown = Date.now() + 1000 * 60 * 60;
            }
            user.save();
        }
    }

    if(command === 'trade'){
        if(!args || !args[0] || !args[1] || !args[2] || !args[3] || !args[4]){
            message.channel.send("Podano złe argumenty!");
            return;
        }
        for (let i = 0; i < args.length; i++) {
            if(args[i] === ''){
                args.splice(i,i);
                i=0; 
            }
        }
        let gotowosc = 0;
        let oferta = args[0];
        let card1 = args[1];
        card1 = card1.split('_').join(' ')
        let rare1 = args[2].toLowerCase();
        rare1 = rare1.charAt(0).toUpperCase()+rare1.slice(1);
        let card2 = args[3];
        card2 = card2.split('_').join(' ')
        let rare2 = args[4].toLowerCase();
        rare2 = rare2.charAt(0).toUpperCase()+rare2.slice(1);
        let posiadauno;
        let posiadados;
        let altor = message.author.id;
        let alrot = message.author;
        if(oferta.endsWith(">") && oferta.startsWith("<@!")){
            oferta = oferta.slice(3, oferta.length-1);
            const exists = client.users.cache.has(oferta);
            if(oferta === `<@!${message.author.id}>`){
                 message.channel.send("Nie możesz się wymienić z samym sobą!");
                 return false;
            }
            if (exists === true){
                const person = await iks_de.findOne(
                    {
                        userId:message.author.id
                    },
                    async (err, person) =>{
                    }
                )
                ///console.log(havecards);
                if (!person) {
                    const dekent = new MessageEmbed()
                        .setColor('#0000FF')
                        .setTitle('Nie posiadasz żadnych kart!')
                        .setTimestamp()
                        message.author.send({embeds: [dekent]})
                } else {
                    const user = await iks_de.findOne({ userId: message.author.id });
                    //console.log(Object.values(user.karta));
                    var keys = Object.keys(user.karta);
                    for (var i = 0, len = keys.length; i < len; i++) {
                        if(user.karta[keys[i]].name === card1 && user.karta[keys[i]].rarity === rare1){
                            posiadauno = true;
                        }
                    }
                }
                if(posiadauno === true){
                    await iks_de.findOne(
                        {
                            userId:oferta
                        },
                        async (err, person) =>{
                            if (!person) {
                                const dekent = new MessageEmbed()
                                    .setColor('#0000FF')
                                    .setTitle('Ta osoba nie posiada Takiej karty!')
                                    .setTimestamp()
                                    message.author.send({embeds: [dekent]})
                            } else {
                                const user = await iks_de.findOne({ userId: oferta });
                                var keys = Object.keys(user.karta);
                                for (var i = 0, len = keys.length; i < len; i++) {
                                    if(user.karta[keys[i]].name === card2 && user.karta[keys[i]].rarity === rare2){
                                        posiadados = true;
                                    }
                                }
                            }
                            if(posiadados === true){
                                const wymiana = new MessageEmbed()
                                    .setColor('#0000FF')
                                    .setDescription(`<@${message.author.id}> proponuje Ci wymianę!`)
                                    .addFields(
                                        { name: '\u200B', value: '\u200B' },
                                        { name: `Oferuje:\n\n${card1}`, value: `Rzadkość:\n${args[2]}`, inline: true },
                                        { name: '\u200B', value: '\u200B', inline: true },
                                        { name: `Za twoją:\n\n${card2}`, value: `Rzadkość:\n${args[4]}`, inline: true },
                                        { name: '\u200B', value: '\u200B' },
                                        { name: "^accept", value: "Aby zaakceptować", inline: true},
                                        { name: "^decline", value: "Aby odrzucić", inline: true},
                                    )
                                    .setTimestamp()
                                    let juser = client.users.cache.get(oferta);
                                    //message.channel.send({content: `<@${oferta}>`, embeds: [wymiana]})
                                    let filter = m => m.author.id === message.author.id || m.author.id === oferta;
                                    message.channel.send({content: `<@${oferta}>`, embeds: [wymiana]}).then(() => {
                                    message.channel.awaitMessages( {
                                        max: 1,
                                        time: 15000,
                                        errors: ['time']
                                        }, filter)
                                        .then(message => {
                                        message = message.first()
                                        if (message.content.toLowerCase() == '^accept') {
                                            //message.channel.send(`<@${oferta}> zaakceptował ofertę użytkownika ${message.author}!`);
                                            alrot.send(`<@${oferta}> zaakceptował twoję ofertę wymiany!`);
                                            juser.send(`Zaakceptowano ofertę wymiany użytkownika ${alrot}!`);
                                            waifu_cards.trejd(message, card1, card2, rare1, rare2, oferta, altor);
                                        } else if (message.content.toLowerCase() == '^decline') {
                                            message.author.send(`<@${oferta}> odrzucił twoją ofertę wymiany!`);
                                            juser.send(`Odrzucono ofertę wymiany użytkownika <@${altor}>!`);
                                            return;
                                        } else {
                                            message.channel.send(`<@${oferta}>, ${altor}\nPodano zły argument przy wymianie, została ona anulowana!`);
                                            return;
                                        }
                                        })
                                        .catch(collected => {
                                            message.channel.send(`Brak odpowiedzi, wymiana między <@${oferta}> a ${altor}  anulowana!`);
                                            return;
                                        });
                                    })
                            }else{
                                const dekent = new MessageEmbed()
                                    .setColor('#0000FF')
                                    .setTitle('Ta osoba nie posiada Takiej karty!')
                                    .setTimestamp()
                                    message.author.send({embeds: [dekent]})
                                return;
                            }
                        
                        }
                        
                    )

                }else{
                    //console.log(posiadauno)
                    message.channel.send("Nie masz takiej karty!");
                    return false;
                }
                //if(!havecards) return;
            }else{
                message.channel.send('Użytkownika nie ma na serwerze!')
            }
            //console.log(exists); // true or false
        }else{
            message.channel.send('Użytkownik nie istnieje!')
        }  
    }



    // if (command === 'karda') {
    //     if (!process.env.devs.includes(message.author.id)) return;
    //     let args2 = args.slice(0).join(" ").split(" | ")
    //     let folder_name = args2[0].split(" ")
    //     let files = fs.readdirSync(`./karty/Postaci/${folder_name.join("_")}`)
    //     let file = files.find(x => x == `${args2[0]}.jpg`)
    //     try {
    //         waifu_cards.grafika_karty_v2(message, `./karty/ramki/${args2[1]}.png`, file, folder_name.join("_"));
    //         message.delete().catch(e => {
    //             console.log(e);
    //         });
    //     } catch (e) {
    //         console.log(e)
    //         return message.channel.send(e).catch();
    //     }
    // }

    //KONIEC KART

    if (command === 'sh') {
        harmonogram.szedjul(args, message);
    }

    if (command === 'waifu') {
        let i = args.join(' ');
        //console.log(i);
        waifu_s.szukaj(i, 1, 10, message);
    }

    if (command === 'version') {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('white')
            .setAuthor('Animu bocik')
            .setTitle('version: 2.0.0')
            .setDescription(
                'Animu bocik made by ' +
                '<@326749086915100675>' +
                ' for Niezniszczalni Sympatycy Łysego'
            )
            .setFooter('© All rights reserved.');
        message.channel.send({ embeds: [exampleEmbed] });
    }

    if (command === 'help') {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Aktualnie istniejące komendy:')
            .addFields(
                {
                    name: '^anime (nazwa anime)',
                    value: 'Wyświetla informacje o wpisanym anime',
                },
                {
                    name: '^manga (nazwa mangi)',
                    value: 'Wyświetla informacje o wpisanej mandze',
                },
                {
                    name: '^sh (nazwa dnia po angielsku)',
                    value: 'Wyświetla informacje, jakie anime wychodzą tego dnia (w przypadku braku podania dnia, wyświetla anime wychodzące aktualnego dnia)',
                },
                { name: '^ayaya', value: 'Ayaya :)' },
                { name: '^ara ara', value: 'Ara Ara...' },
                { name: '^nani', value: 'co?' },
                { name: '^nao', value: 'Kawaii waifu pic' },
                {
                    name: '^version',
                    value: 'Informacje do aktualnej wersji bota',
                },
                {
                    name: '^pic (argument)',
                    value: 'Dostępne argumenty: neko, hug, blush, bully, cry, hug, kiss, pat, lick, smug, highfive, nom, bite, slap, wink, poke, dance, cringe',
                },
                {
                    name: '^waifu (imie i/lub nazwisko postaci)',
                    value: 'Wyświetla informacje o postaci',
                },
                { name: '^card', value: 'Losowanie karty z waifu' },
                {
                    name: '^deck',
                    value: 'Wyświetla informacje o aktualnie posiadanych kartach',
                },
                {
                    name: '^trade',
                    value: '[@Użytkownik z którym chcesz się wymienić] [Oferowana_karta] [Rzadkość] [Karta_którą_chcesz_otrzymać] [Rodzaj]\n ZAMIAST SPACJI UŻYWAĆ _',
                },
            );
        message.author.send({ embeds: [exampleEmbed] });
    }

    if (message.content.toLowerCase().startsWith(`${process.env.prefix}ayaya`)) {
        message.channel.send({
            files: ['./gify/ayaya.gif'],
        });
    }

    const end = [
        'neko',
        'hug',
        'blush',
        'bully',
        'cry',
        'hug',
        'kiss',
        'lick',
        'pat',
        'smug',
        'highfive',
        'nom',
        'bite',
        'slap',
        'wink',
        'poke',
        'dance',
        'cringe',
    ];
    if (command === 'pic') {
        if (end.includes(args[0])) {
            fetch('https://waifu.pics/api/sfw/' + args[0])
                .then((response) => response.json())
                .then((data) => message.channel.send(data.url));
        } else {
            message.channel.send('Nieprawidłowy argument!');
        }
    }

    if (message.content.toLowerCase().startsWith(`${process.env.prefix}nao`)) {
        message.channel.send({
            files: ['./gify/nao.gif'],
        });
    }
    if (
        message.content
            .toLowerCase()
            .startsWith(
                `${process.env.prefix}nani`
            ) /*|| message.content.toLowerCase() === 'nani?'*/
    ) {
        message.channel.send({
            files: ['./gify/tomori_nani.gif'],
        });
    }

    //  if(`${autor.username}` === 'AyoXeN'){
    //      message.channel.send('Fortnajt?')
    //  }
});

client.login(process.env.token);
