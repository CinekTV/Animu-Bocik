const Discord = require('discord.js');
const fetch = require('node-fetch');
const User = require('./models/user.js');
const iks_de = require('./models/data_base.js');
const Jimp = require('jimp');
var fs = require('fs');
const { modelName, remove } = require('./models/user.js');
const { MessageAttachment, MessageEmbed } = require('discord.js');

let wynik;

let dane_karty = [
    {
        name: '',
        rarity: '',
        ammount: 1,
    }
];

let arr = [
    {
        id: 1,
        name: 'Unikat',
        type: 'L',
    },
    {
        id: 2,
        name: 'W chuja rzadka karta',
        type: 'R',
    },
    {
        id: 3,
        name: 'Dosyć rzadka karta',
        type: 'UC',
    },
    {
        id: 4,
        name: 'Po prostu karta',
        type: 'C',
    },
];


function random(arr) {
    let num = Math.random() * 100;
    num = Number(Math.round(num + 'e2') + 'e-2');
    //console.log("Num: "+num)
    let resault = null;
    //console.log(num);
    if (num <= 0.1) resault = 'L';
    if (num >= 0.11 && num <= 3.5) resault = 'R';
    if (num >= 3.51 && num <= 25) resault = 'UC';
    if (num >= 25.01) resault = 'C';
    let toDrop = [];
    arr.forEach((element) => {
        if (element.type == resault) {
            toDrop.push(element);
        }
    });
    num = Math.floor(Math.random() * toDrop.length);
    wynik = toDrop[num].type;
    //console.log(toDrop[num]);
    return toDrop[num];
}

async function karta_v2(message, karda) {
    const rezultat = random(arr);
    switch (wynik) {
        case 'C':
            rarity = 'Common';
            karta_embed(message, rarity, karda);
            break;
        case 'UC':
            rarity = 'Uncommon';
            karta_embed(message, rarity, karda);
            break;
        case 'R':
            rarity = 'Rare';
            karta_embed(message, rarity, karda);
            break;
        case 'L':
            rarity = 'Legendary';
            karta_embed(message, rarity, karda);
            break;

        default:
            message.channel.send('ERROR');
            break;
    }

}

async function karta_embed(message, rarity, karda) {
    const new_karda = karda.replace(' ', '%20');
    const url = `http://${ip}/wygenerowane/${rarity.toLowerCase()}/${new_karda}.png`;
    const embeda = new MessageEmbed()
        .setDescription(`<@${message.author.id}>`)
        .setImage(url)
        .setColor('#000000');
    message.channel.send({ embeds: [embeda] });
    let araj = [
        {
            name: karda,
            rarity: rarity,
            ammount: 1,
        }
    ]
    dane_karty = araj[0];
    zapis(message, karda);

}

async function zapis(message, karda) {
    await iks_de.findOne(
        {
            userId: message.author.id,
        },
        async (err, person) => {
            let pom = 0;
            if (!person) {
                const user = new iks_de({
                    userId: message.author.id,
                    karta: dane_karty,
                });
                return await user.save();
            } else {
                const user = await iks_de.findOne({ userId: message.author.id })
                user.karta.forEach(async element => {
                    if (element.name === karda && element.rarity === rarity) {
                        element.ammount = element.ammount + 1;
                        pom++;
                        await user.markModified("karta");
                        await user.save()

                    }
                });

                if (pom === 0) {
                    person.karta.push(dane_karty);
                    return await person.save()
                }
            }
        }
    );
}

async function trejd(message, card1, card2, rare1, rare2, oferta, altor) {
    //console.log(oferta);
    //console.log(altor);
    await iks_de.findOne(
        {
            userId: altor,
        },
        async (err) => {
            const user = await iks_de.findOne({ userId: altor })
            const indeks1 = user.karta.findIndex(element => element.name === card1 && element.rarity === rare1);
            let arajtradeuno = [
                {
                    name: card2,
                    rarity: rare2,
                    ammount: 1,
                }
            ]
            dane_trade = arajtradeuno[0];
            if (user.karta[indeks1].ammount > 1) {
                user.karta[indeks1].ammount = user.karta[indeks1].ammount - 1;
                await user.markModified("trade");
                await user.save();
                await zapis_trejd(message, card2, dane_trade, altor, rare2);
            }else if (user.karta[indeks1].ammount === 1) {
                user.karta.slice(indeks1);
                await zapis_trejd(message, card2, dane_trade, altor, rare2);
            }else {
                message.channel.send("Trade Error!");
                return;
            }
        }
    )
    await iks_de.findOne(
        {
            userId: oferta,
        },
        async (err) => {
            const userrr = await iks_de.findOne({ userId: oferta })
            const indekss1 = userrr.karta.findIndex(element => element.name === card2 && element.rarity === rare2)
            let arajtradedos = [
                {
                    name: card1,
                    rarity: rare1,
                    ammount: 1,
                }
            ]
            let dane_trade = arajtradedos[0];
            //console.log(userrr.karta[indekss1].ammount)
            if (userrr.karta[indekss1].ammount === 1) {
                userrr.karta.splice(indekss1, 1);
                await zapis_trejd(message, card1, dane_trade, oferta, rare1);
            }else if (userrr.karta[indekss1].ammount > 1) {
                userrr.karta[indekss1].ammount = userrr.karta[indekss1].ammount - 1;
                await userrr.markModified("karta");
                await userrr.save();
                await zapis_trejd(message, card1, dane_trade, oferta, rare1);
            }else {
                message.channel.send("Trade Error!");
                return;
            }
        }
    )
    console.log('Kuniec')
}

async function zapis_trejd(message, karda, dane_trade, kto, rarity) {
    await iks_de.findOne(
        {
            userId: kto,
        },
        async (err, person) => {
            let pom = 0;
            if (!person) {
                const user = new iks_de({
                    userId: kto,
                    karta: dane_trade,
                });
                return await user.save();
            } else {
                const user = await iks_de.findOne({ userId: kto })
                user.karta.forEach(async element => {
                    if (element.name === karda && element.rarity === rarity) {
                        element.ammount = element.ammount + 1;
                        pom++;
                        await user.markModified("karta");
                        await user.save()

                    }
                });

                if (pom === 0) {
                    person.karta.push(dane_trade);
                    return await person.save()
                }
            }
        }
    );
}

module.exports.karta_v2 = karta_v2;
module.exports.trejd = trejd;
