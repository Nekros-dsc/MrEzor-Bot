const { EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const ms = require("ms");

class command {
    constructor() {
        this.name = "giveaway-start",
        this.description = "Lancer.",
        this.options = [
            {
                type: ApplicationCommandOptionType.String,
                name: "duree",
                description: "Combien de temps dure le cadeaux ? (ex: 10s, 1m, 1h 1d)",
                required: true
            },
            {
                type: ApplicationCommandOptionType.Integer,
                name: "gagnant",
                description: "Combien de gagnant peuvent gagné le cadeaux ?",
                required: true
            },
            {
                type: ApplicationCommandOptionType.String,
                name: "cadeau",
                description: "Quels est le cadeaux ?",
                required: true
            },
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "Dans quels salons voulez-vous lancé le cadeaux ?",
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

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuree = interaction.options.getString('duree');
        const giveawayGagant = interaction.options.getInteger('gagnant');
        const giveawayCadeau = interaction.options.getString('cadeau');

        if(!giveawayChannel.isTextBased()){
            return interaction.reply({
                embeds: [Embed.setDescription(`❌ | **Le salons n'est pas un salons textuel** !`)],
                ephemeral: true
            })
        }

        bot.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuree),
            prize: giveawayCadeau,
            winnerCount: giveawayGagant,
            hostedBy: bot.config.giveaway.hostedBy ? interaction.user : null,
            messages: {
                giveaway: (bot.config.giveaway.everyoneMention ? '@everyone\n🎉 **GIVEAWAY** 🎉' : '🎉 **GIVEAWAY** 🎉'),
                giveawayEnded: (bot.config.giveaway.everyoneMention ? '@everyone\n🎉🎉 **GIVEAWAY TERMINÉ** 🎉🎉' : '🎉 **GIVEAWAY TERMINÉ** 🎉'),
                title: '{this.prize}',
                drawing: 'Termine dans: {timestamp}',
                dropMessage: 'Soyez le premier à réagir avec 🎉 !',
                inviteToParticipate: 'Réagis avec 🎉 pour participer !',
                winMessage: 'Félicitation, {winners}! Tu as gagné le giveaway **{this.prize}** !',
                embedFooter: '{this.winnerCount} gagnant(e)',
                noWinner: 'Giveaway annulé, aucun participant.',
                hostedBy: 'Offert par: {this.hostedBy}',
                winners: 'Gagnant(e):',
                endedAt: 'Terminé à'
            }
        }).then(() => {
            interaction.reply({
                embeds: [Embed.setDescription(`✅ | **Le giveaway à été lancé dans ${giveawayChannel}** !`)],
                ephemeral: true
            })
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = command