const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class command {
    constructor() {
        this.name = "avatar",
        this.description = "Permets d'envoyer l'avatar de l'utilisateur choisis.",
        this.options = [
            {
                type: ApplicationCommandOptionType.User,
                name: "membre",
                description: "Membre",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const user = interaction.options.getMember('membre');

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setImage(user.displayAvatarURL())

        interaction.reply({ embeds: [embed] });
    }
}

module.exports = command