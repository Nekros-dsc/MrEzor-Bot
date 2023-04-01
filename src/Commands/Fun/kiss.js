const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "kiss",
        this.description = "Renvoie une image aléatoire.",
        this.options = [
            {
                type: ApplicationCommandOptionType.User,
                name: 'membre',
                description: 'Séléctionner un membre',
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        let user = interaction.options.getUser('membre');

        const img = [
            'https://media4.giphy.com/media/HJibfnd7xqk5hAMD4v/giphy.gif?cid=ecf05e474a32q1dc1vc5bhocn0m0oztoj3r4qs2l0fo96y9m&rid=giphy.gif&ct=g',
            'https://media2.giphy.com/media/IQfZBynPpR3rEN9U1o/giphy.gif?cid=ecf05e474a32q1dc1vc5bhocn0m0oztoj3r4qs2l0fo96y9m&rid=giphy.gif&ct=g',
            'https://media1.giphy.com/media/IqiNRYOAg3G98kFitx/giphy.gif?cid=ecf05e474a32q1dc1vc5bhocn0m0oztoj3r4qs2l0fo96y9m&rid=giphy.gif&ct=g',
            'https://media2.giphy.com/media/rHY31E30bMgqL32lpP/giphy.gif?cid=ecf05e474a32q1dc1vc5bhocn0m0oztoj3r4qs2l0fo96y9m&rid=giphy.gif&ct=g',
            'https://media1.giphy.com/media/xUA7bhueSdsdNjqZDq/giphy.gif?cid=ecf05e474a32q1dc1vc5bhocn0m0oztoj3r4qs2l0fo96y9m&rid=giphy.gif&ct=g',
            'https://terre-agir.com/wp-content/uploads/2017/12/imaghhes.jpg',
        ]

        const randomImgs = img[Math.floor(Math.random() * img.length)];

        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`${interaction.user} te fais un bisous ${user}`)
        .setImage(randomImgs)

        interaction.reply({ embeds: [Embed] })
    }
}

module.exports = command