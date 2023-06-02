# djs-tts

djs-ttc est un package utilisable avec discord.js qui connecte et fait parler un bot en vocale.

## Installation

npm install djs-tts

## Example

```js
const { playTTS } = require("djs-tts");

playTTS({
    voiceChannel: voiceChannel, // voiceChannel.type === "VoiceChannel"
    text: text, // String
    guild: message.guild, // <client>.guilds.cache.get(guild.id)
    language: language // String, exemple : "en", "fr"
      });
```
```js
const { playTTS } = require("djs-tts");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.User,
    Partials.Message,
    Partials.GuildMember,
  ],
});

const token = "";
const prefix = "!";

client.on("ready", async (client) => {
  console.log(client.user.tag + " is online !");
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === "playtts") {
      const text = args.join(" ");
      const voiceChannel = message.member?.voice.channel;
  
      if (!voiceChannel) {
        return message.reply("You are not in a voice channel!");
      }
  
      playTTS({
        voiceChannel: voiceChannel,
        text: text,
        guild: message.guild,
        // language: "en"
      });
    }
});

client.login(token).catch(err => console.log(err));
```

## Auteur

duxio
