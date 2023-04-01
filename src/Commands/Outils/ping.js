class command {
    constructor() {
        this.name = "ping",
        this.description = "Permets de voir le ping du bot."
    }

    async execute(bot, interaction) {
        interaction.reply(`Le ping du bot est de ${Date.now() - interaction.createdTimestamp}ms.`);
    }
}

module.exports = command