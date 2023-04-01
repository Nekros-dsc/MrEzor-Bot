const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "pourcentage",
        this.description = "Permets de génerer un nombre entre 0 et 100."
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`Ton pourcentage est de : ` + entierAleatoire(0, 1000) + `%`)

        interaction.reply({ embeds: [Embed] })
    }
}

function entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = command