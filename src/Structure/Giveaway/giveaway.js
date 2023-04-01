module.exports = (bot) => {
    const { GiveawaysManager } = require('discord-giveaways');
    const manager = new GiveawaysManager(bot, {
        storage: './giveaways.json',
        default: {
            botsCanWin: false,
            embedColor: 'Random',
            embedColorEnd: 'Random',
            reaction: '🎉',
            lastChance: {
                enabled: true,
                content: '⚠️ **DERNIERE CHANCE POUR PARTICIPER** !',
                threshold: 10000,
                embedColor: 'Random'
            }
        }
    });

    bot.giveawaysManager = manager;

    bot.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
        const prix = giveaway.prize;
        const id = giveaway.messageId;

        console.log(`> ${member.user.tag} est entrée dans le giveaway : ${prix}(${id})`)
    })

    bot.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
        const prix = giveaway.prize;
        const id = giveaway.messageId;

        console.log(`> ${member.user.tag} as quitter le giveaway : ${prix}(${id})`)
    })

    bot.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
        const gagnant = winners.map((member) => member.user.username).join(', ');
        const prix = giveaway.prize;
        const id = giveaway.messageId;

        console.log(`> Giveaway : ${prix}(${id}) fini ! Le gagnant est : ${gagnant}`)
    })
}