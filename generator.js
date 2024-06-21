const Discord = require('discord.js');
const fetch = require('node-fetch');
const User = require('./models/user.js');
const Jimp = require('jimp');
var fs = require('fs');
const { modelName } = require('./models/user.js');



async function grafika_karty_v2(message, rarity, karda, dir) {
    const card = await Jimp.read(`./karty/Postaci/${dir}/${karda}`);
    //nazwa_karty = await Jimp.read(`./karty/Postaci/${dir}/${karda}`);
    const name = karda.replace(/\.[^/.]+$/, '');
    //console.log(name);
    nazwa_karty = name;
    const ramka = await Jimp.read(rarity);
    const font = await Jimp.loadFont('strong_brain.fnt');

    const textMaxWidth = 741;
    const textMaxHeight = 164;
    const textOptimalRatio = textMaxWidth / textMaxHeight;

    let textWidth = Jimp.measureText(font, name);
    let textHeight = Jimp.measureTextHeight(font, name, textWidth);
    let textRatio = textWidth / textHeight;

    for (let i = 2; i < 10; i++) {
        const tmp_w = Jimp.measureText(font, name) * ((1 / 5) * i);
        const tmp_h = Jimp.measureTextHeight(font, name, tmp_w);
        const tmp_r = tmp_w / tmp_h;
        if (
            Math.abs(textOptimalRatio - tmp_r) <
            Math.abs(textOptimalRatio - textRatio)
        ) {
            textWidth = tmp_w;
            textHeight = tmp_h;
            textRatio = tmp_r;
        }
    }

    //ja pierdole czemu to się buguje bez tego
    if ((textWidth = Jimp.measureText(font, name))) {
        textHeight = Jimp.measureTextHeight(font, name);
    }

    const text = new Jimp(textWidth, textHeight)
        .print(
            font,
            0,
            0,
            { text: name, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER },
            textWidth
        )
        .scaleToFit(textMaxWidth, textMaxHeight)

    const text_offsetX = 77 + textMaxWidth / 2 - text.getWidth() / 2;
    const text_offsetY = 1159 + textMaxHeight / 2 - text.getHeight() / 2;
            //GENEROWANIE RZDKOŚĆI DO FOLDERU
    if (rarity === './karty/ramki/blue.png'){
    await card
        .cover(900, 1400)
        .composite(ramka, 0, 0)
        .composite(text, text_offsetX, text_offsetY)
        .writeAsync(`../wygenerowane/common/${name}.png`);
    }
    if (rarity === './karty/ramki/green.png'){
        await card
            .cover(900, 1400)
            .composite(ramka, 0, 0)
            .composite(text, text_offsetX, text_offsetY)
            .writeAsync(`../wygenerowane/uncommon/${name}.png`);
    }
    if (rarity === './karty/ramki/purple.png'){
        await card
            .cover(900, 1400)
            .composite(ramka, 0, 0)
            .composite(text, text_offsetX, text_offsetY)
            .writeAsync(`../wygenerowane/rare/${name}.png`);
    }
    if (rarity === './karty/ramki/gold.png'){
        await card
            .cover(900, 1400)
            .composite(ramka, 0, 0)
            .composite(text, text_offsetX, text_offsetY)
            .writeAsync(`../wygenerowane/legendary/${name}.png`);
    }
    if(rarity === 'red'){
        return;
    }
}

async function karta_v2(message, karda, dir) {
            const nazwa_karty = karda.replace(/\.[^/.]+$/, '');
            const path = `../wygenerowane/common/${nazwa_karty}.png`
            if (fs.existsSync(path)) {
                 console.log(`${nazwa_karty} już istnieje!`)
            }else{
                grafika_karty_v2(message, './karty/ramki/blue.png', karda, dir);
    
                grafika_karty_v2(message, './karty/ramki/green.png', karda, dir);
    
                grafika_karty_v2(message, './karty/ramki/purple.png', karda, dir);

                grafika_karty_v2(message, './karty/ramki/gold.png', karda, dir);
            }

}
module.exports.karta_v2 = karta_v2;
module.exports.grafika_karty_v2 = grafika_karty_v2;