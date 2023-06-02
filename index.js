const {
    joinVoiceChannel,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    AudioPlayerStatus,
    } = require('@discordjs/voice');
    
    async function playTTS(options) {
    try {
    let { voiceChannel, text, guild, language } = options;
    if (!language) language = 'en';
    
    if (!voiceChannel || !text || !guild) {
      throw new Error('voiceChannel, text, and guild arguments are required.');
    }
  
    if(text && text.length && text.length > 256) return new TypeError("The length text must be 256 or shorter !");
    
    const url = `http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(text)}&tl=${language}`;
    
    const resource = createAudioResource(url, {
      inlineVolume: true,
    });
    
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
    
    player.play(resource);
    connection.subscribe(player);
    
    connection.on('finish', () => {
      voiceChannel.leave();
      connection.destroy();
    });
    
    connection.on('error', (error) => {
      console.error(`An error occurred in the voice connection: ${error}`);
      voiceChannel.leave();
    });
    
    player.on('error', (error) => {
      console.error(`An error occurred in the audio player: ${error}`);
      voiceChannel.leave();
    });
    
    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
    } catch (error) {
    console.error('An error occurred while playing the text to speech:', error);
    throw error;
    }
    }
    
    module.exports = {
    playTTS,
    };
