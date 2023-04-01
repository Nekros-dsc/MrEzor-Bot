const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

class command {
    constructor() {
        this.name = "invite",
        this.description = "Permets d'inviter le bot sur sont serveur."
    }

    async execute(bot, interaction) {
        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription('Invite moi !')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo })

        var row = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setEmoji('📃')
                .setLabel('Inviter')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=964367095221596210&permissions=&&scope=bot%20applications.commands`)
                .setStyle(ButtonStyle.Link)
            );

        interaction.reply({ embeds: [embed], components: [row] });
    }
}

module.exports = command