const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const ms = require("ms");

class command {
    constructor() {
        this.name = "giveaway-end",
        this.description = "Annulé.",
        this.options = [
            {
                type: ApplicationCommandOptionType.String,
                name: "cadeau",
                description: "Quels est le cadeaux ? (MessageID où le nom du Giveaway)",
                required: true
            },
        ]
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
            return interaction.reply({
                embeds: [Embed.setDescription(`❌ | **Vous n'avez pas la permissions d'éxectuer cette commande** !`)],
                ephemeral: true
            })
        }

        const giveawayCadeau = interaction.options.getString('cadeau');

        const giveaway = bot.giveawaysManager.giveaways.find((g) => g.prize === giveawayCadeau && g.guildId === interaction.guild.id) || bot.giveawaysManager.giveaways.find((g) => g.messageId === giveawayCadeau && g.guildId === interaction.guild.id)

        if(!giveaway){
            return interaction.reply({
                embeds: [Embed.setDescription(`❌ | **Aucun giveaway n'as été trouvé** !`)],
                ephemeral: true
            })
        }

        if(giveaway.ended){
            return interaction.reply({
                embeds: [Embed.setDescription(`❌ | **Ce giveaway est déjà terminé** !`)],
                ephemeral: true
            })
        }

        bot.giveawaysManager.end(giveaway.messageId)
        .then(() => {
            interaction.reply({
                embeds: [Embed.setDescription(`✅ | **Le giveaway à été terminé avec succès** !`)],
                ephemeral: true
            })
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = command