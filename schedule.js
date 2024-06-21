async function szedjul(args, message) {
    const jikanjs = require('jikanjs'); // Uses per default the API version 3
    const Discord = require('discord.js');
    let titles = '';
    var dzien = JSON.stringify(args);
    var dni = [
        '["monday"]',
        '["tuesday"]',
        '["wednesday"]',
        '["thursday"]',
        '["friday"]',
        '["saturday"]',
        '["sunday"]',
    ];
    let d = new Date();
    console.log(args);
    //message.channel.send(args);
    if (args + ' ' === ' ') {
        if (d.getDay() - 1 === -1) {
            dzien = dni[6];
        } else {
            dzien = dni[d.getDay() - 1];
        }
    }
    dzien = dzien.toLocaleLowerCase();
    switch (dzien) {
        case '["monday"]':
            const mon = await jikanjs.loadSchedule('monday');
            mon.monday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedmon = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące w poniedziałek: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedmon]});
            break;
        case '["tuesday"]':
            const tus = await jikanjs.loadSchedule('tuesday');
            tus.tuesday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedtus = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychądzące we wtorek: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedtus]});
            break;
        case '["wednesday"]':
            const wed = await jikanjs.loadSchedule('wednesday');
            wed.wednesday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedwed = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące we środę: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedwed]});
            break;
        case '["thursday"]':
            const thu = await jikanjs.loadSchedule('thursday');
            thu.thursday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedthu = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące w czwartek: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedthu]});
            break;
        case '["friday"]':
            const fri = await jikanjs.loadSchedule('friday');
            fri.friday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedfri = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące w piątek: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedfri]});
            break;
        case '["saturday"]':
            const sat = await jikanjs.loadSchedule('saturday');
            sat.saturday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedsat = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące w sobote: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedsat]});
            break;
        case '["sunday"]':
            const sun = await jikanjs.loadSchedule('sunday');
            sun.sunday.map((e) => {
                titles += `- ${e.title}\n`;
            });
            const embedsun = new Discord.MessageEmbed()
                .setColor('#0000FF')
                .setTitle(`Anime wychodzące w niedziele: `)
                .setDescription(titles)
                .setFooter('Rozkład według czasu japońskiego');
            message.channel.send({embeds:[embedsun]});
            break;
        default:
            message.channel.send(
                'Nieprwawidłowy argument!\n Treść powinna wyglądać tak: ^sh (dzień/brak argumentu)'
            );
            console.log('sh= ' + dzien);
            break;
    }
}
module.exports.szedjul = szedjul;
