module.exports = {
    biblioteka_waifu(message, prefix) {
        if (message.content.toLowerCase().startsWith(`${prefix}ara ara`)) {
            message.channel.send({
                files: ['./gify/ara_ara.gif'],
            });
        }
    },
};
